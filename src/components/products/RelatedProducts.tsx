
import ProductCard from "@/components/cards/ProductCard";
import { Product } from "@/types/product";

type Props = {
  currentProduct: Product;
  products: Product[];
};

export default function RelatedProducts({
  currentProduct,
  products,
}: Props) {
  const relatedProducts = products
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product._id !== currentProduct._id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-10 text-3xl font-bold text-[#8B1E1E]">
        Related Products
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

