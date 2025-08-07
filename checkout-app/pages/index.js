import React from 'react';
import Checkout from '../components/Checkout';

// Mock cart data for demo
const mockCartItems = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    quantity: 1,
    image: 'https://via.placeholder.com/300x300/4A90E2/FFFFFF?text=Headphones'
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    price: 299.99,
    quantity: 1,
    image: 'https://via.placeholder.com/300x300/7ED321/FFFFFF?text=Smart+Watch'
  }
];

const mockTotalPrice = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

export default function Home() {
  const handleOrderComplete = (orderId) => {
    console.log('Order completed:', orderId);
  };

  const handleNavigateBack = () => {
    window.location.href = '/cart';
  };

  return (
    <div>
      <Checkout 
        cartItems={mockCartItems}
        totalPrice={mockTotalPrice}
        onOrderComplete={handleOrderComplete}
        onNavigateBack={handleNavigateBack}
      />
    </div>
  );
}