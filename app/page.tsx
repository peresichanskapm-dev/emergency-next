import Hero from "@/components/home/Hero/Hero";
import Stats from "@/components/home/Stats/Stats";
import About from "@/components/home/About/About";
import WhyAttend from "@/components/home/WhyAttend/WhyAttend";
import Topics from "@/components/home/Topics/Topics";
import Speakers from "@/components/home/Speakers/Speakers";
import Program from "@/components/home/Program/Program";
import ForAudience from "@/components/home/ForAudience/ForAudience";
import Pricing from "@/components/home/Pricing/Pricing";
import Bpr from "@/components/home/Bpr/Bpr";
import JoinForm from "@/components/home/JoinForm/JoinForm";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <WhyAttend />
      <Topics />
      <Speakers />
      <Program />
      <ForAudience />
      <Pricing />
        <Bpr />
        <JoinForm />
        <Footer />
    </main>
  );
}
