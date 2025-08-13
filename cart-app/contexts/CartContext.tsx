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
  CLEAR_CART: "CLEAR_CART",
  LOAD_CART: "LOAD_CART",
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload || [],
      };
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
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

const updateItemQuantity = async (productId, quantity) => {
  try {
    const sessionId = getSessionId();
    console.log(`Updating quantity for product ${productId} to ${quantity}`);
    
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (sessionId) {
      headers['X-Session-ID'] = sessionId;
    }

    const res = await fetch(`http://localhost:3004/api/cart/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
      headers
    });

    if (!res.ok) {
      throw new Error("Error updating item quantity");
    }
    
    console.log(`Successfully updated quantity for product ${productId}`);
  } catch (err) {
    console.error("Error updating quantity:", err);
    throw err;
  }
};

const removeItemFromCart = async (productId) => {
  try {
    const sessionId = getSessionId();
    console.log(`Removing product ${productId} from cart`);
    
    const headers = {};
    
    if (sessionId) {
      headers['X-Session-ID'] = sessionId;
    }

    const res = await fetch(`http://localhost:3004/api/cart/${productId}`, {
      method: "DELETE",
      headers
    });

    if (!res.ok) {
      throw new Error("Error removing cart item");
    }
    
    console.log(`Successfully removed product ${productId} from cart`);
  } catch (err) {
    console.error("Error removing item:", err);
    throw err;
  }
};

const clearCartOnServer = async () => {
  try {
    const sessionId = getSessionId();
    console.log('Clearing entire cart');
    
    const headers = {};
    
    if (sessionId) {
      headers['X-Session-ID'] = sessionId;
    }

    const res = await fetch("http://localhost:3004/api/cart", {
      method: "DELETE",
      headers
    });

    if (!res.ok) {
      throw new Error("Error clearing cart");
    }
    
    console.log('Successfully cleared cart');
  } catch (err) {
    console.error("Error clearing cart:", err);
    throw err;
  }
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
    (sum, item) => sum + (item.price || item.product?.price || 0) * item.quantity,
    0
  );
  return { ...state, totalItems, totalPrice };
};

// Custom hook for actions/handlers
export const useCartActions = () => {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch)
    throw new Error("useCartActions must be used within a CartProvider");

  const loadCart = async () => {
    try {
      const data = await fetchItems((items) => items);
      dispatch({ type: CART_ACTIONS.LOAD_CART, payload: data });
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  const addItem = async (item: Product, quantity = 1) => {
    try {
      // Include the price from the product data
      await persistItemToCart({ 
        product_id: item.id, 
        quantity,
        price: item.price 
      });
      // After successful add, reload cart from server
      await loadCart();
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const removeItem = async (productId: number) => {
    try {
      await removeItemFromCart(productId);
      // After successful removal, reload cart from server
      await loadCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      await updateItemQuantity(productId, quantity);
      // After successful update, reload cart from server
      await loadCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartOnServer();
      // After successful clear, set local state to empty
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  return { addItem, removeItem, updateQuantity, clearCart };
};
