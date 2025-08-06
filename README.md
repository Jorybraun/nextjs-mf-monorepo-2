# Next.js Module Federation Monorepo with Segment Analytics

A complete Next.js Module Federation monorepo setup with Segment analytics.js integration.

## Structure

```
├── package.json                    # Root workspace configuration
├── host-app/                      # Host application (port 3000)
│   ├── package.json               
│   ├── next.config.js             # Module Federation host config
│   ├── pages/
│   │   ├── _document.js           # Segment analytics snippet
│   │   └── index.js               # Consumes remote component
├── remote-app/                    # Remote application (port 3001)
│   ├── package.json               
│   ├── next.config.js             # Module Federation remote config
│   ├── pages/
│   │   ├── _document.js           # Segment analytics snippet
│   │   └── index.js               # Renders RemoteButton
│   └── components/
│       └── RemoteButton.js        # Exposed component with analytics
```

## Features

- ✅ **Module Federation**: Host app consumes remote components seamlessly
- ✅ **Segment Analytics**: Integrated in both host and remote apps
- ✅ **Workspace Monorepo**: Easy development with npm workspaces
- ✅ **Modern Next.js**: Built with Next.js 14 and React 18
- ✅ **Error Handling**: Graceful fallbacks for remote component loading
- ✅ **Analytics Tracking**: Page views and button click events tracked

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start both applications:**
   ```bash
   # Terminal 1 - Start remote app (port 3001)
   npm run dev:remote
   
   # Terminal 2 - Start host app (port 3000)
   npm run dev:host
   ```

3. **Add your Segment write key:**
   - Replace `YOUR_SEGMENT_WRITE_KEY` in both `host-app/pages/_document.js` and `remote-app/pages/_document.js`

4. **Open the applications:**
   - Host app: http://localhost:3000
   - Remote app: http://localhost:3001

## Available Scripts

```bash
npm run dev:host      # Start host app only
npm run dev:remote    # Start remote app only
npm run build:host    # Build host app
npm run build:remote  # Build remote app
npm run dev          # Start both apps (requires both terminals)
```

## Analytics Implementation

Both applications include Segment analytics tracking:

- **Page views**: Automatically tracked when pages load
- **Button clicks**: Custom events tracked with component metadata
- **Cross-app tracking**: Remote components track analytics independently

Open browser console to see analytics events being logged.

## Module Federation Configuration

- **Remote app exposes**: `./RemoteButton` component
- **Host app consumes**: Remote components from `http://localhost:3001`
- **Shared dependencies**: React and React-DOM are shared between apps
- **Fallback handling**: Graceful degradation when remote is unavailable

## Development Notes

- Both apps must be running for Module Federation to work properly
- The host app will show a fallback component if the remote app is not available
- Hot reloading works for both local and remote components
- SSR is disabled for Module Federation to avoid hydration issues
