import React from 'react';
import { useRouter } from 'next/router';
import ProductDetail from '../../components/ProductDetail';

export default function ProductDetailPage(props) {
  const router = useRouter();
  const { id } = router.query;
  
  return <ProductDetail productId={id} {...props} />;
}