import React from 'react';
import ProductList from '../components/ProductList';

export default function Home({ products }) {
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    // Fetch products data on the server side
    const products = [
      { 
        id: 1, 
        name: 'Wireless Bluetooth Headphones', 
        price: 99.99,
        description: 'High-quality wireless headphones with noise cancellation',
        image: 'https://via.placeholder.com/300x300/4A90E2/FFFFFF?text=Headphones',
        category: 'Electronics',
        inStock: true,
        rating: 4.5,
        reviews: 127
      },
      { 
        id: 2, 
        name: 'Smart Watch Series 5', 
        price: 299.99,
        description: 'Advanced fitness tracking and smart notifications',
        image: 'https://via.placeholder.com/300x300/7ED321/FFFFFF?text=Smart+Watch',
        category: 'Electronics',
        inStock: true,
        rating: 4.8,
        reviews: 89
      },
      { 
        id: 3, 
        name: 'Premium Coffee Beans', 
        price: 24.99,
        description: 'Artisan roasted coffee beans from sustainable farms',
        image: 'https://via.placeholder.com/300x300/F5A623/FFFFFF?text=Coffee',
        category: 'Food & Beverages',
        inStock: true,
        rating: 4.2,
        reviews: 45
      },
      { 
        id: 4, 
        name: 'Ergonomic Office Chair', 
        price: 449.99,
        description: 'Comfortable office chair with lumbar support',
        image: 'https://via.placeholder.com/300x300/BD10E0/FFFFFF?text=Chair',
        category: 'Furniture',
        inStock: false,
        rating: 4.6,
        reviews: 203
      },
      { 
        id: 5, 
        name: 'Portable Power Bank', 
        price: 39.99,
        description: '20,000mAh high-capacity portable charger',
        image: 'https://via.placeholder.com/300x300/50E3C2/FFFFFF?text=Power+Bank',
        category: 'Electronics',
        inStock: true,
        rating: 4.3,
        reviews: 76
      },
      { 
        id: 6, 
        name: 'Yoga Mat Pro', 
        price: 59.99,
        description: 'Professional-grade non-slip yoga mat',
        image: 'https://via.placeholder.com/300x300/D0021B/FFFFFF?text=Yoga+Mat',
        category: 'Sports & Fitness',
        inStock: true,
        rating: 4.7,
        reviews: 156
      }
    ];

    return {
      props: {
        products,
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