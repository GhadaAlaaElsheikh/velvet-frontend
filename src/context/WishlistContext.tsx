"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { Product } from "@/types/product";

type WishlistContextType = {
  wishlist: Product[];

  addToWishlist: (product: Product) => void;

  removeFromWishlist: (id: string) => void;

  isInWishlist: (id: string) => boolean;
};

const WishlistContext =
  createContext<WishlistContextType | null>(null);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some(
        (item) => item._id === product._id
      );

      if (exists) {
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  const isInWishlist = (id: string) => {
    return wishlist.some(
      (item) => item._id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}