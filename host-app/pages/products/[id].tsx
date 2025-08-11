export default function Page ({ product }) {
    return <div>Hello World</div>
}

export async function getServerSideProps (ctx) {
    // need to get product data from ctx
    const res = fetch('http://localhost:3003/api/product')

    return {
        props: { 
            product: {

            }
        }
    }
}