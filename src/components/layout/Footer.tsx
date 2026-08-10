import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#8B1E1E] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-serif sm:text-4xl">
              Velvet
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-200">
              Luxury fragrances, candles and bukhoor crafted with elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold sm:text-xl">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="transition hover:text-[#F5D7A1]">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/shop" className="transition hover:text-[#F5D7A1]">
                  Shop
                </Link>
              </li>

              <li>
                <Link href="/about" className="transition hover:text-[#F5D7A1]">
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact" className="transition hover:text-[#F5D7A1]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-semibold sm:text-xl">
              Categories
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/perfumes" className="transition hover:text-[#F5D7A1]">
                  Perfumes
                </Link>
              </li>

              <li>
                <Link href="/candles" className="transition hover:text-[#F5D7A1]">
                  Candles
                </Link>
              </li>

              <li>
                <Link href="/bukhoor" className="transition hover:text-[#F5D7A1]">
                  Bukhoor
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="mb-4 text-lg font-semibold sm:text-xl">
              Follow Us
            </h3>

            <div className="flex gap-5 text-xl sm:text-2xl">

              <a
                href="https://instagram.com/velvet_fragrance1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="transition hover:text-[#F5D7A1]" />
              </a>

              <a href="#">
                <FaFacebookF className="transition hover:text-[#F5D7A1]" />
              </a>

              <a href="#">
                <FaTiktok className="transition hover:text-[#F5D7A1]" />
              </a>

              <a
                href="https://wa.me/201024868353"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="transition hover:text-[#F5D7A1]" />
              </a>

            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-gray-200">
          © 2026 Velvet. All rights reserved.
        </div>

      </div>
    </footer>
  );
}