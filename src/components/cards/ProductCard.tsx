
"use client";

import { useState } from "react";
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
    isGiftBag,
  } = product;

  const [showGiftBag, setShowGiftBag] = useState(false);

  const image =
    Array.isArray(images) && typeof images[0] === "string"
      ? images[0]
      : null;

  const displayPrice = isGiftBag ? 300 : price;

  return (
    <>
      <div className="group overflow-hidden rounded-lg bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
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
            {displayPrice} LE
          </p>

          {isGiftBag ? (
            <div className="mt-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setShowGiftBag(true)}
                className="w-full rounded-md border border-[#8B1E1E] py-3 text-center font-medium text-[#8B1E1E] transition hover:bg-[#F8F2EA]"
              >
                View What's Inside
              </button>

              <Link
                href={`/products/${_id}`}
                className="w-full rounded-md bg-[#8B1E1E] py-3 text-center font-medium text-white transition hover:bg-[#6F1515]"
              >
                View Details
              </Link>
            </div>
          ) : (
            <Link
              href={`/products/${_id}`}
              className="mt-5 block w-full rounded-md bg-[#8B1E1E] py-3 text-center font-medium text-white transition hover:bg-[#6F1515]"
            >
              View Details
            </Link>
          )}
        </div>
      </div>

      {/* Gift Bag Modal */}
      {showGiftBag && isGiftBag && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowGiftBag(false)}
        >
          <div
            className="relative w-full max-w-md rounded-xl bg-[#F8F2EA] p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowGiftBag(false)}
              className="absolute right-4 top-3 text-2xl text-[#2B1B18] hover:text-[#8B1E1E]"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="mb-2 text-center text-2xl font-semibold text-[#8B1E1E]">
              Velvet Gift Bag
            </h2>

            <p className="mb-5 text-center text-lg font-bold text-[#2B1B18]">
              300 LE
            </p>

            <div className="space-y-4 text-[#2B1B18]">
              <div className="rounded-lg bg-white p-4">
                <h3 className="font-semibold text-[#8B1E1E]">
                  1. Bakhoor
                </h3>
                <p className="mt-1 text-sm">
                  One 30g bakhoor of your choice.
                </p>
              </div>

              <div className="rounded-lg bg-white p-4">
                <h3 className="font-semibold text-[#8B1E1E]">
                  2. Candle
                </h3>
                <p className="mt-1 text-sm">
                  One 25g candle of your choice.
                </p>
              </div>

              <div className="rounded-lg bg-white p-4">
                <h3 className="font-semibold text-[#8B1E1E]">
                  3. Perfumes
                </h3>
                <p className="mt-1 text-sm">
                  Three 10ml perfumes of your choice.
                </p>
              </div>
            </div>

            <p className="mt-5 text-center text-sm text-[#8B1E1E]">
              Choose your favorite scents and create your own Gift Bag!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
