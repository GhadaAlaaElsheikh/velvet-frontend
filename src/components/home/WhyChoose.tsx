import {
  Gem,
  Gift,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function WhyChoose() {
  return (
    <section className="bg-[#F8F2EA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <h2 className="mb-10 text-center text-3xl font-bold text-[#8B1E1E] sm:text-4xl lg:mb-12">
          Why Choose Velvet
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* Card 1 */}
          <div className="rounded-xl bg-white p-6 text-center shadow-sm transition hover:shadow-md sm:p-8">
            <Gem
              className="mx-auto mb-4 h-9 w-9 text-[#8B1E1E]"
            />

            <h3 className="mb-3 text-lg font-semibold sm:text-xl">
              Premium Quality
            </h3>

            <p className="text-sm leading-6 text-gray-600 sm:text-base">
              Carefully selected fragrances crafted with luxurious ingredients.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl bg-white p-6 text-center shadow-sm transition hover:shadow-md sm:p-8">
            <Gift
              className="mx-auto mb-4 h-9 w-9 text-[#8B1E1E]"
            />

            <h3 className="mb-3 text-lg font-semibold sm:text-xl">
              Luxury Packaging
            </h3>

            <p className="text-sm leading-6 text-gray-600 sm:text-base">
              Elegant packaging designed to make every order feel special.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl bg-white p-6 text-center shadow-sm transition hover:shadow-md sm:p-8">
            <Truck
              className="mx-auto mb-4 h-9 w-9 text-[#8B1E1E]"
            />

            <h3 className="mb-3 text-lg font-semibold sm:text-xl">
              Fast Delivery
            </h3>

            <p className="text-sm leading-6 text-gray-600 sm:text-base">
              Safe and reliable shipping to deliver your order quickly.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl bg-white p-6 text-center shadow-sm transition hover:shadow-md sm:p-8">
            <ShieldCheck
              className="mx-auto mb-4 h-9 w-9 text-[#8B1E1E]"
            />

            <h3 className="mb-3 text-lg font-semibold sm:text-xl">
              Long Lasting
            </h3>

            <p className="text-sm leading-6 text-gray-600 sm:text-base">
              Fragrances that stay with you throughout the day.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}