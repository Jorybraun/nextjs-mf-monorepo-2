import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ onNavigateToProduct, products = [] }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Analytics: Track page view
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.page('Product List', {
        title: 'Product List Page',
        path: '/products',
        app: 'product-list-app',
      });
      console.log('Analytics tracked: Product List page view');
    }
  }, []);

  const handleViewProduct = (product) => {
    // Navigate to product detail page
    if (onNavigateToProduct) {
      onNavigateToProduct(product.id);
    } else {
      // Fallback: use window location or router
      window.location.href = `/product/${product.id}`;
    }
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    if (filter === 'inStock') return product.inStock;
    return product.category === filter;
  });

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        color: '#dc3545'
      }}>
        <h2>Error loading products</h2>
        <p>{error}</p>
        <button onClick={fetchProducts} style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        color: '#333', 
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        Product Catalog
      </h1>
      
      <div style={{
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <label style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
          Filter by:
        </label>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '1rem'
          }}
        >
          <option value="all">All Products</option>
          <option value="inStock">In Stock Only</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onViewProduct={handleViewProduct}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          color: '#666',
          marginTop: '2rem'
        }}>
          <p>No products found for the selected filter.</p>
        </div>
      )}

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
        • Product List App (port 3002)
        <br />
        • Exposes: ProductList and ProductCard components
        <br />
        • Analytics: Product views and page loads tracked
      </div>
    </div>
  );
};

export default ProductList;