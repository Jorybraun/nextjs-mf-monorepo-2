import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';

const ProductList: React.FC<{ products: any[] }> = ({ products = [] }) => {
  // const [products, setProducts] = useState(data);
  // const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  // useEffect(() => {
  //   const getProducts = async () => {
  //     setLoading(true);
  //     const productData = await fetchData()
  //     setProducts(productData);
  //     setLoading(false);
  //   }

  //   if (!data || data.length === 0) {
  //     getProducts();
  //   } 
  // }, []);

  // const handleViewProduct = (product) => {
  //   // Navigate to product detail page
  //   if (onNavigateToProduct) {
  //     onNavigateToProduct(product.id);
  //   } else {
  //     // Fallback: use window location or router
  //     window.location.href = `/product/${product.id}`;
  //   }
  // };

  // const filteredProducts = products.filter(product => {
  //   if (filter === 'all') return true;
  //   if (filter === 'inStock') return product.inStock;
  //   return product.category === filter;
  // });

  const categories = [...new Set(products.map(p => p.category))];

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
        {products.map(product => (
          <Link as={`/products/${product.id}`} href={`/products/${product.id}`} key={product.id}>
              <ProductCard 
                product={product} 
                // onViewProduct={handleViewProduct}
              />
          </Link>
        ))}
      </div>
     </div>
  );
};

export default ProductList;