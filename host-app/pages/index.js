import React, { useEffect, useState, lazy, Suspense  } from 'react';
import dynamic from 'next/dynamic';

// Import remote components
const RemoteComponent = lazy(() => import('remote/button'))
const ProductList = lazy(() => import('productList/ProductList'));
const ProductDetail = lazy(() => import('productDetail/ProductDetail'));
const Cart = lazy(() => import('cart/Cart'));
const CartProvider = lazy(() => import('cart/CartProvider'));
const Checkout = lazy(() => import('checkout/Checkout'));

export default function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    // Track page view when component mounts
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.page('Ecommerce Home', {
        title: 'Ecommerce Microfrontend Demo',
        path: '/',
        app: 'host-app',
      });
      console.log('Analytics tracked: Ecommerce Home page view');
    }
  }, []);

  const handleNavigateToProducts = () => {
    setCurrentView('products');
  };

  const handleNavigateToProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
  };

  const handleNavigateToCart = () => {
    setCurrentView('cart');
  };

  const handleNavigateToCheckout = () => {
    setCurrentView('checkout');
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedProductId(null);
  };

  const renderNavigation = () => (
    <nav style={{
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #ddd',
      marginBottom: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ 
          margin: '0',
          color: '#333',
          fontSize: '1.5rem'
        }}>
          🛒 Ecommerce Demo
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={handleNavigateHome}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'home' ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Home
          </button>
          <button
            onClick={handleNavigateToProducts}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'products' ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Products
          </button>
          <button
            onClick={handleNavigateToCart}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'cart' ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cart
          </button>
        </div>
      </div>
    </nav>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'products':
        return (
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>}>
            <ProductList onNavigateToProduct={handleNavigateToProduct} />
          </Suspense>
        );
      
      case 'product-detail':
        return (
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading product details...</div>}>
            <ProductDetail 
              productId={selectedProductId}
              onNavigateBack={handleNavigateToProducts}
              onAddToCart={(item) => {
                console.log('Item added to cart:', item);
                // Handle add to cart - could integrate with cart context here
              }}
            />
          </Suspense>
        );
      
      case 'cart':
        return (
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading cart...</div>}>
            <CartProvider>
              <Cart 
                onNavigateToCheckout={handleNavigateToCheckout}
                onNavigateToProducts={handleNavigateToProducts}
              />
            </CartProvider>
          </Suspense>
        );
      
      case 'checkout':
        return (
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading checkout...</div>}>
            <Checkout 
              onNavigateBack={handleNavigateToCart}
              onOrderComplete={(orderId) => {
                console.log('Order completed:', orderId);
                setCurrentView('home');
              }}
            />
          </Suspense>
        );
      
      default:
        return (
          <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h1 style={{ color: '#333', marginBottom: '1rem', fontSize: '2.5rem' }}>
                Welcome to Our Store! 🛍️
              </h1>
              <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.2rem', lineHeight: '1.6' }}>
                Experience our complete ecommerce flow built with Next.js Module Federation.
                Each component is a separate microfrontend with independent analytics tracking.
              </p>
              
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '3rem'
              }}>
                <button
                  onClick={handleNavigateToProducts}
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Start Shopping
                </button>
                <button
                  onClick={handleNavigateToCart}
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    cursor: 'pointer'
                  }}
                >
                  View Cart
                </button>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#333', marginBottom: '1rem' }}>📦 Product Catalog</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  Browse our wide selection of products with detailed information and reviews.
                </p>
                <small style={{ color: '#888' }}>Port 3002 - ProductList Microfrontend</small>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#333', marginBottom: '1rem' }}>🔍 Product Details</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  Get comprehensive product information with specifications and features.
                </p>
                <small style={{ color: '#888' }}>Port 3003 - ProductDetail Microfrontend</small>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#333', marginBottom: '1rem' }}>🛒 Shopping Cart</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  Manage your items, adjust quantities, and proceed to checkout.
                </p>
                <small style={{ color: '#888' }}>Port 3004 - Cart Microfrontend</small>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#333', marginBottom: '1rem' }}>💳 Secure Checkout</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  Complete your purchase with our secure and streamlined checkout process.
                </p>
                <small style={{ color: '#888' }}>Port 3005 - Checkout Microfrontend</small>
              </div>
            </div>

            <div style={{
              marginBottom: '2rem',
              padding: '2rem',
              backgroundColor: '#e9ecef',
              borderRadius: '8px'
            }}>
              <h2 style={{ color: '#333', marginBottom: '1rem' }}>
                Original Demo Components
              </h2>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                These are the original Module Federation demo components from the base repository.
              </p>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#555', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  Host Component:
                </h3>
                <button
                  onClick={() => {
                    // Track analytics event for host button
                    if (typeof window !== 'undefined' && window.analytics) {
                      window.analytics.track('Host Button Clicked', {
                        component: 'HostButton',
                        location: 'host-app',
                        timestamp: new Date().toISOString(),
                      });
                      console.log('Analytics tracked: Host Button Clicked');
                    }
                    
                    alert('Hello from Host App!');
                  }}
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    marginBottom: '2rem',
                  }}
                >
                  Click me (Host Component)
                </button>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#555', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  Remote Component (from remote-app):
                </h3>
                <Suspense fallback={'loading remote button'}>
                  <RemoteComponent />
                </Suspense>
              </div>
            </div>

            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '6px',
              fontSize: '14px',
              color: '#666',
            }}>
              <strong>Module Federation Architecture:</strong>
              <br />
              • Host App (port 3000) - Main orchestrator and router
              <br />
              • Product List App (port 3002) - Product catalog and browsing
              <br />
              • Product Detail App (port 3003) - Detailed product information
              <br />
              • Cart App (port 3004) - Shopping cart management
              <br />
              • Checkout App (port 3005) - Order completion
              <br />
              • Remote App (port 3001) - Original demo component
              <br />
              <br />
              <strong>Analytics Integration:</strong>
              <br />
              Each microfrontend includes Segment analytics tracking for page views, interactions, and ecommerce events.
              Open browser console to see analytics events in real-time.
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      {renderNavigation()}
      {renderContent()}
    </div>
  );
}