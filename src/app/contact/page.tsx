
"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("https://velvet-backend-production.up.railway.app/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message || "Failed to send message"
        );
      }

      setSuccess("Your message has been sent successfully.");

      setName("");
      setMessage("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-velvet-cream px-6 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-serif text-5xl text-[#8B1E1E]">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Have a question or need help? We would love to hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {/* Contact Information */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="font-serif text-3xl text-[#2B1B18]">
              Get In Touch
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Whether you have a question about our products,
              your order, or anything else, feel free to reach out
              to us.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="mt-1 font-medium text-[#2B1B18]">
                  +20 1094737569
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Instagram
                </p>

                <p className="mt-1 font-medium text-[#2B1B18]">
                  @velvet_fragrance1
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-8 shadow-sm"
          >
            <h2 className="font-serif text-3xl text-[#2B1B18]">
              Send Us A Message
            </h2>

            {/* Name */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full rounded-lg border border-gray-200 p-3 outline-none transition focus:border-[#8B1E1E]"
              />
            </div>

            {/* Message */}
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">
                Message
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                required
                className="h-32 w-full resize-none rounded-lg border border-gray-200 p-3 outline-none transition focus:border-[#8B1E1E]"
              />
            </div>

            {/* Success */}
            {success && (
              <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {success}
              </p>
            )}

            {/* Error */}
            {error && (
              <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-[#8B1E1E] py-3 font-medium text-white transition hover:bg-[#6F1515] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

