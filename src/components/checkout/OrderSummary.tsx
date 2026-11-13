
"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrderSummary() {
  const { cart } = useCart();
  const router = useRouter();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 40 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    router.push("/checkout");
  };

  return (
    <div>
      <h2 className="mb-8 text-3xl font-semibold text-[#8B1E1E]">
        Order Summary
      </h2>

      {cart.length === 0 ? (
        <div>
          <div className="mb-4 text-6xl">🛍</div>

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
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div
                key={`${item.product._id}-${item.size}-${item.scent || ""}-${index}`}
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

                  {item.scent && (
                    <p className="mt-1 text-sm font-medium text-[#8B1E1E]">
                      Scent: {item.scent}
                    </p>
                  )}

                  <p className="text-sm text-gray-500">
                    {item.size} × {item.quantity}
                  </p>
                </div>

                <span className="font-semibold">
                  {(item.price * item.quantity).toFixed(2)} LE
                </span>
              </div>
            ))}
          </div>

          <div className="my-8 border-t" />

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} LE</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping.toFixed(2)} LE</span>
            </div>
          </div>

          <div className="my-8 border-t" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-[#8B1E1E]">
              {total.toFixed(2)} LE
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="mt-8 w-full rounded-lg bg-[#8B1E1E] py-4 font-semibold text-white transition hover:bg-[#6f1717]"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
