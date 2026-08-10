import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#F8F2EA] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h1 className="mb-12 text-5xl font-bold text-[#8B1E1E]">
          Checkout
        </h1>

        <div className="grid gap-12 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          <div>
            <OrderSummary />
          </div>

        </div>

      </div>
    </main>
  );
}