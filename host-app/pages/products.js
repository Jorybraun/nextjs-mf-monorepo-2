// module federation remote app
import React, { Suspense } from 'react';

const RemoteComponent = React.lazy(() => import('remote/products'));
const Products = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <RemoteComponent />
    </Suspense>
);
export default Products;
