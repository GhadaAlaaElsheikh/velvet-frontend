import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { SearchProvider } from "@/context/SearchContext";
 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velvet",
  description: "Luxury Perfumes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         <SearchProvider> 
        <WishlistProvider>
          <CartProvider>
            <Navbar />
               
            <main className="flex-1 pt-24">
              {children}
            </main>
 
            <Footer />
             <Toaster
    position="top-right"
    richColors
    closeButton
  />
          </CartProvider>
        </WishlistProvider>
       </SearchProvider>
      </body>
    </html>
  );
}