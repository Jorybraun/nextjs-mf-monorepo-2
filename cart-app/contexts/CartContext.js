import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Reducer
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

// Contexts
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Provider
export const CartProvider = ({ children, initialItems = [] }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: initialItems });

  useEffect(() => {
    if (typeof window !== 'undefined' && initialItems.length === 0) {
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecommerce-cart', JSON.stringify(state.items));
    }
  }, [state.items]);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

// Custom hook for state and derived values
export const useCartState = () => {
  const state = useContext(CartStateContext);
  if (!state) throw new Error('useCartState must be used within a CartProvider');
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { ...state, totalItems, totalPrice };
};

// Custom hook for actions/handlers
export const useCartActions = () => {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch) throw new Error('useCartActions must be used within a CartProvider');

  const addItem = (item) => dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
  const removeItem = (itemId) => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
  const updateQuantity = (itemId, quantity) =>
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: itemId, quantity } });
  const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR_CART });

  return { addItem, removeItem, updateQuantity, clearCart };
};