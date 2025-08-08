import React, { Suspense } from 'react';

const RemoteCheckoutPage = React.lazy(() => import('checkout/checkoutPage'));

export default function Checkout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RemoteCheckoutPage />
    </Suspense>
  );
}