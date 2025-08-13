import Link from "next/link";
import { useCartState } from 'cart/CartProvider';

export const HeaderWithCartState = () => {
  const { totalItems } = useCartState()
  return <Header itemCount={totalItems}></Header>
}

export const Header = ({ itemCount = 0 }) => {
    return ( <nav style={{
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #ddd',
          marginBottom: '2rem'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{ 
              margin: '0',
              color: '#333',
              fontSize: '1.5rem'
            }}>
              🛒 Ecommerce Demo
            </h1>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {/* <button
                onClick={handleNavigateHome}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: currentView === 'home' ? '#007bff' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Home
              </button> */}
              <Link
                href="/products"
                
                // onClick={handleNavigateToProducts}
                style={{
                  padding: '0.5rem 1rem',
                  // backgroundColor: currentView === 'products' ? '#007bff' : '#6c757d',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Products
              </Link>
              {/* TODO ADD ITEMS IN CART COUNT */}
              <Link
                href="/cart"
                style={{
                  padding: '0.5rem 1rem',
                  // backgroundColor: currentView === 'cart' ? '#007bff' : '#6c757d',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cart { itemCount }
              </Link>
            </div>
          </div>
        </nav>
      );
}