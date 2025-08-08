import React, { Suspense } from 'react';

const ProductDetailPage = React.lazy(() => import('productDetail/product'));

export default function ProductDetail() {
  return (
    <Suspense fallback={<div>Loading product details...</div>}>
      <ProductDetailPage />
    </Suspense>
  );
}