import React from 'react';

const Products = ({ products = [] }) => {
    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#333', marginBottom: '1rem' }}>Products</h1>
            <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.5' }}>
                This page lists products from the remote application.
            </p>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {products.map((product) => (
                    <li key={product.id} style={{ marginBottom: '1rem' }}>
                        {product.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps(context) {
    // Fetch data from the local API route
    try {
    const remoteBaseUrl = process.env.REMOTE_API_URL || 'http://localhost:3001';
    const url = `${remoteBaseUrl}/api/products`;
    console.log('[getServerSideProps] Fetching products from:', url);
    const res = await fetch(url);
    const products = await res.json();
    return {
        props: {
            products
        },
    };

    console.log('[getServerSideProps] Products fetched:', products);
    } catch (error) {
        console.error('Error fetching products:', error);
        const products = [];
        return {            
            props: {
                products,
            },
        };
    }

    
}

export default Products;


