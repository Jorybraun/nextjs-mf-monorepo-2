import React from 'react';
import Cart from '../components/Cart';
import { CartProvider } from '../contexts/CartContext';

export default function CartPage(props) {
  return (
    <CartProvider>
      <Cart {...props} />
    </CartProvider>
  );
}