import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Categories from "@/components/home/Categories";
import BestSellers from "@/components/home/BestSellers";
import WhyChoose from "@/components/home/WhyChoose";
import Footer from "@/components/layout/Footer";
 
export default function Home() {
  return (
    <>
     
      <Hero />
      <Intro />
      <Categories />
      <BestSellers/>
      <WhyChoose/>
       
    </>
  );
}