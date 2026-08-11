"use client";

import BackButton from "@/components/ui/BackButton";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";
type Order = {
  _id: string;
  totalPrice: number;
  status: string;
  createdAt: string;

  user: {
    _id: string;
    name: string;
    email: string;
  };

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

const statuses = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [newOrdersCount, setNewOrdersCount] = useState(0);

  // =========================
  // GET ORDERS
  // =========================

  useEffect(() => {
  const getOrders = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("No access token");
        return;
      }

      const res = await fetch(
        `${API_URL}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: Order[] = await res.json();

      if (!res.ok) {
        console.error("ADMIN ORDERS ERROR:", data);
        return;
      }

      console.log("ADMIN ORDERS RESPONSE:", data);

      setOrders(data);

      // أول مرة الصفحة تفتح:
      // اعتبري كل الأوردرات الحالية Seen
      if (data.length > 0) {
        localStorage.setItem(
          "lastSeenOrderDate",
          data[0].createdAt
        );
      }

      // الرقم يبدأ من صفر لأن الأدمن شاف الصفحة
      setNewOrdersCount(0);

    } catch (error) {
      console.error("ADMIN ORDERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  getOrders();

  // فحص الأوردرات الجديدة كل 30 ثانية
  const interval = setInterval(async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) return;

      const res = await fetch(
        `${API_URL}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const data: Order[] = await res.json();

      if (data.length === 0) return;

      const lastSeen = localStorage.getItem(
        "lastSeenOrderDate"
      );

      if (!lastSeen) return;

      const newOrders = data.filter(
        (order) =>
          new Date(order.createdAt).getTime() >
          new Date(lastSeen).getTime()
      );

      console.log("LATEST ORDER:", data[0].createdAt);
      console.log("LAST SEEN:", lastSeen);
      console.log("🔔 NEW ORDERS:", newOrders.length);

      if (newOrders.length > 0) {
        setNewOrdersCount(newOrders.length);
      }

    } catch (error) {
      console.error(
        "NOTIFICATION ERROR:",
        error
      );
    }
  }, 30000);

  return () => clearInterval(interval);
}, []);

  // =========================
  // UPDATE ORDER STATUS
  // =========================

  const handleStatusChange = async (
    orderId: string,
    status: string,
  ) => {
    try {
      setUpdatingId(orderId);

      const token =
        localStorage.getItem(
          "accessToken",
        );

      const res = await fetch(
        `${API_URL}/orders/${orderId}/${status}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(
          "STATUS UPDATE ERROR:",
          data,
        );

        alert(
          data.message ||
            "Failed to update status",
        );

        return;
      }

      console.log(
        "STATUS UPDATED:",
        data,
      );

      setOrders(
        (currentOrders) =>
          currentOrders.map(
            (order) =>
              order._id === orderId
                ? {
                    ...order,
                    status: data.status,
                  }
                : order,
          ),
      );
    } catch (error) {
      console.error(
        "STATUS UPDATE ERROR:",
        error,
      );

      alert(
        "Something went wrong",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F2EA] p-10">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-xl text-gray-500">
            Loading orders...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
<main className="min-h-screen bg-[#F8F2EA] px-6 pb-12 ">
      <div className="mx-auto max-w-7xl">

    {/* HEADER */} 
    <div className="mb-10 flex items-center justify-between">
      <BackButton/>
       <h1 className="text-4xl font-bold text-[#8B1E1E] md:text-5xl">
         Orders </h1>

          {/* NOTIFICATION */}
          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setNewOrdersCount(0);

                if (orders.length > 0) {
                  localStorage.setItem(
                    "lastSeenOrderDate",
                    orders[0].createdAt,
                  );
                }
              }}
              className="relative rounded-full bg-white p-3 shadow transition hover:bg-[#F8F2EA]"
            >
              <Bell
                size={25}
                className="text-[#8B1E1E]"
              />

              {newOrdersCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#8B1E1E] text-xs font-bold text-white">
                  {newOrdersCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* NO ORDERS */}

        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <p className="text-xl text-gray-500">
              No orders found.
            </p>
          </div>
        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="rounded-2xl bg-white p-6 shadow"
              >

                {/* ORDER HEADER */}

                <div className="flex flex-col gap-5 border-b pb-5 lg:flex-row lg:items-center lg:justify-between">

                  {/* ORDER ID */}

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="break-all font-semibold">
                      #{order._id}
                    </p>
                  </div>

                  {/* CUSTOMER */}

                  <div>
                    <p className="text-sm text-gray-500">
                      Customer
                    </p>

                    <p className="font-semibold text-[#8B1E1E]">
                      {order.user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.user?.email}
                    </p>
                  </div>

                  {/* DATE */}

                  <div>
                    <p className="text-sm text-gray-500">
                      Date
                    </p>

                    <p className="font-semibold">
                      {new Date(
                        order.createdAt,
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  {/* TOTAL */}

                  <div>
                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="text-xl font-bold text-[#8B1E1E]">
                      {order.totalPrice} LE
                    </p>
                  </div>

                  {/* STATUS */}

                  <div>
                    <p className="mb-2 text-sm text-gray-500">
                      Status
                    </p>

                    <select
                      value={order.status}
                      disabled={
                        updatingId ===
                        order._id
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value,
                        )
                      }
                      className="rounded-lg border border-gray-300 bg-[#F8F2EA] px-4 py-2 font-semibold text-[#8B1E1E] outline-none focus:border-[#8B1E1E]"
                    >

                      {statuses.map(
                        (status) => (
                          <option
                            key={
                              status.value
                            }
                            value={
                              status.value
                            }
                          >
                            {status.label}
                          </option>
                        ),
                      )}

                    </select>

                    {updatingId ===
                      order._id && (
                      <p className="mt-2 text-xs text-gray-500">
                        Updating...
                      </p>
                    )}
                  </div>

                </div>

                {/* PRODUCTS */}

                <div className="mt-6">

                  <h2 className="mb-4 text-xl font-semibold text-[#8B1E1E]">
                    Products
                  </h2>

                  <div className="space-y-4">

                    {order.items.map(
                      (item, index) => (

                        <div
                          key={index}
                          className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                        >

                          {/* IMAGE */}

                          {item.product
                            ?.images?.[0] && (
                            <img
                              src={
                                item
                                  .product
                                  .images[0]
                              }
                              alt={
                                item
                                  .product
                                  .name
                              }
                              className="h-20 w-20 rounded-lg object-cover"
                            />
                          )}

                          {/* PRODUCT INFO */}

                          <div className="flex-1">

                            <h3 className="font-semibold">
                              {
                                item
                                  .product
                                  ?.name
                              }
                            </h3>

                            <p className="text-sm text-gray-500">
                              Quantity:{" "}
                              {
                                item.quantity
                              }
                            </p>

                            <p className="text-sm text-gray-500">
                              Price:{" "}
                              {item.price}{" "}
                              LE
                            </p>

                          </div>

                          {/* ITEM TOTAL */}

                          <p className="font-semibold">
                            {item.price *
                              item.quantity}{" "}
                            LE
                          </p>

                        </div>

                      ),
                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </main>
  );
}