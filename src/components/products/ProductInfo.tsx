"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Toast from "../ui/Toast";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
const [quantity, setQuantity] = useState(1);
const { addToCart } = useCart();
 const handleAddToCart = () => {
  addToCart(
    product,
    selectedSize.name,
    selectedSize.price,
    quantity
  );

  toast.success(`${product.name} added to cart`, {
    description: `${selectedSize.name} • ${quantity} item(s)`,
  });
};
  return (
    <div>
      <h1 className="text-5xl font-bold text-[#8B1E1E]">
        {product.name}
      </h1>

    <div className="mt-4 flex items-center gap-2">
  <span className="text-yellow-500 text-xl">
    ★★★★★
  </span>

   
</div>

      <p className="mt-8 leading-8 text-gray-600">
        {product.description}
      </p>

      {/* Sizes */}
      <div className="mt-10">
        <h3 className="mb-4 text-lg font-semibold">
          Size
        </h3>

        <div className="flex gap-4">
          {product.sizes.map((size) => (
            <button
              key={size.name}
              onClick={() => setSelectedSize(size)}
              className={`rounded-md border px-6 py-3 transition ${
                selectedSize.name === size.name
                  ? "bg-[#8B1E1E] text-white border-[#8B1E1E]"
                  : "border-[#8B1E1E] hover:bg-[#8B1E1E] hover:text-white"
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      {/* Price */}
<div className="mt-8">
  <h3 className="text-lg font-semibold text-gray-700">
    Price
  </h3>

  <p className="mt-2 text-4xl font-bold text-[#8B1E1E]">
    {selectedSize.price} LE
  </p>
</div>
      <div className="mt-10">
  <h3 className="mb-4 text-lg font-semibold">
    Quantity
  </h3>

  <div className="flex w-fit items-center rounded-md border border-gray-300">

    <button
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
      onClick={() =>
        setQuantity(quantity + 1)
      }
      className="px-5 py-3 text-xl hover:bg-gray-100"
    >
      +
    </button>

  </div>
</div>
<button
  onClick={handleAddToCart}
  className="mt-10 w-full rounded-md bg-[#8B1E1E] py-4 text-lg font-semibold text-white transition hover:opacity-90"
>
  Add To Cart
</button>
    </div>
  );
}