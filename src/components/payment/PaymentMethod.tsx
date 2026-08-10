"use client";

import { useState } from "react";

export default function PaymentMethod() {
  const [method, setMethod] = useState("cash");

  return (
    <div className="rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-8 text-3xl font-semibold text-[#8B1E1E]">
        Choose Payment Method
      </h2>

      <label className="mb-6 flex cursor-pointer items-center gap-4 rounded-xl border p-5 transition hover:border-[#8B1E1E]">

        <input
          type="radio"
          checked={method === "cash"}
          onChange={() => setMethod("cash")}
        />

        <div>
          <h3 className="font-semibold">
            Cash on Delivery
          </h3>

          <p className="text-sm text-gray-500">
            Pay when your order arrives.
          </p>
        </div>

      </label>

      <label className="flex cursor-not-allowed items-center gap-4 rounded-xl border bg-gray-50 p-5 opacity-60">

        <input
          type="radio"
          disabled
        />

        <div>
          <h3 className="font-semibold">
            Credit / Debit Card
          </h3>

          <p className="text-sm text-gray-500">
            Coming Soon
          </p>
        </div>

      </label>

    </div>
  );
}