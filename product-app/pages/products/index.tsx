import ProductList from "@/components/ProductList";

export default function Page ({ products }) {
  return <ProductList products={products} />;
};

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3002/api/products');
  const products = await response.json();
  
  return {
    props: { products }
  };
}