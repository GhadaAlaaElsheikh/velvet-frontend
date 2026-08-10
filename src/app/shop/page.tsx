import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/cards/ProductCard";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import BackButton from "@/components/products/BackButton";

type ShopPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const { category } = await searchParams;

  const data = await getProducts();

  const products: Product[] = data?.products ?? [];
const filteredProducts = category
  ? products.filter(
      (product: Product) => product.category === category
    )
  : products;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-velvet-cream px-6 py-12 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <BackButton />

          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-velvet-dark md:text-4xl">
              Shop
            </h1>

            <p className="mt-3 text-gray-600">
              Discover our luxury collection.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12">
              {filteredProducts.length === 0 ? (
                <p className="py-20 text-center text-gray-500">
                  No products found.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
             {filteredProducts.map((product: Product) => (

<ProductCard

 key={product._id}

 product={product}

   />

 ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}