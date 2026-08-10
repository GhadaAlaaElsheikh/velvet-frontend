"use client";

import Image from "next/image";
import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import SearchModal from "@/components/search/SearchModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { cart } = useCart();
  const { setOpen } = useSearch();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleUserClick = () => {
    if (!isLoggedIn) {
      router.push("/auth");
      return;
    }

    setUserMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");

    setIsLoggedIn(false);
    setUserMenuOpen(false);

    router.push("/");
  };

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[#F8F2EA]">
        <div className="relative mx-auto flex h-24 max-w-7xl items-center px-6">

          {/* ================= USER - LEFT ================= */}
          <div className="relative flex w-1/3 justify-start">
            <button
              onClick={handleUserClick}
              aria-label="User account"
              className="flex h-10 w-10 items-center justify-center"
            >
              <User
                size={23}
                className="text-gray-700 transition hover:text-[#8B1E1E]"
              />
            </button>

            {/* User Menu */}
            {isLoggedIn && userMenuOpen && (
              <div className="absolute left-0 top-12 z-50 w-44 rounded-xl bg-white p-2 shadow-lg">
                <Link
                  href="/my-orders"
                  onClick={() => setUserMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#F8F2EA] hover:text-[#8B1E1E]"
                >
                  My Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-[#F8F2EA] hover:text-[#8B1E1E]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* ================= LOGO - CENTER ================= */}
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

          {/* ================= SEARCH + CART - RIGHT ================= */}
          <div className="ml-auto flex w-1/3 items-center justify-end gap-4">

            {/* Search */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center text-gray-700 transition hover:text-[#8B1E1E]"
            >
              <Search size={22} />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
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

      {/* Search Popup */}
      <SearchModal />
    </>
  );
}