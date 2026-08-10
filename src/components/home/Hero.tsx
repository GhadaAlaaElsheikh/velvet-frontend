import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      <div className="grid h-[400px] grid-cols-2 sm:h-[500px] lg:h-[650px]">
        <div className="relative">
          <Image
            src="/images/hero-left.jpeg"
            alt="Hero Left"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative">
          <Image
            src="/images/hero-right.jpeg"
            alt="Hero Right"
            fill
            priority
            className="object-cover"
          />
        </div>

      </div>

      <div className="absolute inset-0 flex items-end justify-center px-6 pb-8 sm:pb-10 lg:pb-14">
        <h2 className="max-w-4xl text-center text-3xl font-light text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Leave a Trail of Elegance
        </h2>
      </div>
    </section>
  );
}