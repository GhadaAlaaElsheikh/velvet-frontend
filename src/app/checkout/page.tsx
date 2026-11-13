
import CheckoutForm from "@/components/checkout/CheckoutForm";
import PaymentSummary from "@/components/payment/PaymentSummary";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#F8F2EA] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-12 text-5xl font-bold text-[#8B1E1E]">
          Checkout
        </h1>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">

            <CheckoutForm />

            <div className="rounded-2xl bg-white p-8 shadow">
              <h2 className="mb-4 text-2xl font-semibold text-[#8B1E1E]">
                Payment Method
              </h2>

              <p className="text-gray-700">
                Cash on Delivery
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Pay when your order arrives.
              </p>
            </div>

          </div>

          <div>
            <PaymentSummary />
          </div>
        </div>
      </div>
    </main>
  );
}
