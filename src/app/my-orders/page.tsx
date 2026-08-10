
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "@/components/ui/BackButton";
 
type Order = {
  _id: string;
  totalPrice: number;
  status: string;
  createdAt: string;

  items: {
    product: {
      name: string;
      images: string[];
    };
    quantity: number;
    price: number;
  }[];
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          console.error("No access token found");
          setLoading(false);
          return;
        }

        const res = await fetch(
          "http://localhost:3001/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.text();

          console.error(
            "Orders API Error:",
            res.status,
            errorData
          );

          return;
        }

        const data = await res.json();

        console.log("MY ORDERS:", data);

        setOrders(data);
      } catch (error) {
        console.error("MY ORDERS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    // أول تحميل
    getOrders();

    // تحديث الأوردرات كل 5 ثواني
    const interval = setInterval(() => {
      getOrders();
    }, 5000);

    // تنظيف الـ interval
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F2EA] px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xl text-gray-500">
            Loading your orders...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F2EA] px-6  py-12">
      <div className="mx-auto max-w-6xl">

      <div className="mb-12 flex items-center gap-4">
  <BackButton />

  <h1 className="text-5xl font-bold text-[#8B1E1E]">
    My Orders
  </h1>
</div>

        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow">

            <div className="mb-6 text-6xl">
              🛍
            </div>

            <h2 className="text-2xl font-semibold text-[#8B1E1E]">
              You have no orders yet
            </h2>

            <p className="mt-3 text-gray-500">
              Start shopping and discover your favorite Velvet fragrance.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block rounded-lg bg-[#8B1E1E] px-8 py-4 font-semibold text-white"
            >
              Start Shopping
            </Link>

          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl bg-white p-6 shadow"
              >

                {/* Order Information */}
                <div className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="mt-1 break-all font-semibold">
                      #{order._id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Date
                    </p>

                    <p className="mt-1 font-semibold">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Status
                    </p>

                    <span className="mt-1 inline-block rounded-full bg-[#F8F2EA] px-4 py-2 font-semibold capitalize text-[#8B1E1E]">
                      {order.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#8B1E1E]">
                      {order.totalPrice} LE
                    </p>
                  </div>

                </div>

                {/* Products */}
                <div className="mt-5 space-y-4">

                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >

                      {item.product?.images?.[0] && (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                      )}

                      <div className="flex-1">

                        <h3 className="font-semibold text-[#8B1E1E]">
                          {item.product?.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                      </div>

                      <p className="font-semibold">
                        {item.price * item.quantity} LE
                      </p>

                    </div>
                  ))}

                </div>

                {/* View Details */}
                <Link
                  href={`/my-orders/${order._id}`}
                  className="mt-6 inline-block rounded-lg border border-[#8B1E1E] px-6 py-3 font-semibold text-[#8B1E1E] transition hover:bg-[#8B1E1E] hover:text-white"
                >
                  View Order Details
                </Link>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

