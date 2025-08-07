import React, { useEffect } from 'react';

const ProductCard = ({ product, onViewProduct }) => {
  const handleViewProduct = () => {
    // Analytics: Track product view
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Product Viewed', {
        product_id: product.id,
        product_name: product.name,
        product_category: product.category,
        product_price: product.price,
        currency: 'USD',
        app: 'product-list-app',
        timestamp: new Date().toISOString(),
      });
      console.log('Analytics tracked: Product Viewed', product.name);
    }
    
    onViewProduct(product);
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem',
      width: '300px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    onClick={handleViewProduct}
    >
      <img 
        src={product.image} 
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '0.5rem'
        }}
      />
      <h3 style={{ 
        margin: '0.5rem 0', 
        fontSize: '1.1rem',
        color: '#333'
      }}>
        {product.name}
      </h3>
      <p style={{ 
        color: '#666', 
        fontSize: '0.9rem',
        margin: '0.5rem 0',
        lineHeight: '1.4'
      }}>
        {product.description}
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem'
      }}>
        <span style={{ 
          fontSize: '1.2rem', 
          fontWeight: 'bold',
          color: '#2c5aa0'
        }}>
          ${product.price}
        </span>
        <span style={{
          fontSize: '0.8rem',
          color: product.inStock ? '#28a745' : '#dc3545'
        }}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.5rem',
        fontSize: '0.8rem',
        color: '#666'
      }}>
        <span>⭐ {product.rating}</span>
        <span style={{ marginLeft: '0.5rem' }}>({product.reviews} reviews)</span>
      </div>
    </div>
  );
};

export default ProductCard;