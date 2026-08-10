import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/cards/ProductCard";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import BackButton from "@/components/products/BackButton";

export default async function PerfumesPage() {
const data = await getProducts();

const products: Product[] = data.products;
  const perfumeProducts = products.filter(
    (product) =>
      product.category === "Luxury Perfumes" ||
      product.category === "perfumes"
  );

  const womenPerfumes = perfumeProducts.filter(
    (product) =>
      product.gender === "women" ||
      product.gender === "unisex"
  );

  const menPerfumes = perfumeProducts.filter(
    (product) => product.gender === "men"
  );

  return (
     

      <main className="min-h-screen bg-velvet-cream py-20">
        <div className="mx-auto max-w-7xl px-6">
       <BackButton/>
          <h1 className="text-5xl font-bold text-velvet-burgundy">
            Perfumes
          </h1>

          <p className="mt-3 mb-12 text-gray-600">
            Discover our luxury perfume collection.
          </p>

          {/* For Her */}
          {womenPerfumes.length > 0 && (
            <section>
              <h2 className="mb-6 text-3xl font-semibold text-[#2B1B18]">
                For Her
              </h2>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {womenPerfumes.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            </section>
          )}

          {/* For Him */}
          {menPerfumes.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 text-3xl font-semibold text-[#2B1B18]">
                For Him
              </h2>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {menPerfumes.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

   
  );
}