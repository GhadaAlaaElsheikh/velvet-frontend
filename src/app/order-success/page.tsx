
"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">

        {orderId ? (
          <>
            <CheckCircle2
              size={90}
              className="mx-auto text-green-600"
            />

            <h1 className="mt-8 text-4xl font-bold text-[#8B1E1E]">
              Order Placed Successfully!
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Your order has been received successfully.
            </p>

            <p className="mt-3 text-gray-500">
              Thank you for shopping with Velvet ❤️
            </p>

            <div className="mt-8 rounded-2xl bg-[#F8F2EA] p-6">
              <p className="text-sm text-gray-500">
                Your Order Number
              </p>

              <p className="mt-2 break-all font-semibold text-[#8B1E1E]">
                #{orderId}
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="mt-8 text-3xl font-bold text-[#8B1E1E]">
              No Order Found
            </h1>

            <p className="mt-4 text-gray-600">
              We couldn't find your order information.
            </p>
          </>
        )}

        <Link
          href="/shop"
          className="mt-10 inline-block rounded-lg bg-[#8B1E1E] px-10 py-4 font-semibold text-white transition hover:opacity-90"
        >
          Continue Shopping
        </Link>

      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white px-6 py-20 text-center">
          Loading...
        </main>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
