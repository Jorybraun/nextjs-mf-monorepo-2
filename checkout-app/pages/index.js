import React from 'react';
import Checkout from '../components/Checkout';

export default function Home({ cartItems, totalPrice }) {
  const handleOrderComplete = (orderId) => {
    console.log('Order completed:', orderId);
  };

  const handleNavigateBack = () => {
    window.location.href = '/cart';
  };

  return (
    <div>
      <Checkout 
        cartItems={cartItems}
        totalPrice={totalPrice}
        onOrderComplete={handleOrderComplete}
        onNavigateBack={handleNavigateBack}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    // Fetch cart data for checkout on the server side
    // In a real app, this would get the current user's cart from database
    const cartItems = [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 99.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 2,
        name: 'Smart Watch Series 5',
        price: 299.99,
        quantity: 1,
        image: 'https://via.placeholder.com/300x300/7ED321/FFFFFF?text=Smart+Watch'
      }
    ];

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return {
      props: {
        cartItems,
        totalPrice,
      },
    };
  } catch (error) {
    console.error('Error fetching checkout data:', error);
    return {
      props: {
        cartItems: [],
        totalPrice: 0,
      },
    };
  }
}