# Analytics Integration Exercises

This document contains hands-on exercises to practice integrating analytics into the ecommerce microfrontend flow. Each exercise includes hints and expected outcomes to guide your learning.

## Prerequisites

Before starting these exercises, ensure you have:
1. All microfrontends running locally (see README for setup instructions)
2. Browser developer console open to view analytics events
3. Basic understanding of analytics platforms (Segment, Adobe Analytics, Google Analytics)

---

# Interview-Style Practice Scenarios

## Adobe Analytics Implementation Scenario

**Scenario**: You are tasked with implementing Adobe Analytics tracking for a complete ecommerce user journey. A customer visits the product catalog, views a specific product, adds it to their cart, and completes the checkout process.

### Your Task: Implement Adobe Analytics Event Tracking

**User Journey to Track:**
1. **Product List Page View** - User browses the product catalog
2. **Product Detail View** - User clicks on a specific product 
3. **Add to Cart** - User adds the product to their shopping cart
4. **Purchase** - User completes the checkout process

### Implementation Requirements:

#### 1. Product List Page View (ProductList.js)
**Location**: `/product-list-app/components/ProductList.js`
**Events to implement:**
```javascript
// Adobe Analytics page view
s.pageName = "Product List";
s.channel = "ecommerce";
s.prop1 = "product-catalog";
s.eVar1 = filterValue; // current filter applied
s.t(); // Send page view

// Product impressions 
s.events = "prodView";
s.products = "Electronics;Wireless Headphones;1;99.99";
s.t();
```

**Hint**: Look for the `useEffect` hook that currently tracks Segment analytics. Replace or add Adobe Analytics calls.

#### 2. Product Detail View (ProductDetail.js)  
**Location**: `/product-detail-app/components/ProductDetail.js`
**Events to implement:**
```javascript
// Product detail view
s.pageName = `Product Detail - ${product.name}`;
s.events = "prodView";
s.products = `${product.category};${product.name};1;${product.price}`;
s.eVar2 = product.id;
s.eVar3 = product.category;
s.t();
```

**Hint**: Check the `useEffect` that fires when product data loads.

#### 3. Add to Cart (ProductDetail.js)
**Location**: `/product-detail-app/components/ProductDetail.js` in `handleAddToCart` function
**Events to implement:**
```javascript
// Add to cart event
s.events = "scAdd";
s.products = `${product.category};${product.name};${quantity};${product.price * quantity}`;
s.eVar4 = "add-to-cart";
s.t();
```

**Hint**: Find the `handleAddToCart` function that currently has Segment tracking.

#### 4. Purchase Event (Checkout.js)
**Location**: `/checkout-app/components/Checkout.js` in `handlePlaceOrder` function  
**Events to implement:**
```javascript
// Purchase completion
s.events = "purchase";
s.purchaseID = orderId;
s.products = cartItems.map(item => 
  `${item.category};${item.name};${item.quantity};${item.price * item.quantity}`
).join(",");
s.eVar5 = customerInfo.paymentMethod;
s.eVar6 = totalPrice;
s.t();
```

**Hint**: Look for the order completion logic in the `handlePlaceOrder` async function.

### Testing Your Implementation:
- Use browser developer tools Network tab
- Look for calls to Adobe Analytics collection servers
- Verify s.products string format is correct
- Check that eVars and props contain expected values

---

## Google Analytics (GA4) Conversion Scenario

**Scenario**: The company wants to migrate from Adobe Analytics to Google Analytics 4 (GA4). Convert the Adobe Analytics implementation above to use GA4 events and best practices.

### Your Task: Convert Adobe Analytics to GA4

**Key Differences to Address:**
- GA4 uses event-based tracking vs page/prop based
- Different parameter naming conventions  
- Enhanced ecommerce events have specific formats
- dataLayer structure for Google Tag Manager

### GA4 Implementation Requirements:

#### 1. Product List Page View
**Convert from Adobe Analytics to GA4:**
```javascript
// Instead of Adobe Analytics s.t()
gtag('event', 'page_view', {
  page_title: 'Product List',
  page_location: window.location.href,
  content_group1: 'ecommerce',
  custom_parameter_filter: filterValue
});

// Product impressions for GA4
gtag('event', 'view_item_list', {
  item_list_id: 'product_catalog',
  item_list_name: 'Product Catalog',
  items: filteredProducts.map(product => ({
    item_id: product.id,
    item_name: product.name,
    item_category: product.category,
    price: product.price,
    index: products.indexOf(product)
  }))
});
```

#### 2. Product Detail View  
**Convert Adobe s.products to GA4 items:**
```javascript
gtag('event', 'view_item', {
  currency: 'USD',
  value: product.price,
  items: [{
    item_id: product.id,
    item_name: product.name,
    item_category: product.category,
    price: product.price,
    quantity: 1
  }]
});
```

#### 3. Add to Cart Event
**Convert Adobe scAdd to GA4:**
```javascript
gtag('event', 'add_to_cart', {
  currency: 'USD', 
  value: product.price * quantity,
  items: [{
    item_id: product.id,
    item_name: product.name,
    item_category: product.category,
    price: product.price,
    quantity: quantity
  }]
});
```

#### 4. Purchase Event
**Convert Adobe purchase to GA4:**
```javascript
gtag('event', 'purchase', {
  transaction_id: orderId,
  currency: 'USD',
  value: totalPrice,
  items: cartItems.map(item => ({
    item_id: item.id,
    item_name: item.name,
    item_category: item.category || 'Unknown',
    price: item.price,
    quantity: item.quantity
  }))
});
```

### Additional GA4 Best Practices:

1. **dataLayer Implementation** (Alternative to gtag):
```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'USD',
    value: product.price * quantity,
    items: [/* item details */]
  }
});
```

2. **Enhanced Ecommerce Events** to also implement:
- `begin_checkout` (when user starts checkout)
- `add_payment_info` (when payment method selected)  
- `add_shipping_info` (when shipping info added)

3. **Custom Parameters** for business needs:
```javascript
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    'custom_parameter_1': 'user_type',
    'custom_parameter_2': 'product_source'
  }
});
```

### Migration Testing Checklist:
- [ ] All Adobe Analytics events have GA4 equivalents
- [ ] Enhanced ecommerce data structure is correct
- [ ] Custom dimensions map to GA4 custom parameters
- [ ] Revenue and conversion tracking works
- [ ] Real-time reporting shows events in GA4 interface

---

## General Testing & Verification Guidelines

### Testing Analytics Implementation Without Real Credentials

**Important**: You can test analytics implementations without real Adobe Analytics or GA4 accounts by using these methods:

#### 1. Browser Console Testing
```javascript
// Override analytics functions to log instead of sending
window.s = {
  t: function() { console.log('Adobe Analytics call:', this); },
  tl: function() { console.log('Adobe Analytics link call:', this); }
};

window.gtag = function(command, eventName, parameters) {
  console.log('GA4 Event:', { command, eventName, parameters });
};
```

#### 2. Network Tab Verification
- **Adobe Analytics**: Look for calls to `*.omtrdc.net` or `*.sc.omtrdc.net`
- **GA4**: Look for calls to `www.google-analytics.com/g/collect`
- **Segment**: Look for calls to `api.segment.io/v1/track`

**What to Verify:**
- Correct event names and parameters
- Proper product data formatting
- Revenue values are accurate  
- Custom dimensions/parameters populated

#### 3. Debug Extensions & Tools

**For Adobe Analytics:**
- Adobe Experience Cloud Debugger (Chrome/Firefox extension)
- Adobe Analytics Debugger bookmarklet
- Browser console: `s.debugTracking = true;`

**For GA4:**
- Google Analytics Debugger (Chrome extension) 
- GA4 DebugView in Google Analytics interface
- Browser console: Enable debug mode with `gtag('config', 'GA_MEASUREMENT_ID', { debug_mode: true });`

**For General Testing:**
- Charles Proxy or Fiddler for network inspection
- Postman for testing analytics API endpoints

#### 4. Mock Analytics Setup for Development

Create a mock analytics utility for safe testing:

```javascript
// utils/mockAnalytics.js
const MockAnalytics = {
  isDebugMode: process.env.NODE_ENV === 'development',
  
  // Adobe Analytics mock
  s: {
    t: function() {
      if (MockAnalytics.isDebugMode) {
        console.log('🔍 Adobe Analytics Page View:', {
          pageName: this.pageName,
          channel: this.channel,
          events: this.events,
          products: this.products,
          props: Object.keys(this).filter(k => k.startsWith('prop')),
          eVars: Object.keys(this).filter(k => k.startsWith('eVar'))
        });
      }
    },
    tl: function(element, linkType, linkName) {
      if (MockAnalytics.isDebugMode) {
        console.log('🔍 Adobe Analytics Link Track:', { linkType, linkName, products: this.products });
      }
    }
  },
  
  // GA4 mock
  gtag: function(command, eventName, parameters) {
    if (MockAnalytics.isDebugMode) {
      console.log('🔍 GA4 Event:', { command, eventName, parameters });
    }
  },
  
  // Enhanced logging for ecommerce events
  logEcommerceEvent: function(platform, eventType, data) {
    if (MockAnalytics.isDebugMode) {
      console.group(`🛒 ${platform} - ${eventType}`);
      console.log('Event Data:', data);
      console.log('Revenue:', data.value || data.revenue || 'N/A');
      console.log('Items:', data.items || data.products || 'N/A');
      console.groupEnd();
    }
  }
};

export default MockAnalytics;
```

#### 5. Testing Checklist

**Before Implementation:**
- [ ] Understand the user journey to track
- [ ] Define the events and parameters needed
- [ ] Plan where in the code to place tracking calls
- [ ] Set up mock/debug environment

**During Implementation:**
- [ ] Test each event individually
- [ ] Verify parameters are populated correctly
- [ ] Check events fire at the right time
- [ ] Test error handling (what if analytics fails?)

**After Implementation:**
- [ ] Test complete user journey end-to-end
- [ ] Verify data appears correctly in browser console
- [ ] Check network requests have correct payloads
- [ ] Test edge cases (empty cart, failed checkout, etc.)
- [ ] Validate across different browsers

**Production Readiness:**
- [ ] Replace mock implementations with real analytics
- [ ] Test with real analytics account in staging
- [ ] Verify privacy compliance (GDPR, CCPA)
- [ ] Set up monitoring/alerts for analytics failures
- [ ] Document the implementation for future team members

#### 6. Common Issues & Debugging

**Data Not Appearing:**
- Check if analytics library is loaded (`window.s`, `window.gtag`, `window.analytics`)
- Verify network requests are being made
- Check for JavaScript errors in console
- Ensure async timing doesn't affect tracking

**Incorrect Data:**
- Log variables before sending to analytics
- Check data types (strings vs numbers)
- Verify currency formatting
- Test product array/object structure

**Performance Issues:**
- Use async analytics calls when possible
- Batch events when appropriate
- Don't block user interactions for analytics
- Consider using web workers for heavy analytics processing

---

## Exercise 1: Product Discovery Analytics

**Objective**: Track user behavior during product discovery and browsing.

### Tasks:
1. **Product List Page Views**
   - Track when users visit the product list page
   - Include product category filter usage
   - Monitor search/filter performance

2. **Product Card Interactions**
   - Track product card clicks (view_product events)
   - Monitor which products get the most attention
   - Track product impressions vs. clicks

### Implementation Hints:
- Use `window.analytics.page()` for page views
- Use `window.analytics.track('Product Viewed')` for product interactions
- Include product metadata: `product_id`, `product_name`, `product_category`, `product_price`
- Track filter usage with custom events

### Expected Analytics Events:
```javascript
// Page view
analytics.page('Product List', {
  title: 'Product List Page',
  path: '/products',
  filter_applied: 'Electronics',
  total_products_shown: 6
});

// Product interaction
analytics.track('Product Viewed', {
  product_id: 1,
  product_name: 'Wireless Bluetooth Headphones',
  product_category: 'Electronics',
  product_price: 99.99,
  position: 1,
  list_name: 'Product Grid'
});
```

### Validation:
- Check console for analytics events when browsing products
- Verify all required product properties are included
- Test filter interactions generate appropriate events

---

## Exercise 2: Product Detail Analytics

**Objective**: Measure engagement on product detail pages and track add-to-cart behavior.

### Tasks:
1. **Product Detail Page Views**
   - Track individual product page visits
   - Monitor time spent on product pages
   - Track feature/specification section views

2. **Add to Cart Analytics**
   - Track successful add-to-cart events
   - Monitor quantity changes before adding
   - Track abandoned product detail pages

### Implementation Hints:
- Include `product_id` in page view events for correlation
- Track `Product Added` events with quantity and value
- Use `window.analytics.track()` for interactions
- Consider tracking scroll depth or section views

### Expected Analytics Events:
```javascript
// Product detail page view
analytics.page('Product Detail', {
  title: 'Product Detail - Wireless Headphones',
  path: '/product/1',
  product_id: 1,
  product_name: 'Wireless Bluetooth Headphones',
  product_price: 99.99
});

// Add to cart
analytics.track('Product Added', {
  product_id: 1,
  product_name: 'Wireless Bluetooth Headphones',
  product_category: 'Electronics',
  product_price: 99.99,
  quantity: 2,
  currency: 'USD',
  value: 199.98
});
```

### Validation:
- Navigate to product details and verify page view events
- Add items to cart and check for proper event tracking
- Test different quantities and verify value calculations

---

## Exercise 3: Shopping Cart Analytics

**Objective**: Track cart management behavior and optimize the cart experience.

### Tasks:
1. **Cart Page Analytics**
   - Track cart page views with item count and value
   - Monitor empty cart vs. populated cart views
   - Track cart abandonment patterns

2. **Cart Modification Events**
   - Track quantity updates (increase/decrease)
   - Track item removals from cart
   - Monitor cart clear events

3. **Checkout Initiation**
   - Track when users start the checkout process
   - Include cart composition in checkout events

### Implementation Hints:
- Use the shared cart context to access current cart state
- Track both individual item changes and overall cart metrics
- Include cart value and item count in all cart-related events

### Expected Analytics Events:
```javascript
// Cart page view
analytics.page('Shopping Cart', {
  title: 'Shopping Cart',
  path: '/cart',
  items_count: 3,
  cart_value: 459.97,
  currency: 'USD'
});

// Cart update
analytics.track('Cart Updated', {
  product_id: 1,
  product_name: 'Wireless Bluetooth Headphones',
  old_quantity: 1,
  new_quantity: 2,
  quantity_change: 1,
  cart_value: 459.97
});

// Checkout started
analytics.track('Checkout Started', {
  order_id: 'temp_order_123',
  value: 459.97,
  currency: 'USD',
  items_count: 3,
  products: [/* array of cart items */]
});
```

### Validation:
- View cart and verify analytics events include correct totals
- Modify cart items and check for update events
- Start checkout process and verify initiation tracking

---

## Exercise 4: Checkout Flow Analytics

**Objective**: Track the complete checkout funnel and identify optimization opportunities.

### Tasks:
1. **Checkout Step Tracking**
   - Track progression through checkout steps
   - Monitor form completion rates
   - Identify checkout abandonment points

2. **Payment Method Analytics**
   - Track payment method selection
   - Monitor payment flow completion
   - Track payment errors or retries

3. **Order Completion**
   - Track successful order completion
   - Include revenue and product details
   - Monitor order confirmation events

### Implementation Hints:
- Track each checkout step as a separate event
- Include step numbers and completion status
- Use `Order Completed` event for successful purchases
- Include customer information (where privacy-appropriate)

### Expected Analytics Events:
```javascript
// Checkout step
analytics.track('Checkout Step Completed', {
  step: 1,
  step_name: 'Customer Information',
  items_count: 3,
  checkout_value: 459.97,
  currency: 'USD'
});

// Order completed
analytics.track('Order Completed', {
  order_id: 'ORD-1642589123456',
  revenue: 496.77, // including tax
  currency: 'USD',
  items_count: 3,
  products: [{
    product_id: 1,
    product_name: 'Wireless Bluetooth Headphones',
    product_category: 'Electronics',
    product_price: 99.99,
    quantity: 1
  }],
  customer_email: 'user@example.com',
  payment_method: 'credit'
});
```

### Validation:
- Complete the entire checkout flow and verify all step events
- Check order completion event includes all required data
- Test checkout abandonment (refresh page) scenarios

---

## Exercise 5: Cross-Microfrontend Analytics

**Objective**: Implement consistent analytics across all microfrontends and track user journeys.

### Tasks:
1. **Session Tracking**
   - Maintain consistent user session across microfrontends
   - Track user journey across different apps
   - Implement cross-app user identification

2. **Event Standardization**
   - Ensure consistent event naming across apps
   - Standardize product property names
   - Implement common metadata structure

3. **Performance Monitoring**
   - Track microfrontend load times
   - Monitor module federation performance
   - Track any cross-app navigation delays

### Implementation Hints:
- Use localStorage or sessionStorage for cross-app session tracking
- Create shared analytics utility functions
- Implement consistent error handling for analytics failures
- Consider using analytics middleware for common properties

### Expected Implementation:
```javascript
// Shared analytics utility
const trackEvent = (eventName, properties = {}) => {
  const commonProperties = {
    session_id: getSessionId(),
    user_id: getUserId(),
    app_version: process.env.NEXT_PUBLIC_APP_VERSION,
    timestamp: new Date().toISOString()
  };
  
  if (window.analytics) {
    window.analytics.track(eventName, {
      ...commonProperties,
      ...properties
    });
  }
};
```

### Validation:
- Navigate between microfrontends and verify session consistency
- Check that all events include standard metadata
- Test analytics in different browsers and devices

---

## Exercise 6: Analytics Testing and Validation

**Objective**: Create a comprehensive testing strategy for analytics implementation.

### Tasks:
1. **Event Validation**
   - Create automated tests for analytics events
   - Validate event schemas and required properties
   - Test edge cases (empty cart, network failures)

2. **Analytics Debugging**
   - Implement analytics debugging tools
   - Create event monitoring dashboard
   - Set up alerts for missing or malformed events

3. **Privacy and Compliance**
   - Implement user consent management
   - Create opt-out mechanisms
   - Ensure GDPR/CCPA compliance

### Implementation Hints:
- Use analytics.js development mode for testing
- Create mock analytics functions for unit tests
- Implement event buffering for offline scenarios
- Use browser's Network tab to verify analytics calls

### Testing Checklist:
- [ ] All page views are tracked with correct properties
- [ ] Product interactions include required metadata
- [ ] Cart operations generate appropriate events
- [ ] Checkout flow is completely tracked
- [ ] Order completion includes revenue data
- [ ] Events work across all microfrontends
- [ ] Analytics work in incognito/private browsing
- [ ] Events are consistent across page refreshes

---

## Bonus Exercises

### Exercise 7: Advanced Analytics Features

1. **A/B Testing Integration**
   - Implement variant tracking in analytics events
   - Track experiment participation and outcomes
   - Measure conversion rate impacts

2. **Real-time Analytics Dashboard**
   - Create a simple dashboard showing live events
   - Display key metrics (conversion rate, average order value)
   - Show user journey visualization

3. **Customer Segmentation**
   - Track user behavior patterns
   - Implement customer lifetime value tracking
   - Create cohort analysis events

### Exercise 8: Performance Analytics

1. **Core Web Vitals Tracking**
   - Track page load performance
   - Monitor microfrontend loading times
   - Measure user interaction delays

2. **Error Tracking**
   - Track JavaScript errors
   - Monitor failed API calls
   - Track analytics failures

---

## Resources and References

### Analytics Platforms:
- [Segment Analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/)
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Adobe Analytics](https://experienceleague.adobe.com/docs/analytics/implementation/home.html)

### Best Practices:
- [Ecommerce Analytics Best Practices](https://segment.com/docs/guides/ecommerce/)
- [Analytics Implementation Guide](https://segment.com/docs/guides/how-to-guides/collect-page-views/)
- [Privacy and Compliance](https://segment.com/docs/privacy/)

### Testing Tools:
- [Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
- [Segment Debugger](https://segment.com/docs/connections/sources/debugger/)

---

## Getting Help

If you encounter issues during these exercises:

1. Check the browser console for error messages
2. Verify all microfrontends are running on correct ports
3. Ensure Segment analytics snippet is properly loaded
4. Test in different browsers to isolate environment issues
5. Use the network tab to verify analytics calls are being made

For additional support, refer to the README.md file for setup instructions and troubleshooting tips.