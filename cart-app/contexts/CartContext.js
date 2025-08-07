import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart context
const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      }
    }
    
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: []
      };
    
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload || []
      };
    
    default:
      return state;
  }
}

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('ecommerce-cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecommerce-cart', JSON.stringify(state.items));
    }
  }, [state.items]);

  // Calculate totals
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Actions
  const addItem = (item) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
    
    // Analytics: Track item added to cart
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Product Added', {
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
        currency: 'USD',
        value: item.price * item.quantity,
        app: 'cart-app',
        timestamp: new Date().toISOString(),
      });
      console.log('Analytics tracked: Product Added to Cart', item);
    }
  };

  const removeItem = (itemId) => {
    const item = state.items.find(item => item.id === itemId);
    
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
    
    // Analytics: Track item removed from cart
    if (typeof window !== 'undefined' && window.analytics && item) {
      window.analytics.track('Product Removed', {
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
        currency: 'USD',
        value: item.price * item.quantity,
        app: 'cart-app',
        timestamp: new Date().toISOString(),
      });
      console.log('Analytics tracked: Product Removed from Cart', item);
    }
  };

  const updateQuantity = (itemId, quantity) => {
    const item = state.items.find(item => item.id === itemId);
    const oldQuantity = item ? item.quantity : 0;
    
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: itemId, quantity } });
    
    // Analytics: Track quantity change
    if (typeof window !== 'undefined' && window.analytics && item) {
      window.analytics.track('Cart Updated', {
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        old_quantity: oldQuantity,
        new_quantity: quantity,
        quantity_change: quantity - oldQuantity,
        currency: 'USD',
        app: 'cart-app',
        timestamp: new Date().toISOString(),
      });
      console.log('Analytics tracked: Cart Updated', {
        product: item.name,
        oldQuantity,
        newQuantity: quantity
      });
    }
  };

  const clearCart = () => {
    // Analytics: Track cart cleared
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Cart Cleared', {
        items_count: state.items.length,
        total_value: totalPrice,
        currency: 'USD',
        app: 'cart-app',
        timestamp: new Date().toISOString(),
      });
      console.log('Analytics tracked: Cart Cleared');
    }
    
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const value = {
    items: state.items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;