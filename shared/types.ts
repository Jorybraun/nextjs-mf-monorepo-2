export interface Product {
  id: number | string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  features?: string[];
  specifications?: { [key: string]: string };
}