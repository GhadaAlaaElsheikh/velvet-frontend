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

          <div className="col-span-2 flex justify-center">
            <div className="w-1/2">
              <CategoryCard
                title="Bukhoor"
                image="/images/categories/bukhoor.jpeg"
                href="/bukhoor"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}