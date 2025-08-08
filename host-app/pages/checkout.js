import React, { Suspense } from 'react';

const CheckoutPage = React.lazy(() => import('checkout/checkout'));

export default function Checkout() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutPage />
    </Suspense>
  );
}