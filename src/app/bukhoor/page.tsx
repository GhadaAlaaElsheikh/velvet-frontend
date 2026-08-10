import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/cards/ProductCard";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import BackButton from "@/components/products/BackButton";

export default async function BukhoorPage() {
const data = await getProducts();

const products: Product[] = data.products;
  const bukhoor = products.filter(
    (product) => product.category.toLowerCase() === "bakhoor"
  );

  return (
   

      <main className="min-h-screen bg-velvet-cream py-20">
        <div className="mx-auto max-w-7xl px-6">
        <BackButton/>
          <h1 className="text-5xl font-bold text-velvet-burgundy">
            Bukhoor
          </h1>

          <p className="mt-3 mb-12 text-gray-600">
            Discover our luxurious bukhoor collection.
          </p>

          {bukhoor.length === 0 ? (
            <p className="text-center text-gray-500">
              No bukhoor found.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {bukhoor.map((product) => (
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