import React, { useEffect, useState, lazy, Suspense  } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
  
export default function Home() {
        return (<div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h1 style={{ color: '#333', marginBottom: '1rem', fontSize: '2.5rem' }}>
                Welcome to Our Store! 🛍️
              </h1>
              <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.2rem', lineHeight: '1.6' }}>
                Experience our complete ecommerce flow built with Next.js Module Federation.
                Each component is a separate microfrontend with independent analytics tracking.
              </p>
              
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#333', marginBottom: '1rem' }}>📦 Product Catalog</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  Browse our wide selection of products with detailed information and reviews.
                </p>
                <small style={{ color: '#888' }}>Port 3002 - ProductList Microfrontend</small>
              </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>🔍 Product Details</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Get comprehensive product information with specifications and features.
            </p>
            <small style={{ color: '#888' }}>Port 3003 - ProductDetail Microfrontend</small>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>🛒 Shopping Cart</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Manage your items, adjust quantities, and proceed to checkout.
            </p>
            <small style={{ color: '#888' }}>Port 3004 - Cart Microfrontend</small>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>💳 Secure Checkout</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Complete your purchase with our secure and streamlined checkout process.
            </p>
            <small style={{ color: '#888' }}>Port 3005 - Checkout Microfrontend</small>
          </div>
        </div>

        <div style={{
          marginBottom: '2rem',
          padding: '2rem',
          backgroundColor: '#e9ecef',
          borderRadius: '8px'
        }}>
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>
            Original Demo Components
          </h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            These are the original Module Federation demo components from the base repository.
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#555', marginBottom: '1rem', fontSize: '1.2rem' }}>
              Host Component:
            </h3>
            <button
              onClick={() => {
                alert('Hello from Host App!');
              }}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                marginBottom: '2rem',
              }}
            >
              Click me (Host Component)
            </button>
          </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#555', marginBottom: '1rem', fontSize: '1.2rem' }}>
                  Remote Component (from remote-app):
                </h3>
              </div>
            </div>
          </div>
          </div>
        )
}