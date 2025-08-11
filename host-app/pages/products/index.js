// module federation remote app
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// ✅ Import the component that's actually exposed
const ProductList = dynamic(() => import('productList/ProductList'), { 
    ssr: true,
  });
  

export default function Page({ products }) {
    return <ProductList products={products} />;
}

export async function getServerSideProps(context) {
  try {

    console.log('getServerSideProps running...');
    
    const res = await fetch('http://localhost:3002/api/products');
    console.log('API response status:', res.status);
    

    if (res.ok) {
        const products = await res.json();
        console.log('PPOOOOO', products)
        const result = { props: { products } };
        console.log('FINAL RETURN:', result);
        
        return result;
    }


    console.log('Nothing found');
   
  } catch (error) {
    console.error('Error fetching products:', error);
    return { props: { products: [] } };
  }
}
