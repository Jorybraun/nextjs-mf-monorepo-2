// Use the same product data as product-list-app for consistency
export default function handler(req, res) {
  const { id } = req.query;
  console.log('[API] /api/products/[id] called with id:', id);
  
  // Enhanced mock product data
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
      reviews: 127,
      features: [
        'Active Noise Cancellation',
        '30-hour battery life',
        'Bluetooth 5.0 connectivity',
        'Comfortable over-ear design',
        'Built-in microphone'
      ],
      specifications: {
        'Driver Size': '40mm',
        'Frequency Response': '20Hz - 20kHz',
        'Impedance': '32 Ohm',
        'Weight': '250g',
        'Wireless Range': '10m'
      }
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
      reviews: 89,
      features: [
        'Heart rate monitoring',
        'GPS tracking',
        'Water resistant to 50m',
        'Always-on display',
        'Sleep tracking'
      ],
      specifications: {
        'Display': '1.4" AMOLED',
        'Battery Life': '7 days',
        'Water Rating': '5ATM',
        'Connectivity': 'Bluetooth, WiFi',
        'OS': 'WearOS 3.0'
      }
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
      reviews: 45,
      features: [
        'Single origin beans',
        'Medium roast profile',
        'Ethically sourced',
        'Fresh roasted weekly',
        'Whole bean format'
      ],
      specifications: {
        'Origin': 'Colombia',
        'Roast Level': 'Medium',
        'Weight': '1 lb (454g)',
        'Process': 'Washed',
        'Altitude': '1,200-1,800m'
      }
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
      reviews: 203,
      features: [
        'Adjustable lumbar support',
        'Memory foam cushioning',
        '360-degree swivel',
        'Height adjustable',
        'Breathable mesh back'
      ],
      specifications: {
        'Seat Height': '18-22 inches',
        'Weight Capacity': '300 lbs',
        'Materials': 'Mesh, Aluminum',
        'Warranty': '5 years',
        'Assembly': 'Required'
      }
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
      reviews: 76,
      features: [
        '20,000mAh capacity',
        'Fast charging support',
        'Multiple device charging',
        'LED power indicator',
        'Compact design'
      ],
      specifications: {
        'Capacity': '20,000mAh',
        'Input': 'USB-C, Micro-USB',
        'Output': '2x USB-A, 1x USB-C',
        'Weight': '400g',
        'Dimensions': '6.3 x 3.1 x 0.9 inches'
      }
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
      reviews: 156,
      features: [
        'Non-slip surface',
        'Extra thick cushioning',
        'Eco-friendly materials',
        'Lightweight and portable',
        'Easy to clean'
      ],
      specifications: {
        'Thickness': '6mm',
        'Dimensions': '72" x 24"',
        'Material': 'TPE',
        'Weight': '2.5 lbs',
        'Care': 'Machine washable'
      }
    }
  ];
  
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  console.log('[API] Returning product:', product);
  res.status(200).json(product);
}