import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ProductList = dynamic(() => import('product/ProductList'), { ssr: true });
  
export default function Page({ products }) {
    return <ProductList products={products} />;
}

export async function getServerSideProps(context) {
  try {    
    const res = await fetch('http://localhost:3002/api/products');
    
    if (res.ok) {
        const products = await res.json();
        const result = { props: { products } };
        return result;
    }   
  } catch (error) {
    console.error('Error fetching products:', error);
    return { props: { products: [] } };
  }
}
