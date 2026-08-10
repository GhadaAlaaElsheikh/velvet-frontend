import Image from "next/image";

export default function Intro() {
  return (
    <section className="bg-[#F8F2EA] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">

        <p className="mx-auto max-w-2xl text-base leading-7 text-[#8B1E1E] sm:text-lg sm:leading-8">
          Experience timeless fragrances crafted with elegance,
          designed to leave a lasting impression wherever you go.
        </p>

        <div className="relative mx-auto mt-10 h-64 w-full max-w-sm sm:h-80 sm:max-w-xl lg:h-[420px] lg:max-w-4xl">
          <Image
            src="/images/intro.png"
            alt="Perfumes"
            fill
            className="rounded-xl object-cover"
          />
        </div>

      </div>
    </section>
  );
}