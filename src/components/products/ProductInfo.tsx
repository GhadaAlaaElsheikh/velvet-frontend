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
  const [selectedScent, setSelectedScent] = useState("Vanilla");
  const { addToCart } = useCart();

  const category = product.category?.trim().toLowerCase();

  const isBundleEligible =
    ["perfumes", "luxury perfumes"].includes(category || "") &&
    selectedSize.name.replace(/\s/g, "").toLowerCase() === "60ml" &&
    !product.isGiftBag;

  const isGiftBag = product.isGiftBag === true;
 
  const normalizedName = product.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const isRoze = normalizedName.includes("roze");
 const scentDescriptions: Record<string, string> = {
    Rose:
      "بخور فاخر يجمع بين عبق الورد الطائفي الأصيل ومزيج مختار من الزيوت العطرية الفاخرة، يضم المسك، والعود البوكيه، والعنبر، وزيت الورد، والياسمين. ليمنحك تجربة عطرية دافئة وأنيقة، تدوم طويلًا وتملأ المكان بأجواء من الفخامة والرقي.",

    Vanilla:
      "بخور فاخر يجمع بين عبق الورد الطائفي الأصيل ومزيج غني من الفانيلا والمسك والكراميل، ليمنحك رائحة دافئة وكريمية بلمسة حلوة وناعمة، تدوم طويلًا وتملأ المكان بأجواء من الرقي والدفء.",
  };

  const originalPrice = selectedSize.price;

  const finalPrice = isGiftBag
    ? 300
    : Number((originalPrice * 0.8).toFixed(2));

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedSize.name,
      selectedSize.price,
      quantity,
      isRoze ? selectedScent : undefined
    );

    toast.success(`${product.name} added to cart`, {
      description: `${selectedSize.name} • ${quantity} item(s)${
        isRoze ? ` • ${selectedScent}` : ""}`,
    });
  };

  return (
    <div>
      <h1 className="text-5xl font-bold text-[#8B1E1E]">
        {product.name}
      </h1>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-xl text-yellow-500">
          ★★★★★
        </span>
      </div>
 <p className="mt-8 leading-8 text-gray-600">
        {isRoze
          ? scentDescriptions[selectedScent]
          : product.description}
      </p>

      {/* Scent Selection - Rozé Only */}
      {isRoze && (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">
            Choose Your Scent
          </h3>

          <div className="flex flex-wrap gap-4">
            {["Vanilla", "Rose"].map((scent) => (
              <button
                key={scent}
                onClick={() => setSelectedScent(scent)}
                className={`rounded-md border px-8 py-3 transition ${
                  selectedScent === scent
                    ? "border-[#8B1E1E] bg-[#8B1E1E] text-white"
                    : "border-[#8B1E1E] text-[#8B1E1E] hover:bg-[#8B1E1E] hover:text-white"
                }`}
              >
                {scent}
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

        {isGiftBag ? (
          <div className="mt-2">
            <p className="text-4xl font-bold text-[#8B1E1E]">
              300 LE
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Special Gift Bag offer
            </p>
          </div>
        ) : (
          <div className="mt-2">
            <p className="text-lg text-gray-400 line-through">
              {originalPrice} LE
            </p>

            <p className="text-4xl font-bold text-[#8B1E1E]">
              {finalPrice} LE
            </p>

            <p className="mt-2 text-sm font-medium text-green-700">
              20% OFF
            </p>

            {isBundleEligible && (
              <p className="mt-3 rounded-md bg-[#F8F2EA] p-3 text-sm font-medium text-[#8B1E1E]">
                Buy 5 eligible 60ml perfumes for 1000 LE
                (200 LE each).
              </p>
            )}
          </div>
        )}
      </div>

      {/* Quantity */}
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
            onClick={() => setQuantity(quantity + 1)}
            className="px-5 py-3 text-xl hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Add To Cart */}
      <button
        onClick={handleAddToCart}
        className="mt-10 w-full rounded-md bg-[#8B1E1E] py-4 text-lg font-semibold text-white transition hover:opacity-90"
      >
        Add To Cart
      </button>
    </div>
  );
}