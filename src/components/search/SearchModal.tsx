"use client";

import { X, Search } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Category = {
  _id: string;
  name: string;
  image?: string;
};

type Product = {
  _id: string;
  name: string;
  description?: string;
  category: string | Category;
  gender?: string;
  price: number;
  images?: string[];
  sizes?: {
    name: string;
    price: number;
  }[];
};

export default function SearchModal() {
  const { open, setOpen } = useSearch();

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch products when search opens
  useEffect(() => {
    if (!open) return;

    const getProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3001/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        console.log("SEARCH PRODUCTS:", data);

        setProducts(data.products ?? data);
      } catch (error) {
        console.error("SEARCH PRODUCTS ERROR:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [open]);

  // Clear search when modal closes
  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  if (!open) return null;

  const search = query.trim().toLowerCase();

  // Filter products
  const filteredProducts = products.filter((product) => {
    const categoryName =
      typeof product.category === "string"
        ? product.category
        : product.category?.name ?? "";

    const name = product.name ?? "";
    const description = product.description ?? "";
    const gender = product.gender ?? "";

    return (
      name.toLowerCase().includes(search) ||
      categoryName.toLowerCase().includes(search) ||
      description.toLowerCase().includes(search) ||
      gender.toLowerCase().includes(search)
    );
  });

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40"
      onClick={() => setOpen(false)}
    >
      <div
        className="mx-auto mt-20 w-[90%] max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#8B1E1E]">
            Search Velvet
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#F8F2EA]"
            aria-label="Close search"
          >
            <X size={22} />
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3 focus-within:border-[#8B1E1E]">
          <Search size={20} className="text-gray-400" />

          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a product..."
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* Loading */}
        {loading && (
          <p className="py-8 text-center text-gray-500">
            Loading products...
          </p>
        )}

        {/* Empty Search */}
        {!loading && search === "" && (
          <p className="py-8 text-center text-gray-500">
            Search for perfumes, candles or bukhoor...
          </p>
        )}

        {/* No Results */}
        {!loading &&
          search !== "" &&
          filteredProducts.length === 0 && (
            <p className="py-8 text-center text-gray-500">
              No products found.
            </p>
          )}

        {/* Results */}
        {!loading && filteredProducts.length > 0 && (
          <div className="max-h-[400px] space-y-3 overflow-y-auto">
            {filteredProducts.map((product) => {
              const displayPrice =
                product.sizes?.[0]?.price ?? product.price;

              const categoryName =
                typeof product.category === "string"
                  ? product.category
                  : product.category?.name ?? "";

              return (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-[#F8F2EA]"
                >
                  {/* Product Image */}
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={70}
                      height={70}
                      className="h-[70px] w-[70px] rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-[70px] w-[70px] rounded-lg bg-gray-100" />
                  )}

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#8B1E1E]">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {categoryName}
                    </p>
                  </div>

                  {/* Price */}
                  <span className="font-semibold text-[#8B1E1E]">
                    {displayPrice} LE
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}