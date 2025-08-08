// module federation remote app
import React, { Suspense } from 'react';

const RemoteProductsPage = React.lazy(() => import('productList/products'));

const Products = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <RemoteProductsPage />
    </Suspense>
);

export default Products;
