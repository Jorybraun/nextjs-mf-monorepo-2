import React, { useState, useEffect } from 'react';
import type { Product } from 'shared/types'

// TODO DEFINE PRODUCT INTERFACE
interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigateBack?: () => void;
}


const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onNavigateBack }) => {
  // const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  // const [selectedImage, setSelectedImage] = useState(0);

  // useEffect(() => {
  //   if (productId) {
  //     fetchProduct(productId);
  //   }
  // }, [productId]);

  // useEffect(() => {
  //   // Analytics: Track page view
  //   if (typeof window !== 'undefined' && window.analytics && product) {
  //     window.analytics.page('Product Detail', {
  //       title: `Product Detail - ${product.name}`,
  //       path: `/product/${product.id}`,
  //       product_id: product.id,
  //       product_name: product.name,
  //       product_category: product.category,
  //       product_price: product.price,
  //       app: 'product-detail-app',
  //     });
  //     console.log('Analytics tracked: Product Detail page view', product.name);
  //   }
  // }, [product]);


  const handleAddToCart = () => {

    // if (!product) return;

    // Analytics: Track add to cart
    // if (typeof window !== 'undefined' && window.analytics) {
    //   window.analytics.track('Product Added', {
    //     product_id: product.id,
    //     product_name: product.name,
    //     product_category: product.category,
    //     product_price: product.price,
    //     quantity: quantity,
    //     currency: 'USD',
    //     value: product.price * quantity,
    //     app: 'product-detail-app',
    //     timestamp: new Date().toISOString(),
    //   });
    //   console.log('Analytics tracked: Product Added to Cart', {
    //     product: product.name,
    //     quantity
    //   });
    // }

    // Call parent callback
    // if (onAddToCart) {
    //   onAddToCart({
    //     id: product.id,
    //     name: product.name,
    //     price: product.price,
    //     image: product.image,
    //     quantity: quantity
    //   });
    // }
    onAddToCart(product, quantity);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2>Product not found</h2>
        {onNavigateBack && (
          <button 
            onClick={onNavigateBack}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Back to Products
          </button>
        )}
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
      {onNavigateBack && (
        <button 
          onClick={onNavigateBack}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '2rem'
          }}
        >
          ← Back to Products
        </button>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Product Images */}
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 style={{ 
            color: '#333', 
            marginBottom: '1rem',
            fontSize: '2rem'
          }}>
            {product.name}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{
              fontSize: '0.9rem',
              color: '#666'
            }}>
              ⭐ {product.rating} ({product.reviews} reviews)
            </span>
            <span style={{
              marginLeft: '1rem',
              padding: '0.25rem 0.5rem',
              backgroundColor: product.inStock ? '#d4edda' : '#f8d7da',
              color: product.inStock ? '#155724' : '#721c24',
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p style={{ 
            color: '#666', 
            marginBottom: '1.5rem',
            lineHeight: '1.6',
            fontSize: '1.1rem'
          }}>
            {product.description}
          </p>

          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#2c5aa0',
            marginBottom: '2rem'
          }}>
            ${product.price}
          </div>

          {product.inStock && (
            <div style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold'
                }}>
                  Quantity:
                </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
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
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderLeft: 'none',
                    borderRight: 'none'
                  }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
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
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#218838';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#28a745';
                }}
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          )}

          {/* Features */}
          {product.features && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                marginBottom: '1rem',
                color: '#333'
              }}>
                Key Features
              </h3>
              <ul style={{
                paddingLeft: '1.5rem',
                lineHeight: '1.6'
              }}>
                {product.features.map((feature, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && (
            <div>
              <h3 style={{ 
                marginBottom: '1rem',
                color: '#333'
              }}>
                Specifications
              </h3>
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '1rem',
                borderRadius: '6px'
              }}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #dee2e6'
                  }}>
                    <strong>{key}:</strong>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
        • Product Detail App (port 3003)
        <br />
        • Exposes: ProductDetail component
        <br />
        • Analytics: Product views and cart additions tracked
      </div>
    </div>
  );
};

export default ProductDetail;