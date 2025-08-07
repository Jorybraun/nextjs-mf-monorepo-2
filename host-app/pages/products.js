import React from 'react';
import ProductList from '../components/ProductList';

const Products = ({ products = [] }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
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
              onClick={() => window.location.href = '/'}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Home
            </button>
            <button
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Products
            </button>
          </div>
        </div>
      </nav>
      <ProductList products={products} />
    </div>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from the local API route
  try {
    const hostBaseUrl = process.env.HOST_API_URL || 'http://localhost:3000';
    const url = `${hostBaseUrl}/api/products`;
    console.log('[getServerSideProps] Fetching products from:', url);
    
    const res = await fetch(url);
    const products = await res.json();
    
    console.log('[getServerSideProps] Products fetched:', products);
    
    return {
      props: {
        products
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {            
      props: {
        products: [],
      },
    };
  }
}

export default Products;
