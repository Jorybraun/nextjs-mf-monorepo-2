# Environment Variables Configuration

This document outlines the environment variables used for API endpoint configuration across the microfrontends.

## Host App (Port 3000)

No API variables needed - Host app orchestrates the other services.

## Product List App (Port 3002)

```bash
# API URL for product list service
NEXT_PUBLIC_PRODUCT_LIST_API_URL=http://localhost:3002
```

## Product Detail App (Port 3003)

```bash
# API URL for product detail service  
NEXT_PUBLIC_PRODUCT_DETAIL_API_URL=http://localhost:3003
```

## Cart App (Port 3004)

No external API calls - uses context for state management.

## Checkout App (Port 3005)

No external API calls in current implementation.

## Remote App (Port 3001)

```bash
# API URL for remote service (if needed)
NEXT_PUBLIC_REMOTE_API_URL=http://localhost:3001
```

## Production Environment

For production deployments, update these URLs to point to your actual service endpoints:

```bash
# Example production URLs
NEXT_PUBLIC_PRODUCT_LIST_API_URL=https://api.yourcompany.com/product-list
NEXT_PUBLIC_PRODUCT_DETAIL_API_URL=https://api.yourcompany.com/product-detail
NEXT_PUBLIC_REMOTE_API_URL=https://api.yourcompany.com/remote
```

## CORS Configuration

Since no Express proxy is used, each backend service must handle CORS properly. 

For Node.js/Express services, add CORS middleware:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000', // Host app
    'http://localhost:3002', // Product list
    'http://localhost:3003', // Product detail  
    'http://localhost:3004', // Cart
    'http://localhost:3005', // Checkout
    'https://yourproductiondomain.com' // Production
  ],
  credentials: true
}));
```

Make sure your API services properly configure CORS headers to allow requests from the frontend origins.