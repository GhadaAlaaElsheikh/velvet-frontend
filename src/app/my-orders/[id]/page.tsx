"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Order = {
  _id: string;
  totalPrice: number;
    shippingPrice: number;
 
  status: string;
  createdAt: string;
  items: {
    quantity: number;
    price: number;
    product: {
      _id: string;
      name: string;
      images: string[];
    };
  }[];
};

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const getOrder = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          console.error("No access token found");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `http://localhost:3001/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.text();

          console.error(
            "ORDER API ERROR:",
            res.status,
            errorData
          );

          throw new Error("Failed to fetch order");
        }

        const data = await res.json();

        console.log("ORDER DETAILS:", data);

        setOrder(data);
      } catch (error) {
        console.error("ORDER DETAILS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F2EA] px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xl text-[#8B1E1E]">
            Loading order...
          </p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#F8F2EA] px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold text-[#8B1E1E]">
            Order not found
          </h1>

          <Link
            href="/my-orders"
            className="mt-8 inline-block rounded-lg bg-[#8B1E1E] px-8 py-4 text-white"
          >
            Back to My Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F2EA] px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/my-orders"
          className="text-sm font-medium text-[#8B1E1E] hover:underline"
        >
          ← Back to My Orders
        </Link>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-4xl font-bold text-[#8B1E1E] md:text-5xl">
            Order Details
          </h1>

          <span className="w-fit rounded-full bg-white px-5 py-3 font-semibold text-[#8B1E1E] shadow">
            {order.status}
          </span>
        </div>

        {/* Order Information */}
        <div className="mt-10 rounded-2xl bg-white p-6 shadow">
          <div className="grid gap-6 md:grid-cols-3">

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
                Order Date
              </p>

              <p className="mt-1 font-semibold">
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>
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
        </div>

        {/* Products */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow">

          <h2 className="mb-6 text-2xl font-bold text-[#8B1E1E]">
            Products
          </h2>

          <div className="space-y-6">

            {order.items.map((item, index) => (
              <div
                key={`${item.product?._id}-${index}`}
                className="flex flex-col gap-4 border-b pb-6 last:border-b-0 last:pb-0 sm:flex-row sm:items-center"
              >

                {item.product?.images?.[0] ? (
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={100}
                    height={100}
                    className="h-24 w-24 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[#F8F2EA] text-xs text-gray-500">
                    No image
                  </div>
                )}

                <div className="flex-1">

                  <h3 className="text-lg font-semibold text-[#8B1E1E]">
                    {item.product?.name}
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-1 text-gray-500">
                    Price: {item.price} LE
                  </p>

                </div>

                <p className="font-bold">
                  {item.price * item.quantity} LE
                </p>

              </div>
            ))}

          </div>
        </div>

        {/* Total */}
      <div className="mt-8 rounded-2xl bg-white p-6 shadow">
  <div className="space-y-4">

    <div className="flex justify-between text-lg">
      <span className="text-gray-500">
        Subtotal
      </span>

      <span>
        {order.totalPrice - order.shippingPrice} LE
      </span>
    </div>

    <div className="flex justify-between text-lg">
      <span className="text-gray-500">
        Shipping
      </span>

      <span>
        {order.shippingPrice} LE
      </span>
    </div>

    <div className="border-t pt-4">
      <div className="flex justify-between text-xl font-bold">
        <span>
          Total
        </span>

        <span className="text-[#8B1E1E]">
          {order.totalPrice} LE
        </span>
      </div>
    </div>

  </div>
</div>

      </div>
    </main>
  );
}