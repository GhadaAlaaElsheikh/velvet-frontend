
"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentSummary() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 35 : 0;
  const total = subtotal + shipping;

  const handleOrder = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      // Check login
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.push("/auth");
        return;
      }

      // Check cart
      if (cart.length === 0) {
        setError("Your cart is empty.");
        return;
      }

      // Get checkout information
      const checkoutDataString =
        localStorage.getItem("checkoutData");

      if (!checkoutDataString) {
        setError(
          "Please complete your checkout information first."
        );
        router.push("/checkout");
        return;
      }

      const customerData = JSON.parse(checkoutDataString);

      // Make sure all checkout fields are filled
      const isEmpty = Object.values(customerData).some(
        (value) => !String(value).trim()
      );

      if (isEmpty) {
        setError(
          "Please complete all checkout information."
        );
        router.push("/checkout");
        return;
      }

      // Create order data
      const orderData = {
        ...customerData,

        items: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      console.log("ORDER DATA:", orderData);

      // Send order to backend
      const res = await fetch(
       
  "https://velvet-backend-production.up.railway.app/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await res.json();

      console.log("ORDER RESPONSE:", data);

      if (!res.ok) {
        setError(
          Array.isArray(data.message)
            ? data.message.join(", ")
            : data.message || "Failed to place order"
        );
        return;
      }

      console.log("ORDER CREATED:", data);

      // Clear cart
      clearCart();

      // Remove checkout information
      localStorage.removeItem("checkoutData");

      // Go to success page
      router.push(`/order-success?id=${data._id}`);
    } catch (error) {
      console.error("ORDER ERROR:", error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-8 text-3xl font-semibold text-[#8B1E1E]">
        Payment Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{subtotal} LE</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping} LE</span>
        </div>
      </div>

      <div className="my-8 border-t" />

      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>

        <span className="text-[#8B1E1E]">
          {total} LE
        </span>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        onClick={handleOrder}
        disabled={loading || cart.length === 0}
        className="mt-8 w-full rounded-lg bg-[#8B1E1E] py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

