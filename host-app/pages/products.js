import React, { Suspense } from 'react';

const ProductsPage = React.lazy(() => import('productList/products'));

export default function Products() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
