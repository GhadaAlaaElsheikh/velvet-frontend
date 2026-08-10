"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import PaymentMethod from "@/components/payment/PaymentMethod";
import PaymentSummary from "@/components/payment/PaymentSummary";

 
export default function PaymentPage() {
  const router = useRouter();
const { cart } = useCart();
useEffect(() => {
  if (cart.length === 0) {
    router.replace("/cart");
  }
}, [cart, router]);
if (cart.length === 0) {
  return null;
}
  return (
    <main className="min-h-screen bg-[#F8F2EA] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-12 text-5xl font-bold text-[#8B1E1E]">
          Payment
        </h1>

        <div className="grid gap-12 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <PaymentMethod />
          </div>

          <div>
            <PaymentSummary />
          </div>

        </div>

      </div>
    </main>
  );
}