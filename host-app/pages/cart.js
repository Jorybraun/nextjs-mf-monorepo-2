import dynamic from 'next/dynamic';

const RemoteCartPage = dynamic(() => import('cart/Cart'), { ssr: true });

export default function Cart() {
  return (
    <RemoteCartPage />
  );
}
