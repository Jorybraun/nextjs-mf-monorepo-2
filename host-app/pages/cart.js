import React, { Suspense } from 'react';

const CartPage = React.lazy(() => import('cart/cart'));

export default function Cart() {
  return (
    <Suspense fallback={<div>Loading cart...</div>}>
      <CartPage />
    </Suspense>
  );
}