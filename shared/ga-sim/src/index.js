import { generateGaLikeCid } from './ids.js';
import { getItem, setItem } from './storage.js';
import { ensureServiceWorker, setupMessageListener, enqueueEvent, listSessions, getSessionEvents, getAllEvents } from './swClient.js';

const LS_CID = 'ga_sim:cid';
const LS_SID = 'ga_sim:sid';
const LS_LAST = 'ga_sim:last_activity';
const LS_SN = 'ga_sim:session_number';
const LS_ATTRIB = 'ga_sim:attrib';
const DEFAULT_TIMEOUT = 30 * 60 * 1000; // 30m

let configMap = new Map(); // measurementId -> config
let globalConfig = { send_page_view: true };
let measurementIdPrimary = null;

let clientId; let sessionId; let sessionNumber = 1; let lastActivity = 0;
let initialized = false; let processingQueue = false;
let sessionTimeoutMs = DEFAULT_TIMEOUT;
let attribution = null; // {source, medium, campaign, referrer}
let debugReferrer = null;

// Queue pattern
window.dataLayer = window.dataLayer || [];
if (!window.gtag) {
  window.gtag = function(){ window.dataLayer.push(arguments); };
}

export async function initGASim(opts = {}) {
  if (initialized) return; // singleton guard
  initialized = true;
  setupMessageListener();
  await ensureServiceWorker();
  restoreIds();
  processDataLayer();
  if (opts.measurementId) {
    gtag('config', opts.measurementId, { send_page_view: opts.send_page_view !== false });
  }
}

function restoreIds() {
  clientId = getItem(LS_CID); if (!clientId) { clientId = generateGaLikeCid(); setItem(LS_CID, clientId); }
  sessionId = getItem(LS_SID); sessionNumber = parseInt(getItem(LS_SN) || '1', 10); lastActivity = parseInt(getItem(LS_LAST) || '0', 10);
  const now = Date.now();
  if (!sessionId) {
    startNewSession(now, true);
  } else if (now - lastActivity > sessionTimeoutMs) {
    startNewSession(now, false);
  } else {
    lastActivity = now; setItem(LS_LAST, String(lastActivity));
  }
  const attribRaw = getItem(LS_ATTRIB); if (attribRaw) try { attribution = JSON.parse(attribRaw); } catch {}
}

function startNewSession(ts, first) {
  sessionId = generateGaLikeCid(); // reuse format for simplicity
  if (!first) sessionNumber += 1; else sessionNumber = 1;
  lastActivity = ts;
  setItem(LS_SID, sessionId); setItem(LS_LAST, String(ts)); setItem(LS_SN, String(sessionNumber));
  fireInternal('session_start', {});
  if (first) fireInternal('first_visit', {});
}

function processDataLayer() {
  if (processingQueue) return; processingQueue = true;
  const q = window.dataLayer.slice();
  window.dataLayer.length = 0; // drain
  q.forEach(args => handleGtagCall(...args));
  window.gtag = handleGtagCall; // replace with direct handler
}

function handleGtagCall(command, a, b) {
  switch (command) {
    case 'js':
      // GA sets load time; we can ignore
      return;
    case 'config':
      return handleConfig(a, b || {});
    case 'event':
      return handleEvent(a, b || {});
    case 'set':
      return handleSet(a || {});
    default:
      return; // ignore unsupported
  }
}

function handleConfig(measurementId, options) {
  measurementIdPrimary = measurementIdPrimary || measurementId;
  configMap.set(measurementId, { ...globalConfig, ...options });
  if (options.session_timeout_ms) sessionTimeoutMs = options.session_timeout_ms;
  if (options.send_page_view !== false) {
    // auto page_view
    pageView({ page_path: options.page_path || getPath(), page_title: options.page_title || getTitle() });
  }
}

function handleSet(vars) {
  if (vars.debug_referrer) debugReferrer = vars.debug_referrer;
  // could store user_id, custom dims later
}

function handleEvent(name, params) {
  if (name === 'page_view') return pageView(params);
  fireInternal(name, params);
}

function pageView(params = {}) {
  deriveAttributionIfNeeded();
  fireInternal('page_view', {
    page_path: params.page_path || getPath(),
    page_title: params.page_title || getTitle(),
    ...params
  });
}

function fireInternal(name, params) {
  const ts = Date.now();
  lastActivity = ts; setItem(LS_LAST, String(ts));
  const remote = (typeof globalThis.__GA_SIM_REMOTE_NAME !== 'undefined') ? globalThis.__GA_SIM_REMOTE_NAME : 'host';
  const envelope = {
    name,
    ts,
    client_id: clientId,
    session_id: sessionId,
    session_number: sessionNumber,
    ...attributionFields(),
    params: { ...params, remote }
  };
  enqueueEvent(envelope);
}

function attributionFields() {
  if (!attribution) return { source: undefined, medium: undefined, campaign: undefined };
  const { source, medium, campaign } = attribution;
  return { source, medium, campaign };
}

function deriveAttributionIfNeeded() {
  if (attribution) return; // already set for this session
  const url = (typeof location !== 'undefined') ? location.href : '';
  const { search } = (typeof location !== 'undefined') ? location : { search: '' };
  const params = new URLSearchParams(search || '');
  const utm_source = params.get('utm_source');
  const utm_medium = params.get('utm_medium');
  const utm_campaign = params.get('utm_campaign');
  let ref = debugReferrer || (typeof document !== 'undefined' ? document.referrer : '');
  if (utm_source && utm_medium) {
    attribution = { source: utm_source, medium: utm_medium, campaign: utm_campaign || '(not set)', referrer: ref || null };
  } else {
    // basic direct / referral fallback
    if (ref) {
      try { const u = new URL(ref); attribution = { source: u.hostname, medium: 'referral', campaign: '(referral)', referrer: ref }; }
      catch { attribution = { source: '(direct)', medium: '(none)', campaign: '(none)', referrer: null }; }
    } else {
      attribution = { source: '(direct)', medium: '(none)', campaign: '(none)', referrer: null };
    }
  }
  setItem(LS_ATTRIB, JSON.stringify(attribution));
}

function getPath() { return (typeof location !== 'undefined') ? (location.pathname + location.search) : '/'; }
function getTitle() { return (typeof document !== 'undefined') ? document.title : ''; }

// Public debug helpers (temporary; remove later if desired)
window.__gaSimDebug = {
  listSessions: () => listSessions(),
  getSessionEvents: (sid) => getSessionEvents(sid),
  getAllEvents: () => getAllEvents()
};

export { pageView };