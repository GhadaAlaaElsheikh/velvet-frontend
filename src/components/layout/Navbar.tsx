
"use client";

import Image from "next/image";
import { Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import SearchModal from "@/components/search/SearchModal";

export default function Navbar() {
  const { cart } = useCart();
  const { setOpen } = useSearch();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[#F8F2EA]">
        <div className="relative mx-auto flex h-24 max-w-7xl items-center px-6">

          {/* LOGO - CENTER */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src="/images/frame.png"
              alt="Velvet"
              width={130}
              height={80}
              priority
            />
          </Link>

          {/* SEARCH + CART - RIGHT */}
          <div className="ml-auto flex w-1/3 items-center justify-end gap-4">

            <button
              onClick={() => setOpen(true)}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center text-gray-700 transition hover:text-[#8B1E1E]"
            >
              <Search size={22} />
            </button>

            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <ShoppingBag
                size={23}
                className="text-gray-700 transition hover:text-[#8B1E1E]"
              />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#8B1E1E] px-1 text-[11px] font-semibold leading-none text-white shadow-md">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      </nav>

      <SearchModal />
    </>
  );
}
