import type { NextApiRequest, NextApiResponse } from "next";
// Product types
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  in_stock: boolean;
  rating: number;
  reviews: number;
}

// Cart types
export interface CartItem {
  id: number;
  session_id: string;
  product_id: number;
  quantity: number;
  created_at: string;
  product?: Product; // Optional populated product data
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// For creating new cart items
export interface CreateCartItemRequest {
  session_id: string;
  product_id: number;
  quantity: number;
}

export interface SessionApiRequest extends NextApiRequest {
  cookies: {
    cart_session_id?: string;
    [key: string]: string | undefined;
  };
}

export type SessionApiHandler<T = any> = (
  req: SessionApiRequest,
  res: NextApiResponse<T>
) => Promise<void> | void;

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Common prop types
export interface ProductCardProps {
  product: Product;
  onViewProduct?: (productId: number) => void;
}

export interface ProductListProps {
  products: Product[];
  onProductSelect?: (product: Product) => void;
}

export interface CartContextType {
  cart: Cart;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
  error: string | null;
}
