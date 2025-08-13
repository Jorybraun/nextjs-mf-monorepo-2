import React from 'react';
import { CartProvider } from '../contexts/CartContext';
import Cart from '../components/Cart';

export default function Home({ cartItems, totalPrice }) {
  return (
    <CartProvider >
    <Cart />
    </CartProvider>
  );
}