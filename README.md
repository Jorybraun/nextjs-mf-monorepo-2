# Next.js Module Federation Monorepo with Ecommerce Microfrontends

A complete Next.js Module Federation monorepo featuring a full ecommerce flow built as independent microfrontends, with comprehensive Segment analytics integration.

## Architecture Overview

This project demonstrates a real-world ecommerce application built using the microfrontend architecture pattern. Each part of the shopping experience is an independent, deployable application that can be developed and maintained by separate teams.

## Microfrontend Structure

```
├── package.json                    # Root workspace configuration
├── host-app/                      # Main orchestrator (port 3000)
│   ├── pages/index.js              # Ecommerce navigation and routing
│   └── next.config.js              # Consumes all remote microfrontends
├── product-list-app/               # Product catalog (port 3002)
│   ├── components/ProductList.js   # Product browsing and filtering
│   ├── components/ProductCard.js   # Individual product displays
│   └── pages/api/products.js       # Mock product data API
├── product-detail-app/             # Product details (port 3003)
│   ├── components/ProductDetail.js # Detailed product information
│   └── pages/api/products/[id].js  # Individual product API
├── cart-app/                       # Shopping cart (port 3004)
│   ├── components/Cart.js          # Cart management interface
│   └── contexts/CartContext.js     # Shared cart state management
├── checkout-app/                   # Order completion (port 3005)
│   ├── components/Checkout.js      # Multi-step checkout flow
│   └── pages/index.js              # Checkout orchestration
├── remote-app/                     # Original demo (port 3001)
│   └── components/RemoteButton.js  # Original federation example
├── EXERCISES.md                    # Analytics integration practice
└── README.md                       # This file
```

## Features

### Ecommerce Flow
- 🛍️ **Complete Shopping Experience**: Product browsing → Product details → Cart management → Checkout → Order completion
- 🏗️ **Microfrontend Architecture**: Each step is an independent Next.js application
- 📊 **Analytics Integration**: Comprehensive event tracking throughout the customer journey
- 🔄 **Cross-App Communication**: Shared state management and URL-based navigation
- 🎯 **Practice-Ready**: Includes exercises for learning analytics integration

### Technical Features
- ✅ **Module Federation**: Seamless component sharing between applications
- ✅ **Segment Analytics**: Integrated in all microfrontends with ecommerce tracking
- ✅ **Workspace Monorepo**: Easy development with npm workspaces
- ✅ **Modern Next.js**: Built with Next.js 14 and React 18
- ✅ **Error Handling**: Graceful fallbacks for remote component loading
- ✅ **Shared State**: Cart context shared across microfrontends
- ✅ **Mock Data**: Realistic product data for development and testing

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start All Microfrontends

**Option A: Start all at once (requires multiple terminals)**
```bash
# Terminal 1 - Host App (Main orchestrator)
npm run dev:host

# Terminal 2 - Product List App 
npm run dev:product-list

# Terminal 3 - Product Detail App
npm run dev:product-detail

# Terminal 4 - Cart App
npm run dev:cart

# Terminal 5 - Checkout App
npm run dev:checkout

# Terminal 6 - Original Remote App (optional)
npm run dev:remote
```

**Option B: Start individual apps as needed**
```bash
# Essential apps for ecommerce flow
npm run dev:host          # Port 3000 - Main app
npm run dev:product-list   # Port 3002 - Product catalog
npm run dev:product-detail # Port 3003 - Product details
npm run dev:cart          # Port 3004 - Shopping cart
npm run dev:checkout      # Port 3005 - Checkout flow

# Optional: Original demo app
npm run dev:remote        # Port 3001 - Original demo
```

### 3. Configure Analytics (Optional)
- Replace `YOUR_SEGMENT_WRITE_KEY` in all `pages/_document.js` files with your actual Segment write key
- Or leave as-is to see analytics events in browser console only

### 4. Access the Applications
- **Main Ecommerce App**: http://localhost:3000
- **Product List**: http://localhost:3002 (standalone)
- **Product Detail**: http://localhost:3003 (standalone)
- **Shopping Cart**: http://localhost:3004 (standalone)
- **Checkout**: http://localhost:3005 (standalone)
- **Original Demo**: http://localhost:3001 (standalone)

## Available Scripts

### Development Scripts
```bash
npm run dev:host           # Start host app only (port 3000)
npm run dev:product-list   # Start product list app (port 3002)
npm run dev:product-detail # Start product detail app (port 3003)
npm run dev:cart          # Start cart app (port 3004)
npm run dev:checkout      # Start checkout app (port 3005)
npm run dev:remote        # Start original remote app (port 3001)
```

### Build Scripts
```bash
npm run build:host         # Build host app
npm run build:product-list # Build product list app
npm run build:product-detail # Build product detail app
npm run build:cart        # Build cart app
npm run build:checkout    # Build checkout app
npm run build:remote      # Build original remote app
```

### Workspace Scripts
```bash
npm run dev               # Start all apps (not recommended - use individual scripts)
npm run build             # Build all apps
```

## Ecommerce User Journey

### 1. Product Discovery (Product List App - Port 3002)
- Browse product catalog with filtering options
- View product cards with images, prices, and ratings
- Click products to navigate to details
- **Analytics**: Page views, product impressions, filter usage

### 2. Product Details (Product Detail App - Port 3003)
- View detailed product information and specifications
- Select quantity and add items to cart
- Navigate back to product list
- **Analytics**: Product detail views, add-to-cart events

### 3. Cart Management (Cart App - Port 3004)
- View all cart items with images and details
- Update quantities or remove items
- See real-time cart totals with tax calculation
- Proceed to checkout
- **Analytics**: Cart views, cart modifications, checkout initiation

### 4. Checkout Process (Checkout App - Port 3005)
- Multi-step checkout with customer information
- Address and payment method collection
- Order review and confirmation
- Simulated order completion
- **Analytics**: Checkout steps, payment method selection, order completion

### 5. Cross-App Integration
- Shared cart state using localStorage and React Context
- Consistent navigation between microfrontends
- URL-based routing for bookmarkable states
- **Analytics**: Cross-app user journey tracking

## Analytics Implementation

### Tracked Events

#### Ecommerce Events
- `Product Viewed` - When users view product details
- `Product Added` - When items are added to cart
- `Cart Updated` - When cart quantities change
- `Product Removed` - When items are removed from cart
- `Checkout Started` - When checkout process begins
- `Checkout Step Completed` - Progress through checkout steps
- `Order Completed` - Successful purchase completion

#### Page View Events
- Product list page views with filter context
- Product detail page views with product information
- Cart page views with cart value and item count
- Checkout page views with step progression

#### User Interaction Events
- Filter usage and search behavior
- Navigation between microfrontends
- Error states and recovery actions

### Event Schema
All events include standardized properties:
```javascript
{
  // Common properties
  timestamp: '2024-01-01T00:00:00.000Z',
  app: 'product-list-app',
  user_id: 'anonymous_user_123',
  session_id: 'session_456',
  
  // Ecommerce properties
  product_id: 1,
  product_name: 'Wireless Bluetooth Headphones',
  product_category: 'Electronics',
  product_price: 99.99,
  currency: 'USD',
  value: 199.98,
  quantity: 2
}
```

## Module Federation Configuration

### Host App (Port 3000)
- **Consumes**: All ecommerce microfrontend components
- **Remotes**: ProductList, ProductDetail, Cart, Checkout, and original RemoteButton
- **Role**: Main application orchestrator and router

### Product List App (Port 3002)
- **Exposes**: `./ProductList` and `./ProductCard` components
- **Features**: Product catalog, filtering, and navigation
- **API**: `/api/products` - Mock product data

### Product Detail App (Port 3003)
- **Exposes**: `./ProductDetail` component  
- **Features**: Product information, specifications, add-to-cart
- **API**: `/api/products/[id]` - Individual product details

### Cart App (Port 3004)
- **Exposes**: `./Cart` component and `./CartProvider` context
- **Features**: Cart management, quantity updates, checkout navigation
- **State**: Shared cart context using localStorage persistence

### Checkout App (Port 3005)
- **Exposes**: `./Checkout` component
- **Features**: Multi-step checkout, form validation, order completion
- **Simulation**: Mock payment processing with order confirmation

### Remote App (Port 3001) - Original Demo
- **Exposes**: `./RemoteButton` component
- **Features**: Original Module Federation demonstration
- **Purpose**: Shows basic remote component integration

### Shared Dependencies
- React and React-DOM are shared between all applications
- Next.js framework with consistent version across apps
- Webpack Module Federation plugin for component sharing

## Testing Analytics Events

### Browser Console Testing
1. Open browser Developer Console (F12)
2. Navigate through the ecommerce flow
3. Watch for analytics events logged to console
4. Verify event properties match expected schema

### Example Console Output
```javascript
Analytics tracked: Product List page view
Analytics tracked: Product Viewed {product: "Wireless Bluetooth Headphones", id: 1}
Analytics tracked: Product Added to Cart {product: "Wireless Bluetooth Headphones", quantity: 1}
Analytics tracked: Cart page view {items: 1, value: 99.99}
Analytics tracked: Checkout Started {items: 1, value: 99.99}
Analytics tracked: Order Completed {orderId: "ORD-1642589123456", revenue: 107.99}
```

### Network Tab Verification
1. Open Network tab in Developer Tools
2. Filter by "analytics" or "segment.com"
3. Navigate through the app to see analytics calls
4. Inspect request payloads to verify event data

### Analytics Integration Testing
See `EXERCISES.md` for comprehensive testing exercises and validation steps.

## Practice Exercises

The repository includes `EXERCISES.md` with hands-on exercises for:

1. **Product Discovery Analytics** - Track browsing and search behavior
2. **Product Detail Analytics** - Monitor engagement and add-to-cart events  
3. **Shopping Cart Analytics** - Track cart modifications and abandonment
4. **Checkout Flow Analytics** - Monitor conversion funnel and completion
5. **Cross-Microfrontend Analytics** - Ensure consistent tracking across apps
6. **Analytics Testing** - Validate implementation and debug issues

Each exercise includes:
- Clear objectives and tasks
- Implementation hints and code examples
- Expected analytics event schemas
- Validation steps and testing checklists

## Development Notes

### Running the Complete Flow
- **Minimum Required**: Host app (3000) + at least one microfrontend
- **Recommended**: All ecommerce apps (3000, 3002, 3003, 3004, 3005)
- **Optional**: Original remote app (3001) for Module Federation demo

### Error Handling
- Host app shows fallback content when microfrontends are unavailable
- Each app can run independently for development and testing
- Graceful degradation maintains functionality during partial outages

### State Management
- Cart state persists across microfrontends using localStorage
- React Context provides shared cart functionality
- URL parameters enable deep linking and bookmarkable states

### Hot Reloading
- Hot reloading works for both local and remote components
- Changes in microfrontends reflect immediately in host app
- Independent development workflows for each team/app

### SSR Considerations
- Module Federation disabled for SSR to avoid hydration issues
- Client-side only component loading for remote microfrontends
- Analytics tracking configured for browser-only execution

## Troubleshooting

### Common Issues

**Microfrontend not loading:**
- Verify the target app is running on the correct port
- Check browser console for network errors
- Ensure Module Federation configuration matches port numbers

**Analytics events not firing:**
- Check if Segment snippet is loaded (`window.analytics` exists)
- Verify browser console shows analytics initialization
- Test with browser network tab to see outbound requests

**Cart state not persisting:**
- Check localStorage in browser Developer Tools
- Verify CartProvider is wrapping components correctly
- Test across different browser tabs/windows

**Build failures:**
- Ensure all workspace dependencies are installed (`npm install`)
- Check for conflicting package versions across workspaces
- Verify Next.js and Webpack versions are compatible

### Getting Help
1. Check browser console for detailed error messages
2. Verify all required ports are available and not in use
3. Test each microfrontend independently before integration
4. Use network tab to debug Module Federation loading issues
5. Reference Module Federation documentation for advanced configuration
