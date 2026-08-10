"use client";

import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { useWishlist } from "@/context/WishlistContext";

type Props = {
  product: Product;
};

export default function FavoriteButton({ product }: Props) {
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const favorite = isInWishlist(product._id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (favorite) {
          removeFromWishlist(product._id);
        } else {
          addToWishlist(product);
        }
      }}
      className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow transition hover:bg-white"
    >
      <Heart
        size={20}
        className={
          favorite
            ? "fill-[#8B1E1E] text-[#8B1E1E]"
            : "text-gray-700"
        }
      />
    </button>
  );
}