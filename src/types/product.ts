export interface Product {
  _id: string;
  id?: string;

  name: string;
  price: number;
  rating: number;
    
  images: string[];
  detailsImage?: string;
shippingPrice?: number;
  category: string;

  gender?: "women" | "men" | "unisex";

  burnType?: string;

  badge?: string;

  reviews?: number;

  description: string;

  stock?: number;

  sizes: {
    name: string;
    price: number;
  }[];
}