import React, { Suspense } from 'react';

const RemoteCartPage = React.lazy(() => import('cart/cartPage'));

export default function Cart() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RemoteCartPage />
    </Suspense>
  );
}