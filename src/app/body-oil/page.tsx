import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/cards/ProductCard";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import BackButton from "@/components/products/BackButton";
 
export default async function BodyOilPage() {
const data = await getProducts();

const products: Product[] = data.products;
   
const BodyOil = products.filter(
  (product) =>
    String(product.category).toLowerCase() ===
    "6ae220abe97db50f1f0e1799"
);

  return (
   

      <main className="min-h-screen bg-velvet-cream py-20">
        <div className="mx-auto max-w-7xl px-6">
        <BackButton/>
          <h1 className="text-5xl font-bold text-velvet-burgundy">
            Perfumes Oil
          </h1>

          <p className="mt-3 mb-12 text-gray-600">
            Discover our luxurious Perfumes Oil collection.
          </p>

          {BodyOil.length === 0 ? (
            <p className="text-center text-gray-500">
              No Perfumes Oil found.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              { BodyOil.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </main>

   
  );
}