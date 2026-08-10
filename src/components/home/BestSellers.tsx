import ProductCard from "@/components/cards/ProductCard";
import { getProducts } from "@/services/product.service";

export default async function BestSellers() {
const data = await getProducts();

const products = data.products;

  const bestSellers = products.filter(
    (product: any) => product.badge === "Best Seller"
  );

  return (
    <section className="bg-[#F8F2EA] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-3xl font-bold text-[#8B1E1E] sm:text-4xl lg:mb-12">
          Best Sellers
        </h2>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {bestSellers.map((product: any) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}