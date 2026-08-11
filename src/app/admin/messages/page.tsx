"use client";

import BackButton from "@/components/ui/BackButton";
import { useEffect, useState } from "react";

type Contact = {
  _id: string;
  name: string;
  message: string;
  status: "new" | "read";
  createdAt: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const token =
          localStorage.getItem("accessToken");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
        if (!token) {
          console.error("No access token");
          return;
        }

        const res = await fetch(
        `${API_URL}/contacts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          const errorData = await res.json();

          console.error(
            "MESSAGES API ERROR:",
            errorData,
          );

          throw new Error(
            errorData.message ||
              "Failed to fetch messages",
          );
        }

        const data: Contact[] =
          await res.json();

        setMessages(data);
      } catch (error) {
        console.error(
          "MESSAGES ERROR:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F2EA] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-gray-500">
            Loading messages...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F2EA] px-6 pb-12 ">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#D8B46A]">
            Velvet Admin
          </p>
<BackButton/>
          <h1 className="text-4xl font-bold text-[#8B1E1E] md:text-5xl">
            Contact Messages
          </h1>

          <p className="mt-3 text-gray-500">
            All messages sent by your customers.
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">
              No messages yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message._id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div>
                    <h2 className="text-xl font-semibold text-[#2B1B18]">
                      {message.name}
                    </h2>

                    <p className="mt-3 leading-7 text-gray-600">
                      {message.message}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      message.status === "new"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {message.status}
                  </span>

                </div>

                <div className="mt-5 border-t pt-4">
                  <p className="text-xs text-gray-400">
                    {new Date(
                      message.createdAt,
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}