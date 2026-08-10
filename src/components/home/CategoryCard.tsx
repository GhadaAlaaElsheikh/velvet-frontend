import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  title: string;
  image: string;
  href: string;
};

export default function CategoryCard({
  title,
  image,
  href,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl"
    >
      <div className="relative h-56 sm:h-72 lg:h-80 w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width:640px) 100vw,
                 (max-width:1024px) 50vw,
                 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/25" />

        <h3 className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h3>
      </div>
    </Link>
  );
}