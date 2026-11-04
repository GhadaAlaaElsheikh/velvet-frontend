
"use client";

import Link from "next/link";
import Image from "next/image";

import { Product } from "@/types/product";
import FavoriteButton from "../buttons/FavoriteButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const {
    _id,
    name,
    images,
    price,
    badge,
    isGiftBag,
  } = product;

  const isGiftBagProduct =
    isGiftBag === true ||
    name?.trim().toLowerCase() === "velvet gift bag";

  const productHref = isGiftBagProduct
    ? "/gift-bag"
    : `/products/${_id}`;

  const image =
    Array.isArray(images) && typeof images[0] === "string"
      ? images[0]
      : null;

  const displayPrice = isGiftBagProduct ? 300 : price;

  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}
      <div className="relative h-[420px] overflow-hidden">

        {!isGiftBagProduct && badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-[#8B1E1E] px-3 py-1 text-sm font-medium text-white">
            {badge}
          </span>
        )}

        <Link href={productHref} className="block h-full w-full">
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
        </Link>

        <FavoriteButton product={product} />
      </div>

      {/* Product Info */}
      <div className="p-5">

        <h3 className="mb-2 text-xl font-semibold text-[#8B1E1E]">
          <Link href={productHref}>
            {name}
          </Link>
        </h3>

        <p className="mt-2 text-lg font-medium">
          {displayPrice} LE
        </p>

        {isGiftBagProduct ? (
          <Link
            href="/gift-bag"
            className="mt-5 inline-flex rounded-md border-2 border-[#8B1E1E] bg-[#F8F2EA] px-6 py-3 text-left font-semibold text-[#8B1E1E] transition hover:bg-[#8B1E1E] hover:text-white"
          >
            Customize Your Gift Bag
          </Link>
        ) : (
          <Link
            href={productHref}
            className="mt-5 block w-full rounded-md bg-[#8B1E1E] py-3 text-center font-medium text-white transition hover:bg-[#6F1515]"
          >
            View Details
          </Link>
        )}

      </div>
    </div>
  );
}
