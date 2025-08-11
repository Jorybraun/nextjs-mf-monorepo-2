export default function handler(req, res) {
  console.log('[API] /api/products called');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Enhanced mock product data for ecommerce demo
  const products = [
    { 
      id: 1, 
      name: 'Wireless Bluetooth Headphones', 
      price: 99.99,
      description: 'High-quality wireless headphones with noise cancellation',
      image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80',
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
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80', // Smart Watch
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
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // Coffee
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
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80', // Chair
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
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80', // Power Bank
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
      image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80', // Yoga Mat
      category: 'Sports & Fitness',
      inStock: true,
      rating: 4.7,
      reviews: 156
    }
  ];
  
  console.log('[API] Returning products:', products);
  res.status(200).json(products);
}