
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/types/product";

export type GiftBagSelection = {
  product: Product;
  type: "bakhoor" | "candle" | "perfume";
  size: string;
  scent?: string;
};

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
  price: number;
  scent?: string;
  giftBagSelections?: GiftBagSelection[];
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (
    product: Product,
    size: string,
    price: number,
    quantity: number,
    scent?: string,
    giftBagSelections?: GiftBagSelection[]
  ) => void;

  removeFromCart: (index: number) => void;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    product: Product,
    size: string,
    price: number,
    quantity: number,
    scent?: string,
    giftBagSelections?: GiftBagSelection[]
  ) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.product._id === product._id &&
          item.size === size &&
          item.scent === scent &&
          JSON.stringify(item.giftBagSelections || []) ===
            JSON.stringify(giftBagSelections || [])
      );

      if (existingItem) {
        return prev.map((item) =>
          item.product._id === product._id &&
          item.size === size &&
          item.scent === scent &&
          JSON.stringify(item.giftBagSelections || []) ===
            JSON.stringify(giftBagSelections || [])
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          product,
          size,
          quantity,
          price,
          scent,
          giftBagSelections,
        },
      ];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const increaseQuantity = (index: number) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (index: number) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}