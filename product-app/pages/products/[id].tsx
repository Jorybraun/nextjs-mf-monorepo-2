import ProductDetail from "@/components/ProductDetail";
import { GetServerSidePropsContext } from "next";

export default function ({ product }) {
    return <ProductDetail product={product} onAddToCart={() => {}} onNavigateBack={() => {}} />
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {
        const id = ctx.params.id;

        // Validate ID
        if (!id || Array.isArray(id) || isNaN(parseInt(id as string))) {
            return {
                redirect: {
                    destination: '/', // Redirect to home page
                    permanent: false, // Temporary redirect (307)
                },
            };
        }

        const res = await fetch('http://localhost:3002/api/products/' + id);

        if (!res.ok) {
            if (res.status === 404) {
                // Product not found - redirect to home
                return {
                    redirect: {
                        destination: '/?error=not-found',
                        permanent: false,
                    },
                };
            }

            if (res.status >= 500) {
                // Server error - redirect to home with error
                return {
                    redirect: {
                        destination: '/?error=server',
                        permanent: false,
                    },
                };
            }
        }

        const product = await res.json();

        return {
            props: {
                product,
            },
        };

    } catch (err) {
        console.error('Error fetching product:', err);
        
        // Network error - redirect to home
        return {
            redirect: {
                destination: '/?error=network',
                permanent: false,
            },
        };
    }
}