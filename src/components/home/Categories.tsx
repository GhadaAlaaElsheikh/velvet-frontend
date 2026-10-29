import CategoryCard from "./CategoryCard";

export default function Categories() {
  return (
    <section className="bg-[#F8F2EA] py-20">
      <div className="mx-auto max-w-7xl px-6">

         <h2 className="mb-10 text-4xl font-bold text-[#8B1E1E]">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <CategoryCard
            title="Perfumes"
            image="/images/categories/perfumes.jpeg"
            href="/perfumes"
          />

          <CategoryCard
            title="Candles"
            image="/images/categories/candles.jpeg"
            href="/candles"
          />
   <CategoryCard
            title="Bukhoor"
            image="/images/categories/bukhoor.jpeg"
            href="/bukhoor"
          />

          <CategoryCard
            title="Perfume Oil"
            image="/images/categories/bodyoil.jpeg"
            href="/perfumes-oil"
          />
            </div>

        

      </div>
    </section>
  );
}