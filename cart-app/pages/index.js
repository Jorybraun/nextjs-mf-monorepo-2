import React from 'react';
import { CartProvider } from '../contexts/CartContext';
import Cart from '../components/Cart';

export default function Home({ cartItems, totalPrice }) {
  return (
    <CartProvider initialItems={cartItems}>
      <Cart />
    </CartProvider>
  );
}

export async function getServerSideProps(context) {
  try {
    // Fetch cart data on the server side (could be from a database or API)
    // For demo purposes, using mock data
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
    console.error('Error fetching cart data:', error);
    return {
      props: {
        cartItems: [],
        totalPrice: 0,
      },
    };
  }
}