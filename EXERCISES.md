# Analytics Integration Exercises

This document contains hands-on exercises to practice integrating analytics into the ecommerce microfrontend flow. Each exercise includes hints and expected outcomes to guide your learning.

## Prerequisites

Before starting these exercises, ensure you have:
1. All microfrontends running locally (see README for setup instructions)
2. Browser developer console open to view analytics events
3. Basic understanding of Segment analytics or similar analytics platforms

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