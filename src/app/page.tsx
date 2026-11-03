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
    <div className="w-full overflow-hidden bg-velvet-cream py-3">
  <div className="animate-marquee whitespace-nowrap text-center text-base font-extrabold tracking-wider text-velvet-burgundy sm:text-lg">
    ✨ November Special Offers — Special Discounts All Month Long! ✨
    &nbsp;&nbsp;&nbsp;
    ✨ November Special Offers — Special Discounts All Month Long! ✨
  </div>
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

    <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-xl">
      <Image
        src="/images/offer.jpeg"
        alt="Velvet Gift Bag"
        width={1536}
        height={1024}
        className="h-auto w-full"
        priority
      />

      <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/60 to-transparent px-4 pb-6 pt-16 sm:pb-10">
        <Link
          href="/gift-bag"
          className="inline-flex items-center justify-center rounded-full border-2 border-white bg-velvet-gold px-8 py-4 text-base font-bold text-velvet-burgundy shadow-xl transition-all duration-300 hover:scale-105 hover:bg-velvet-burgundy hover:text-white sm:px-10 sm:py-5"
             >
          Customize Your Gift Bag
        </Link>
      </div>
    </div>

    <p className="mt-7 text-2xl font-semibold text-velvet-burgundy">
      Velvet Gift Bag — 300 LE
    </p>

    <p className="mt-2 text-sm text-velvet-dark/70">
      1 Bakhoor, 1 Candle, and 3 Perfumes of your choice (10ml each).
    </p>
  </div>
</section>



      <Categories />
      <BestSellers/>
      <WhyChoose/>
       
    </>
  );
}