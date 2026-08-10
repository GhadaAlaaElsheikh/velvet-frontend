
import Image from "next/image";
import { notFound } from "next/navigation";

import { getProductById, getProducts } from "@/services/product.service";
import ProductInfo from "@/components/products/ProductInfo";
import RelatedProducts from "@/components/products/RelatedProducts";
import BackButton from "@/components/products/BackButton";
import ProductReviews from "@/components/products/ProductReviews";
import { Product } from "@/types/product";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetails({
  params,
}: Props) {
    const { id } = await params;
 const product = await getProductById(id);

if (!product) {
  notFound();
}

const data = await getProducts();

const products: Product[] = Array.isArray(data)
  ? data
  : Array.isArray(data?.products)
    ? data.products
    : [];

  return (
    <>
      <main className="min-h-screen bg-velvet-cream py-20">
        <div className="mx-auto max-w-7xl px-6">

          {/* Back */}
          <BackButton />

          {/* Product */}
          <div className="mt-8 grid gap-12 lg:grid-cols-2">

            {/* Product Image */}
            <div className="relative h-[600px] overflow-hidden rounded-xl bg-white">
              <Image
                src={product.detailsImage || product.images?.[0] || ""}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <ProductInfo product={product} />

          </div>

          {/* Reviews */}
          <ProductReviews product={product} />

          {/* Related Products */}
          <RelatedProducts
            currentProduct={product}
            products={products}
          />

        </div>
      </main>
    </>
  );
}

