
"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Order = {
  _id: string;
  status: string;
  totalPrice: number;
  items: {
    quantity: number;
    price: number;
  }[];
};

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const getOrder = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/orders/${orderId}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await res.json();

        console.log("ORDER SUCCESS DATA:", data);

        setOrder(data);
      } catch (error) {
        console.error("ORDER SUCCESS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [orderId]);

  return (
    <main className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">

        <CheckCircle2
          size={90}
          className="mx-auto text-green-600"
        />

        <h1 className="mt-8 text-4xl font-bold text-[#8B1E1E]">
          Order Confirmed!
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Your order has been placed successfully.
        </p>

        <p className="mt-3 text-gray-500">
          Thank you for shopping with Velvet.
        </p>

        {loading && (
          <p className="mt-8 text-gray-500">
            Loading order details...
          </p>
        )}

        {!loading && order && (
          <div className="mt-8 rounded-2xl bg-[#F8F2EA] p-6 text-left">

            <h2 className="mb-5 text-xl font-bold text-[#8B1E1E]">
              Order Details
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Order ID
                </p>

                <p className="mt-1 break-all font-semibold">
                  #{order._id}
                </p>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Status
                </span>

                <span className="font-semibold text-[#8B1E1E]">
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Items
                </span>

                <span className="font-semibold">
                  {order.items.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Total
                </span>

                <span className="text-xl font-bold text-[#8B1E1E]">
                  {order.totalPrice} LE
                </span>
              </div>

            </div>
          </div>
        )}

        {!loading && !order && (
          <div className="mt-8 rounded-xl bg-red-50 p-5">
            <p className="text-red-600">
              Could not load order details.
            </p>
          </div>
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
        <main className="min-h-screen bg-white px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-gray-500">
              Loading...
            </p>
          </div>
        </main>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}

