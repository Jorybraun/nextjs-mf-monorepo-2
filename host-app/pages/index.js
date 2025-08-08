import React, { lazy, Suspense } from 'react';
import Link from 'next/link';

// Import remote components
const RemoteComponent = lazy(() => import('remote/button'))

export default function Home() {
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
          <Link href="/" style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Home
          </Link>
          <Link href="/products" style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Products
          </Link>
          <Link href="/cart" style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      {renderNavigation()}
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ color: '#333', marginBottom: '1rem', fontSize: '2.5rem' }}>
            Welcome to Our Store! 🛍️
          </h1>
          <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Experience our complete ecommerce flow built with Next.js Module Federation.
            Each component is a separate microfrontend.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}>
            <Link href="/products" style={{
              padding: '1rem 2rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              Start Shopping
            </Link>
            <Link href="/cart" style={{
              padding: '1rem 2rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              View Cart
            </Link>
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
          <strong>API Configuration:</strong>
          <br />
          Configure API endpoints using environment variables for each service.
          Ensure CORS is properly configured on each backend service.
        </div>
      </div>
    </div>
  );
}