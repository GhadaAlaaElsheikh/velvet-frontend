"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrderSummary() {
  const { cart } = useCart();
  const router = useRouter();

  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 35 : 0;
  const total = subtotal + shipping;

  const handleContinuePayment = () => {
    setError("");

    // Cart check
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Get checkout information
    const checkoutData = localStorage.getItem("checkoutData");

    if (!checkoutData) {
      setError("Please complete your information first.");
      return;
    }

    try {
      const data = JSON.parse(checkoutData);

      // Check if any field is empty
      const isEmpty = Object.values(data).some(
        (value) => !String(value).trim()
      );

      if (isEmpty) {
        setError("Please fill in all fields.");
        return;
      }

      // Everything is valid
      router.push("/payment");
    } catch {
      setError("Please complete your information first.");
    }
  };

  return (
    <div>
      <h2 className="mb-8 text-3xl font-semibold text-[#8B1E1E]">
        Order Summary
      </h2>

      {cart.length === 0 ? (
        <div>
          <div className="mb-4 text-6xl">
            🛍
          </div>

          <h3 className="text-xl font-semibold text-[#8B1E1E]">
            Your cart is empty
          </h3>

          <p className="mt-3 text-gray-500">
            Browse our luxury fragrances and discover
            your next signature scent.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block rounded-lg bg-[#8B1E1E] px-8 py-4 text-white transition hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Products */}
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4"
              >
                <Image
                  src={
                    item.product.images?.[0] ||
                    "/images/placeholder.png"
                  }
                  alt={item.product.name}
                  width={70}
                  height={70}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-[#8B1E1E]">
                    {item.product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.size} × {item.quantity}
                  </p>
                </div>

                <span className="font-semibold">
                  {item.price * item.quantity} LE
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-8 border-t" />

          {/* Prices */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal} LE</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping} LE</span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t" />

          {/* Total */}
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>

            <span className="text-[#8B1E1E]">
              {total} LE
            </span>
          </div>

          {/* Error */}
          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Continue to Payment */}
          <button
            type="button"
            onClick={handleContinuePayment}
            className="mt-8 w-full rounded-lg bg-[#8B1E1E] py-4 font-semibold text-white transition hover:bg-[#6f1717]"
          >
            Continue to Payment
          </button>
        </>
      )}
    </div>
  );
}