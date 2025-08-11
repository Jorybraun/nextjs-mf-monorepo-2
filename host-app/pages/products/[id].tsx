import { GetServerSidePropsContext } from "next"
import dynamic from "next/dynamic";
import { useCartActions } from 'cart/CartProvider';

const ProductDetail = dynamic(() => import('productDetail/ProductDetail'), { ssr: true });

export default function Page ({ data }) {
    const { addItem } = useCartActions();
    // Todo analytics hook
    return <ProductDetail product={data} onAddToCart={addItem} />
}

export async function getServerSideProps (ctx: GetServerSidePropsContext ) {
    // need to get product data from ctx  
    try {
        const res = await fetch(`http://localhost:3003/api/products/${ctx.params.id}`)
        
        if (res.ok) {
            const data = await res.json();

            return {
                props: { 
                    data
                }
            }
        }
        return {
            props: { 
                data: {}
            }
        }
    } catch (err) {
        console.log(err)
        return {
            props: { data: {} }
        }
    }
}
