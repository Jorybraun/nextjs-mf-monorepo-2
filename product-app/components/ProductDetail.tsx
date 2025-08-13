import React, { useState, useEffect } from 'react';
import type { Product } from '@/shared/types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigateBack?: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onNavigateBack }) => {
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {onNavigateBack && (
        <button
          onClick={onNavigateBack}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Back to Products
        </button>
      )}
      
      <div style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              borderRadius: '8px',
              objectFit: 'cover'
            }}
          />
        </div>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{
            fontSize: '2rem',
            color: '#333',
            marginBottom: '1rem'
          }}>
            {product.name}
          </h1>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '1rem'
          }}>
            {product.description}
          </p>
          
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#2c5aa0',
            marginBottom: '1rem'
          }}>
            ${product.price}
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
            gap: '1rem'
          }}>
            <span>⭐ {product.rating}</span>
            <span style={{ color: '#666' }}>({product.reviews} reviews)</span>
            <span style={{
              color: product.in_stock ? '#28a745' : '#dc3545',
              fontWeight: 'bold'
            }}>
              {product.in_stock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              style={{
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                width: '80px'
              }}
            />
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            style={{
              padding: '1rem 2rem',
              backgroundColor: product.in_stock ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1.1rem',
              cursor: product.in_stock ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s'
            }}
          >
            {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
