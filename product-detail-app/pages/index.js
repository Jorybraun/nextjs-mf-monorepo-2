import React from 'react';
import { useRouter } from 'next/router';
import ProductDetail from '../components/ProductDetail';

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const handleNavigateBack = () => {
    router.push('/');
  };

  const handleAddToCart = (item) => {
    // This would normally be handled by a shared cart context
    console.log('Item added to cart:', item);
  };

  return (
    <div>
      <ProductDetail 
        productId={id} 
        onNavigateBack={handleNavigateBack}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}