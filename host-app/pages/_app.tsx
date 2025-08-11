import dynamic from "next/dynamic"
import { Header } from "../components/Header"
// Shared Module needs .then
const CartProvider = dynamic(() => import('cart/CartProvider').then(mod => mod.CartProvider), { ssr: true })

const App = ({ Component, pageProps  }: { Component: any, pageProps: any
}) => {
    return <>
        <CartProvider>
            <Header></Header>
            <Component {...pageProps} />
        </CartProvider>
    </>
}
export default App;