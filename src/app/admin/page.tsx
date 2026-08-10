
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Package,
  ShoppingBag,
  DollarSign,
  Clock,
  ArrowRight,
} from "lucide-react";

type Order = {
  _id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
};

type Product = {
  _id: string;
};

type Contact = {
  _id: string;
  name: string;
  message: string;
  status: "new" | "read";
  createdAt: string;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          console.error("No access token");
          return;
        }

        // =========================
        // GET ORDERS
        // =========================

        const ordersRes = await fetch(
          "http://localhost:3001/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!ordersRes.ok) {
          const errorData = await ordersRes.json();

          console.error("ORDERS API ERROR:", {
            status: ordersRes.status,
            data: errorData,
          });

          throw new Error(
            errorData.message ||
              "Failed to fetch orders",
          );
        }

        const ordersData: Order[] =
          await ordersRes.json();

        // =========================
        // GET PRODUCTS
        // =========================

        const productsRes = await fetch(
          "http://localhost:3001/products",
        );

        if (!productsRes.ok) {
          throw new Error(
            "Failed to fetch products",
          );
        }

        const productsResponse =
          await productsRes.json();

        const productsData: Product[] =
          productsResponse.products ??
          productsResponse;

        // =========================
        // GET CONTACT MESSAGES
        // =========================

        const contactsRes = await fetch(
          "http://localhost:3001/contacts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!contactsRes.ok) {
          const errorData =
            await contactsRes.json();

          console.error(
            "CONTACTS API ERROR:",
            errorData,
          );

          throw new Error(
            errorData.message ||
              "Failed to fetch contact messages",
          );
        }

        const contactsData: Contact[] =
          await contactsRes.json();

        setOrders(ordersData);
        setProducts(productsData);
        setContacts(contactsData);
      } catch (error) {
        console.error(
          "DASHBOARD ERROR:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  // =========================
  // CALCULATIONS
  // =========================

  const totalOrders = orders.length;

  const totalProducts = products.length;

  const totalRevenue = orders
    .filter(
      (order) => order.status !== "cancelled",
    )
    .reduce(
      (total, order) =>
        total + Number(order.totalPrice || 0),
      0,
    );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  // آخر 5 رسائل
  const recentContacts = [...contacts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F2EA] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // DASHBOARD
  // =========================

  return (
    <main className="min-h-screen bg-[#F8F2EA] px-6 pb-12 ">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#D8B46A]">
            Velvet Admin
          </p>

          <h1 className="text-4xl font-bold text-[#8B1E1E] md:text-5xl">
            Dashboard
          </h1>

          <p className="mt-3 text-gray-500">
            Welcome back. Here is your store overview.
          </p>
        </div>

        {/* STATS */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* ORDERS */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-xl bg-[#F8F2EA] p-3">
                <ShoppingBag
                  size={24}
                  className="text-[#8B1E1E]"
                />
              </div>

              <span className="text-sm text-gray-400">
                Orders
              </span>
            </div>

            <p className="text-3xl font-bold text-[#2B1B18]">
              {totalOrders}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Total orders
            </p>
          </div>

          {/* PRODUCTS */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-xl bg-[#F8F2EA] p-3">
                <Package
                  size={24}
                  className="text-[#8B1E1E]"
                />
              </div>

              <span className="text-sm text-gray-400">
                Products
              </span>
            </div>

            <p className="text-3xl font-bold text-[#2B1B18]">
              {totalProducts}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Available products
            </p>
          </div>

          {/* REVENUE */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-xl bg-[#F8F2EA] p-3">
                <DollarSign
                  size={24}
                  className="text-[#8B1E1E]"
                />
              </div>

              <span className="text-sm text-gray-400">
                Revenue
              </span>
            </div>

            <p className="text-3xl font-bold text-[#2B1B18]">
              {totalRevenue.toLocaleString()} LE
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Excluding cancelled orders
            </p>
          </div>

          {/* PENDING */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-xl bg-[#F8F2EA] p-3">
                <Clock
                  size={24}
                  className="text-[#8B1E1E]"
                />
              </div>

              <span className="text-sm text-gray-400">
                Pending
              </span>
            </div>

            <p className="text-3xl font-bold text-[#2B1B18]">
              {pendingOrders}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Orders waiting
            </p>
          </div>

        </div>

        {/* RECENT ORDERS */}

        <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-8">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-[#8B1E1E]">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest orders from your customers
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="flex items-center gap-2 rounded-lg bg-[#8B1E1E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6f1717]"
            >
              View All
              <ArrowRight size={16} />
            </Link>

          </div>

          {recentOrders.length === 0 ? (
            <div className="rounded-xl bg-[#F8F2EA] p-8 text-center">
              <p className="text-gray-500">
                No orders yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[600px]">

                <thead>
                  <tr className="border-b text-left">

                    <th className="pb-4 text-sm font-semibold text-gray-500">
                      Order ID
                    </th>

                    <th className="pb-4 text-sm font-semibold text-gray-500">
                      Date
                    </th>

                    <th className="pb-4 text-sm font-semibold text-gray-500">
                      Total
                    </th>

                    <th className="pb-4 text-sm font-semibold text-gray-500">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {recentOrders.map(
                    (order) => (
                      <tr
                        key={order._id}
                        className="border-b last:border-b-0"
                      >

                        <td className="py-4">
                          <span className="font-medium">
                            #{order._id.slice(-6)}
                          </span>
                        </td>

                        <td className="py-4 text-sm text-gray-500">
                          {new Date(
                            order.createdAt,
                          ).toLocaleDateString()}
                        </td>

                        <td className="py-4 font-semibold text-[#8B1E1E]">
                          {order.totalPrice} LE
                        </td>

                        <td className="py-4">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              order.status ===
                              "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.status ===
                                  "confirmed"
                                ? "bg-blue-100 text-blue-700"
                                : order.status ===
                                  "shipped"
                                ? "bg-purple-100 text-purple-700"
                                : order.status ===
                                  "delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.status}
                          </span>

                        </td>

                      </tr>
                    ),
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* CONTACT MESSAGES */}

        <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-8">

          <div className="mb-6 flex items-center justify-between">
            <div>
            <h2 className="text-2xl font-bold text-[#8B1E1E]">
              Contact Messages
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Messages sent by your customers
            </p>
          </div>
<Link
    href="/admin/messages"
    className="flex items-center gap-2 rounded-lg bg-[#8B1E1E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6f1717]"
  >
    View Messages
    <ArrowRight size={16} />
  </Link>
</div>
          {recentContacts.length === 0 ? (
            <div className="rounded-xl bg-[#F8F2EA] p-8 text-center">
              <p className="text-gray-500">
                No messages yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {recentContacts.map(
                (contact) => (
                  <div
                    key={contact._id}
                    className="rounded-xl border border-gray-100 p-5"
                  >

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                      <div>
                        <h3 className="font-semibold text-[#2B1B18]">
                          {contact.name}
                        </h3>

                        <p className="mt-2 text-gray-600">
                          {contact.message}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                          contact.status === "new"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {contact.status}
                      </span>

                    </div>

                    <p className="mt-4 text-xs text-gray-400">
                      {new Date(
                        contact.createdAt,
                      ).toLocaleDateString()}
                    </p>

                  </div>
                ),
              )}

            </div>
          )}

        </div>

      </div>
    </main>
  );
}

