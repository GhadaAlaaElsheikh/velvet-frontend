
import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#F8F2EA] p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-4xl font-bold text-[#8B1E1E]">
          Admin Dashboard
        </h1>

        <p className="mb-10 text-gray-600">
          Welcome to Velvet Admin Panel
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/admin/orders"
            className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"
          >
            <h2 className="mb-3 text-2xl font-bold text-[#8B1E1E]">
              Orders
            </h2>
            <p className="text-gray-600">
              View and manage customer orders.
            </p>
          </Link>

          <Link
            href="/admin/messages"
            className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"
          >
            <h2 className="mb-3 text-2xl font-bold text-[#8B1E1E]">
              Messages
            </h2>
            <p className="text-gray-600">
              View customer messages.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
