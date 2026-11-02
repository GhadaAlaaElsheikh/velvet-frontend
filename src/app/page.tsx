import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Categories from "@/components/home/Categories";
import BestSellers from "@/components/home/BestSellers";
import WhyChoose from "@/components/home/WhyChoose";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
 
export default function Home() {
  return (
    <>
      
      {/* November Offers Announcement */}
      <div className="w-full bg-velvet-burgundy px-4 py-3 text-center text-sm font-medium tracking-wide text-velvet-gold sm:text-base">
        ✨ November Special Offers — Special Discounts All Month Long! ✨
      </div>

      <Hero />
      <Intro />

       <section className="bg-velvet-cream px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-velvet-burgundy">
            November Exclusive
          </p>

          <h2 className="mb-3 text-3xl font-semibold text-velvet-dark sm:text-5xl">
            A Gift Made Just for You
          </h2>

          <p className="mb-8 text-velvet-dark/70">
            Discover our special Velvet Gift Bag.
          </p>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/november-offer.png"
              alt="Velvet November Gift Bag Special Offer"
              width={1536}
              height={1024}
              className="h-auto w-full"
              priority
            />
          </div>

          <p className="mt-7 text-2xl font-semibold text-velvet-burgundy">
            Velvet Gift Bag — 300 LE
          </p>

          <p className="mt-2 text-sm text-velvet-dark/70">
            Bakhoor, a 25g candle, and 3 perfumes of your choice (10ml each).
          </p>

          <Link
            href="/gift-bag"
            className="mt-6 inline-flex rounded-full bg-velvet-burgundy px-9 py-4 font-semibold text-white transition hover:bg-velvet-dark"
          >
            Discover the Gift Bag
          </Link>
        </div>
      </section>


      <Categories />
      <BestSellers/>
      <WhyChoose/>
       
    </>
  );
}