
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (index: number) => {
    const item = cart[index];

    removeFromCart(index);

    toast.error(`${item.product.name} removed from cart`, {
      description: item.size,
    });
  };

  return (
    <main className="min-h-screen bg-velvet-cream px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-10 text-3xl font-semibold text-velvet-dark md:text-4xl">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="py-20 text-center">
            <p className="mb-6 text-xl text-gray-600">
              Your cart is empty.
            </p>

            <Link
              href="/shop"
              className="inline-block rounded-md bg-[#8B1E1E] px-8 py-4 text-white transition hover:bg-[#6F1515]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
            {/* Cart Items */}
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={`${item.product._id}-${item.size}`}
                  className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                >
                  {/* Product Image */}
                  <Image
                    src={
                      item.product.images?.[0] ||
                      "/images/placeholder.png"
                    }
                    alt={item.product.name}
                    width={120}
                    height={120}
                    className="h-[120px] w-[120px] rounded-lg object-cover"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[#8B1E1E]">
                      {item.product.name}
                    </h2>

                    <p className="mt-2 text-gray-600">
                      Size: {item.size}
                    </p>

                    <p className="mt-2 font-medium">
                      {item.price} LE
                    </p>

                    {/* Quantity */}
                    <div className="mt-4 flex w-fit items-center overflow-hidden rounded-md border">
                      <button
                        onClick={() => decreaseQuantity(index)}
                        className="px-4 py-2 text-xl transition hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="border-x px-6 py-2">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(index)}
                        className="px-4 py-2 text-xl transition hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex flex-row items-center justify-between gap-5 sm:flex-col sm:items-end">
                    <p className="text-2xl font-bold text-[#8B1E1E]">
                      {item.price * item.quantity} LE
                    </p>

                    <button
                      onClick={() => handleRemove(index)}
                      className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="h-fit rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-semibold text-velvet-dark">
                Order Summary
              </h2>

              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-semibold">
                  {total} LE
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-semibold">
                  Total
                </span>

                <span className="text-2xl font-bold text-[#8B1E1E]">
                  {total} LE
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-md bg-[#8B1E1E] py-4 text-center font-medium text-white transition hover:bg-[#6F1515]"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="mt-3 block w-full rounded-md border border-[#8B1E1E] py-4 text-center font-medium text-[#8B1E1E] transition hover:bg-[#8B1E1E] hover:text-white"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

