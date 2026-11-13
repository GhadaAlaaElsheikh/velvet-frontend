
"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const availableScents = product.scents || [];

  const [selectedScent, setSelectedScent] = useState(
    availableScents[0]?.name || ""
  );

  const { addToCart } = useCart();

  const selectedScentData =
    availableScents.find((scent) => scent.name === selectedScent) ||
    availableScents[0];

  const displayedDescription =
    selectedScentData?.description || product.description;

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedSize.name,
      selectedSize.price,
      quantity,
      selectedScentData?.name
    );

    toast.success(`${product.name} added to cart`, {
      description: `${selectedSize.name} • ${quantity} item(s)${
        selectedScentData
          ? ` • ${selectedScentData.name}`
          : ""
      }`,
    });
  };

  return (
    <div>
      {/* Product Name */}
      <h1 className="text-5xl font-bold text-[#8B1E1E]">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xl text-yellow-500">
          ★★★★★
        </span>
      </div>

      {/* Product Description */}
      <p className="mt-8 leading-8 text-gray-600">
        {displayedDescription}
      </p>

      {/* Scent Selection */}
      {availableScents.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">
            Choose Your Scent
          </h3>

          <div className="flex flex-wrap gap-4">
            {availableScents.map((scent) => (
              <button
                key={scent.name}
                type="button"
                onClick={() => setSelectedScent(scent.name)}
                className={`rounded-md border px-8 py-3 transition ${
                  selectedScent === scent.name
                    ? "border-[#8B1E1E] bg-[#8B1E1E] text-white"
                    : "border-[#8B1E1E] text-[#8B1E1E] hover:bg-[#8B1E1E] hover:text-white"
                }`}
              >
                {scent.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      <div className="mt-10">
        <h3 className="mb-4 text-lg font-semibold">
          Size
        </h3>

        <div className="flex flex-wrap gap-4">
          {product.sizes.map((size) => (
            <button
              key={size.name}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`rounded-md border px-6 py-3 transition ${
                selectedSize.name === size.name
                  ? "border-[#8B1E1E] bg-[#8B1E1E] text-white"
                  : "border-[#8B1E1E] hover:bg-[#8B1E1E] hover:text-white"
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700">
          Price
        </h3>

        <p className="mt-2 text-4xl font-bold text-[#8B1E1E]">
          {selectedSize.price} LE
        </p>
      </div>

      {/* Quantity */}
      <div className="mt-10">
        <h3 className="mb-4 text-lg font-semibold">
          Quantity
        </h3>

        <div className="flex w-fit items-center rounded-md border border-gray-300">
          <button
            type="button"
            onClick={() =>
              quantity > 1 && setQuantity(quantity - 1)
            }
            className="px-5 py-3 text-xl hover:bg-gray-100"
          >
            −
          </button>

          <span className="border-x px-8 py-3">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-5 py-3 text-xl hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Add To Cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-10 w-full rounded-xl border-2 border-[#8B1E1E] bg-[#8B1E1E] py-4 text-lg font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#6F1717]"
      >
        Add To Cart
      </button>
    </div>
  );
}
