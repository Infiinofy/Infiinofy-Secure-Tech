import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import ValueProposition from "@/components/home/ValueProposition";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import ContactSection from "@/components/home/Contact";
import FAQ from "@/components/home/FAQ";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <ValueProposition />
        <Testimonials />
        <CTA />
        <ContactSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
