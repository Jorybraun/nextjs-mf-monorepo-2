import React from 'react';
import ProductList from '../components/ProductList';

export const fetchData = async (url) => {
  const PRODUCT_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
  const res = await fetch(`${PRODUCT_API_URL}/api/products`);
  const products = await res.json();
  return products;
}

export default function Products({ products }) {  
  return <ProductList products={products} />
}

export async function getServerSideProps(context) {
  try {

  const products = await fetchData();

  console.log('getInitialProps:', products);

  return {
    props: { products }, // will be passed to the page component as props
  };
  } catch(err) {
    console.log(err);
  }
}
//   return {
//     props: { products }, // will be passed to the page component as props
//   };
// }