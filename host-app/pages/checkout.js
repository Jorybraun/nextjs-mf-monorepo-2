import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const RemoteCheckoutPage = dynamic(() => import('checkout/Checkout'), { ssr: true });

export default function Checkout({ totalPrice }) {
  return (
      <RemoteCheckoutPage totalPrice={totalPrice} />
  );
}