
"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

type Props = {
  products: Product[];
};

export default function GiftBagBuilder({ products }: Props) {
  const { addToCart } = useCart();
  const router = useRouter();

  const [bakhoorId, setBakhoorId] = useState("");
  const [bakhoorScent, setBakhoorScent] = useState("");
  const [candleId, setCandleId] = useState("");
  const [perfumeIds, setPerfumeIds] = useState(["", "", ""]);
  const [error, setError] = useState("");

  const hasSize = (product: Product, size: string) =>
    product.sizes?.some(
      (item) => item.name.trim().toLowerCase() === size.toLowerCase()
    );

  const bakhoorProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === "bakhoor" &&
      hasSize(product, "30 gm")
  );

  const candleProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === "candles" &&
      hasSize(product, "25 gm")
  );

  const perfumeProducts = products.filter(
    (product) =>
      ["perfumes", "luxury perfumes"].includes(
        product.category.toLowerCase()
      ) && hasSize(product, "10 ml")
  );

  const selectedBakhoor = bakhoorProducts.find(
    (product) => product._id === bakhoorId
  );

  const selectedCandle = candleProducts.find(
    (product) => product._id === candleId
  );

  const selectedPerfumes = perfumeIds.map((id) =>
    perfumeProducts.find((product) => product._id === id)
  );

  const selectedBakhoorScent = selectedBakhoor?.scents?.find(
    (scent) => scent.name === bakhoorScent
  );

  const handleAddToCart = () => {
    setError("");

    if (
      !selectedBakhoor ||
      !selectedBakhoorScent ||
      !selectedCandle ||
      selectedPerfumes.some((product) => !product)
    ) {
      setError("Please complete all five selections.");
      return;
    }

    const giftBag = products.find(
      (product) => product.name === "Velvet Gift Bag"
    );

    if (!giftBag) {
      setError("Gift Bag product was not found.");
      return;
    }

    addToCart(
      giftBag,
      "Gift Bag",
      300,
      1,
      undefined,
      [
        {
          product: selectedBakhoor,
          type: "bakhoor",
          size: "30 gm",
          scent: bakhoorScent,
        },
        {
          product: selectedCandle,
          type: "candle",
          size: "25 gm",
        },
        ...selectedPerfumes.map((product) => ({
          product: product!,
          type: "perfume" as const,
          size: "10 ml",
        })),
      ]
    );

    router.push("/cart");
  };

  return (
    <section className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-velvet-burgundy">
          Customize Your Gift Bag
        </h1>
        <p className="mt-3 text-gray-600">
          Choose your favorite scents and create your own Velvet Gift Bag.
        </p>
      </div>

      <div className="space-y-6 rounded-2xl bg-white p-6 shadow">
        <div>
          <h2 className="mb-3 text-xl font-semibold text-velvet-burgundy">
            1. Choose Your Bakhoor – 30 gm
          </h2>

          <select
            value={bakhoorId}
            onChange={(e) => {
              setBakhoorId(e.target.value);
              setBakhoorScent("");
            }}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Bakhoor</option>
            {bakhoorProducts.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>

          {selectedBakhoor && (
            <select
              value={bakhoorScent}
              onChange={(e) => setBakhoorScent(e.target.value)}
              className="mt-3 w-full rounded-lg border p-3"
            >
              <option value="">Select Bakhoor Scent</option>
              {selectedBakhoor.scents?.map((scent) => (
                <option key={scent.name} value={scent.name}>
                  {scent.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-velvet-burgundy">
            2. Choose Your Candle – 25 gm
          </h2>

          <select
            value={candleId}
            onChange={(e) => setCandleId(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Candle</option>
            {candleProducts.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-velvet-burgundy">
            3. Choose Your Three Perfumes – 10 ml Each
          </h2>

          {perfumeIds.map((id, index) => (
            <div key={index} className="mb-3">
              <label className="mb-2 block text-sm font-medium">
                Perfume {index + 1}
              </label>

              <select
                value={id}
                onChange={(e) => {
                  const updated = [...perfumeIds];
                  updated[index] = e.target.value;
                  setPerfumeIds(updated);
                }}
                className="w-full rounded-lg border p-3"
              >
                <option value="">Select Perfume</option>
                {perfumeProducts.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <div className="flex justify-between text-xl font-bold">
          <span>Gift Bag Total</span>
          <span className="text-velvet-burgundy">300 LE</span>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Includes 1 bakhoor, 1 candle, and 3 perfumes.
        </p>

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={
            !bakhoorId ||
            !bakhoorScent ||
            !candleId ||
            perfumeIds.some((id) => !id)
          }
          className="mt-6 w-full rounded-xl border-2 border-velvet-burgundy bg-velvet-cream py-4 font-bold text-velvet-burgundy shadow-md transition-all duration-300 hover:bg-velvet-burgundy hover:text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
           Add Gift Bag to Cart
        </button>
      </div>
    </section>
  );
}
