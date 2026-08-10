export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">

      <section className="text-center">

        <h1 className="font-serif text-5xl text-[#8B1E1E]">
          About Velvet
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
          Velvet is a luxury fragrance brand created to bring
          elegance, beauty, and timeless scents to your everyday life.
        </p>

      </section>


      <section className="mt-16 grid gap-10 md:grid-cols-2">

        <div>
          <h2 className="text-3xl font-serif text-[#8B1E1E]">
            Our Story
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            We believe that every fragrance tells a story.
            Velvet combines carefully selected notes to create
            unique perfumes that express confidence and elegance.
          </p>
        </div>


        <div>
          <h2 className="text-3xl font-serif text-[#8B1E1E]">
            Our Mission
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Our mission is to provide premium fragrances with
            a luxurious experience from choosing your scent
            to receiving your order.
          </p>
        </div>
<div>
          <h2 className="text-3xl font-serif text-[#8B1E1E]">
            Behind Velvet
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
           We are not just a brand, we are a family
           Founded by siblings and cousins who share the same love for fragrances and creativity, Velvet represents our journey of turning a dream into a beautiful reality.
           Each scent carries a piece of our passion, dedication, and the memories we create together.
 
               </p>
        </div>
         <div>
          <h2 className="text-3xl font-serif text-[#8B1E1E]">
           By:
          </h2>

          <p className="text-3xl font-serif text-[#8B1E1E]">
           Ghada , Esraa , Eman and Alaa Elsheikh
               </p>
        </div>
      </section>

    </main>
  );
}