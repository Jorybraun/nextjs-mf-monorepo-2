import React, { createContext, useContext, useReducer, useEffect } from "react";

import type { Product, CartItem } from "@/shared/types";

// Define types
interface CartState {
  items: CartItem[];
}

interface CartAction {
  type: string;
  payload?: any;
}

// Actions
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  LOAD_CART: "LOAD_CART",
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(
        (item) => item.product_id === action.payload.item.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product_id === action.payload.item.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, {
            id: Date.now(), // temporary ID
            session_id: '', // will be set by backend
            product_id: action.payload.item.id,
            quantity: action.payload.quantity,
            created_at: new Date().toISOString(),
            product: action.payload.item
          }],
        };
      }
    }
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload || [],
      };
    default:
      return state;
  }
}

// Contexts
const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | undefined>(undefined);

// Helper function to get or create session ID
const getSessionId = () => {
  if (typeof window === 'undefined') return null;
  
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('cart_session_id', sessionId);
    console.log('Generated new session ID:', sessionId);
  } else {
    console.log('Using existing session ID:', sessionId);
  }
  return sessionId;
};

const fetchItems = async (cb) => {
  try {
    const sessionId = getSessionId();
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (sessionId) {
      headers['X-Session-ID'] = sessionId;
    }

    const res = await fetch("http://localhost:3004/api/cart", {
      headers
    });

    if (!res.ok) {
      throw new Error("Error fetching cart items");
    }

    // Check if server returned a new session ID
    const serverSessionId = res.headers.get('X-Session-ID');
    if (serverSessionId && typeof window !== 'undefined') {
      localStorage.setItem('cart_session_id', serverSessionId);
    }

    const data = await res.json();
    console.log(data);
    return cb(data);
  } catch (err) {
    console.error("Error fetching cart items");
    throw err;
  }
};

const persistItemToCart = async (body) => {
  try {
    const sessionId = getSessionId();
    console.log('Adding to cart with session ID:', sessionId, 'body:', body);
    
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (sessionId) {
      headers['X-Session-ID'] = sessionId;
    }

    console.log('Making request to cart API with headers:', headers);

    const res = await fetch("http://localhost:3004/api/cart", {
      method: "POST",
      body: JSON.stringify(body),
      headers
    });

    console.log('Cart API response status:', res.status);

    if (!res.ok) {
      throw new Error("Error adding item to cart");
    }

    // Check if server returned a new session ID
    const serverSessionId = res.headers.get('X-Session-ID');
    if (serverSessionId && typeof window !== 'undefined') {
      localStorage.setItem('cart_session_id', serverSessionId);
      console.log('Updated session ID from server:', serverSessionId);
    }

    if (res.status === 200) {
      const data = await res.json();
      console.log('Cart API response data:', data);
      return data;
    }
  } catch (err) {
    console.error("Item Not Added To Cart:", err);
    throw err;
  }
};

const removeItem = async (id) => {
  try {
    const sessionId = getSessionId();
    const headers = {};
    
    if (sessionId) {
      headers['X-Session-ID'] = sessionId;
    }

    const res = await fetch(`http://localhost:3004/api/cart/${id}`, {
      method: "DELETE",
      headers
    });

    if (!res.ok) {
      throw new Error("Error removing cart item");
    }
  } catch (err) {}
};

// Provider
export const CartProvider = ({ children, initialItems = [] }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: initialItems });

  useEffect(() => {
    // const savedCart = localStorage.getItem('ecommerce-cart');
    try {
      // const parsedCart = JSON.parse(savedCart);
      console.log(fetchItems);
      fetchItems((items) => {
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: items });
      });
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

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
  if (!state)
    throw new Error("useCartState must be used within a CartProvider");
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  return { ...state, totalItems, totalPrice };
};

// Custom hook for actions/handlers
export const useCartActions = () => {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch)
    throw new Error("useCartActions must be used within a CartProvider");

  const addItem = async (item: Product, quantity = 1) => {
    try {
      const data = await persistItemToCart({ product_id: item.id, quantity });
      if (data) {
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { item, quantity } });
      }
    } catch (err) {
      // dispatch error
    }
  };

  const removeItem = (itemId: number) =>
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });

  const updateQuantity = (itemId: number, quantity: number) =>
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: itemId, quantity },
    });
  const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR_CART });

  return { addItem, removeItem, updateQuantity, clearCart };
};
