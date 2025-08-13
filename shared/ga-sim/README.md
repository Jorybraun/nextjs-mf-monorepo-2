# @shared/ga-sim (Phase 1)

Minimal GA-like analytics shim for a Module Federation microfrontend stack.

## Features (Phase 1)
- window.gtag queue API (js, config, set, event)
- Client + session IDs (30m inactivity timeout)
- first_visit, session_start, page_view auto events
- UTM + (debug) referrer capture on session start
- Remote tagging (globalThis.__GA_SIM_REMOTE_NAME)
- Inline Service Worker (in-memory) storing events grouped by session
- Query helpers for future dashboard

## Quick Start
```js
import { initGASim } from '@shared/ga-sim';
initGASim({ measurementId: 'G-DEV-TEST', send_page_view: true });
// Later
window.gtag('event', 'select_content', { link_id: 'cta_hero' });
```

## Debug
```js
window.__gaSimDebug.listSessions().then(console.log);
window.__gaSimDebug.getAllEvents().then(console.log);
```

## Switching to a Static SW File Later
Extract WORKER_SOURCE string in src/swClient.js into /public/sw-ga-sim.js and replace registerInlineServiceWorker() with a normal navigator.serviceWorker.register('/sw-ga-sim.js').

## To Do in Later Phases
- IndexedDB persistence
- Performance + error events
- Funnel queries & dashboard UI
- Consent & sampling