import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

const Cart = ({ onNavigateToCheckout, onNavigateToProducts }) => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  useEffect(() => {
    // Analytics: Track cart page view
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.page('Shopping Cart', {
        title: 'Shopping Cart',
        path: '/cart',
        items_count: totalItems,
        cart_value: totalPrice,
        currency: 'USD',
        app: 'cart-app',
      });
      console.log('Analytics tracked: Cart page view', {
        items: totalItems,
        value: totalPrice
      });
    }

    // TODO: Adobe Analytics Cart Page View
    // Implement Adobe Analytics cart page tracking here
    // Example:
    // if (typeof window !== 'undefined' && window.s) {
    //   window.s.pageName = "Shopping Cart";
    //   window.s.channel = "ecommerce";
    //   window.s.events = "scView";
    //   window.s.eVar7 = totalItems.toString();
    //   window.s.eVar8 = totalPrice.toFixed(2);
    //   window.s.t();
    // }

    // TODO: GA4 Cart Page View  
    // Implement GA4 page view with cart context here
    // Example:
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('event', 'page_view', {
    //     page_title: 'Shopping Cart',
    //     page_location: window.location.href,
    //     content_group1: 'ecommerce',
    //     value: totalPrice,
    //     currency: 'USD',
    //     items_count: totalItems
    //   });
    // }
  }, [totalItems, totalPrice]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    // Analytics: Track checkout initiated
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Checkout Started', {
        order_id: `order_${Date.now()}`,
        value: totalPrice,
        currency: 'USD',
        items_count: totalItems,
        products: items.map(item => ({
          product_id: item.id,
          product_name: item.name,
          product_price: item.price,
          quantity: item.quantity
        })),
        app: 'cart-app',
        timestamp: new Date().toISOString(),
      });
      console.log('Analytics tracked: Checkout Started', {
        items: totalItems,
        value: totalPrice
      });
    }

    // TODO: Adobe Analytics Checkout Initiation
    // Implement Adobe Analytics checkout start tracking here
    // Example:
    // if (typeof window !== 'undefined' && window.s) {
    //   window.s.events = "scCheckout";
    //   window.s.products = items.map(item => 
    //     `${item.category || 'Unknown'};${item.name};${item.quantity};${item.price * item.quantity}`
    //   ).join(",");
    //   window.s.eVar9 = "checkout-initiated";
    //   window.s.t();
    // }

    // TODO: GA4 Checkout Initiation
    // Implement GA4 begin_checkout event here
    // Example:
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('event', 'begin_checkout', {
    //     currency: 'USD',
    //     value: totalPrice,
    //     items: items.map(item => ({
    //       item_id: item.id,
    //       item_name: item.name,
    //       item_category: item.category || 'Unknown',
    //       price: item.price,
    //       quantity: item.quantity
    //     }))
    //   });
    // }

    if (onNavigateToCheckout) {
      onNavigateToCheckout();
    } else {
      // Fallback navigation
      window.location.href = '/checkout';
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ 
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          color: '#333', 
          marginBottom: '2rem'
        }}>
          Your Shopping Cart
        </h1>
        
        <div style={{
          padding: '3rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#666', marginBottom: '1rem' }}>
            Your cart is empty
          </h2>
          <p style={{ color: '#888', marginBottom: '2rem' }}>
            Looks like you haven't added anything to your cart yet.
          </p>
          {onNavigateToProducts && (
            <button
              onClick={onNavigateToProducts}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              Continue Shopping
            </button>
          )}
        </div>

        <div style={{ 
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#666'
        }}>
          <strong>Module Federation Info:</strong>
          <br />
          • Cart App (port 3004)
          <br />
          • Exposes: Cart component and CartProvider context
          <br />
          • Analytics: Cart interactions and checkout initiation tracked
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        color: '#333', 
        marginBottom: '2rem'
      }}>
        Your Shopping Cart ({totalItems} items)
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem'
      }}>
        {/* Cart Items */}
        <div>
          {items.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1.5rem',
              marginBottom: '1rem',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  marginRight: '1rem'
                }}
              />
              
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0',
                  color: '#333'
                }}>
                  {item.name}
                </h3>
                <p style={{ 
                  color: '#666',
                  margin: '0',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}>
                  ${item.price}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px 0 0 4px',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ddd',
                    borderLeft: 'none',
                    borderRight: 'none',
                    minWidth: '40px',
                    textAlign: 'center'
                  }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0 4px 4px 0',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>

                <div style={{
                  minWidth: '80px',
                  textAlign: 'right',
                  fontWeight: 'bold',
                  color: '#2c5aa0'
                }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  title="Remove item"
                >
                  ×
                </button>
              </div>
            </div>
          ))}

          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            {onNavigateToProducts && (
              <button
                onClick={onNavigateToProducts}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Continue Shopping
              </button>
            )}
            
            <button
              onClick={clearCart}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          height: 'fit-content',
          position: 'sticky',
          top: '2rem'
        }}>
          <h2 style={{ 
            margin: '0 0 1.5rem 0',
            color: '#333'
          }}>
            Order Summary
          </h2>

          <div style={{
            marginBottom: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #ddd'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span>Items ({totalItems}):</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span>Tax:</span>
              <span>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: '#2c5aa0'
          }}>
            <span>Total:</span>
            <span>${(totalPrice * 1.08).toFixed(2)}</span>
          </div>

          <button
            onClick={handleProceedToCheckout}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '3rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#666',
        textAlign: 'center'
      }}>
        <strong>Module Federation Info:</strong>
        <br />
        • Cart App (port 3004)
        <br />
        • Exposes: Cart component and CartProvider context
        <br />
        • Analytics: Cart interactions and checkout initiation tracked
      </div>
    </div>
  );
};

export default Cart;