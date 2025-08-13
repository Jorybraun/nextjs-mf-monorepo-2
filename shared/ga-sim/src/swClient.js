const SIGNATURE = '__GA_SIM__';

// Minimal inline Service Worker source (in-memory event store)
export const WORKER_SOURCE = `/* ga-sim inline SW */\nconst SIGNATURE='${SIGNATURE}';\nconst SESSION_MAP=new Map(); // session_id -> {meta, events: []}\nself.addEventListener('install',e=>self.skipWaiting());\nself.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));\nself.addEventListener('message',evt=>{const m=evt.data; if(!m||m.signature!==SIGNATURE)return; try{switch(m.type){case 'enqueue_event': return storeEvent(m.payload,evt.source,m.requestId);case 'query_sessions': return respond(evt.source,m.requestId,listSessions());case 'query_session_events': return respond(evt.source,m.requestId,getSessionEvents(m.session_id));case 'query_all_events': return respond(evt.source,m.requestId,getAllEvents());} }catch(err){respondError(evt.source,m.requestId,String(err));}});\nfunction storeEvent(ev,source,req){const sid=ev.session_id; let bucket=SESSION_MAP.get(sid); if(!bucket){bucket={meta:{session_id:sid, session_number:ev.session_number, source:ev.source, medium:ev.medium, campaign:ev.campaign, started:ev.ts, last:ev.ts}, events:[]}; SESSION_MAP.set(sid,bucket);} bucket.events.push({...ev,id:crypto.randomUUID()}); bucket.meta.last=ev.ts; respond(source,req,{ok:true}); }\nfunction listSessions(){return Array.from(SESSION_MAP.values()).map(b=>({session_id:b.meta.session_id, session_number:b.meta.session_number, started:b.meta.started, last:b.meta.last, event_count:b.events.length, page_views:b.events.filter(e=>e.name==='page_view').length, source:b.meta.source, medium:b.meta.medium, campaign:b.meta.campaign})).sort((a,b)=>b.last-a.last);}\nfunction getSessionEvents(id){const b=SESSION_MAP.get(id); return b?b.events.slice():[];}\nfunction getAllEvents(){const a=[];SESSION_MAP.forEach(b=>a.push(...b.events)); return a.sort((x,y)=>x.ts-y.ts);}\nfunction respond(client,reqId,data){client&&client.postMessage({signature:SIGNATURE,type:'response',requestId:reqId,data});}\nfunction respondError(client,reqId,error){client&&client.postMessage({signature:SIGNATURE,type:'error',requestId:reqId,error});}\n`;

let controllerReady = false;
let pending = [];
let reqCounter = 0;
const inflight = new Map();
let registrationPromise = null;

export async function ensureServiceWorker() {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return false;
  if (controllerReady && navigator.serviceWorker.controller) return true;
  if (!registrationPromise) registrationPromise = registerInlineServiceWorker();
  return registrationPromise;
}

function registerInlineServiceWorker() {
  const blob = new Blob([WORKER_SOURCE], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  return navigator.serviceWorker.register(url, { scope: '/' })
    .then(() => new Promise(resolve => {
      if (navigator.serviceWorker.controller) { controllerReady = true; flush(); resolve(true); return; }
      navigator.serviceWorker.addEventListener('controllerchange', () => { controllerReady = true; flush(); resolve(true); });
      setTimeout(()=>resolve(!!navigator.serviceWorker.controller), 4000);
    }));
}

export function setupMessageListener() {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
  navigator.serviceWorker.addEventListener('message', (ev) => {
    const msg = ev.data; if (!msg || msg.signature !== SIGNATURE) return;
    if (msg.requestId && inflight.has(msg.requestId)) {
      const { resolve, reject } = inflight.get(msg.requestId);
      if (msg.type === 'error') reject(new Error(msg.error)); else resolve(msg.data);
      inflight.delete(msg.requestId);
    }
  });
}

function postAwait(type, payload={}) {
  if (!navigator.serviceWorker.controller) return Promise.reject(new Error('No SW controller'));
  const requestId = String(++reqCounter);
  const message = { signature: SIGNATURE, type, requestId, ...payload };
  navigator.serviceWorker.controller.postMessage(message);
  return new Promise((resolve, reject) => inflight.set(requestId, { resolve, reject }));
}

export function enqueueEvent(ev) {
  const message = { signature: SIGNATURE, type: 'enqueue_event', requestId: String(++reqCounter), payload: ev };
  if (!controllerReady || !navigator.serviceWorker.controller) { pending.push(message); return; }
  navigator.serviceWorker.controller.postMessage(message);
}

export function listSessions() { return postAwait('query_sessions'); }
export function getSessionEvents(session_id) { return postAwait('query_session_events', { session_id }); }
export function getAllEvents() { return postAwait('query_all_events'); }

function flush() { if (!controllerReady || !navigator.serviceWorker.controller) return; pending.forEach(m => navigator.serviceWorker.controller.postMessage(m)); pending = []; }