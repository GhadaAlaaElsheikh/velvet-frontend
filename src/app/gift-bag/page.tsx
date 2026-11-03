
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GiftBagBuilder from "@/components/gift-bag/GiftBagBuilder";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";

export default async function GiftBagPage() {
  const data = await getProducts();
  const products: Product[] = data.products || [];

  return (
    <main className="min-h-screen bg-velvet-cream">
      <Navbar />

      <div className="px-6 py-20">
        <GiftBagBuilder products={products} />
      </div>

      <Footer />
    </main>
  );
}
