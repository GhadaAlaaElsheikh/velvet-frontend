"use client";

import Link from "next/link";
import Image from "next/image";

import { Product } from "@/types/product";
import FavoriteButton from "../buttons/FavoriteButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const {
    _id,
    name,
    images,
    price,
    rating,
    badge,
  } = product;
console.log("PRODUCT CARD:", product);
console.log("PRODUCT ID:", _id);
  // Get the first product image safely
  const image =
    Array.isArray(images) && typeof images[0] === "string"
      ? images[0]
      : null;

  return (
    <Link
      href={`/products/${_id}`}
      className="group block overflow-hidden rounded-lg bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Product Image */}
      <div className="relative h-[420px] overflow-hidden">
        {badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-[#8B1E1E] px-3 py-1 text-sm font-medium text-white">
            {badge}
          </span>
        )}

        <FavoriteButton product={product} />

        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-xl font-semibold text-[#8B1E1E]">
            {name}
          </h3>
        </div>

        <p className="mt-2 text-lg font-medium">
          {price} LE
        </p>

        <div className="mt-5 w-full rounded-md bg-[#8B1E1E] py-3 text-center font-medium text-white transition group-hover:bg-[#6F1515]">
          View Details
        </div>
      </div>
    </Link>
  );
}