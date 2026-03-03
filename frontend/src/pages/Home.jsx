import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Service from "../components/Service"
import About from "../components/About"
import Contact from "../components/Contact"
export default function Home() {
  return (
    <>
      <Navbar />

      <section id="home">
        <HeroSection/>
      </section>
      <section id="services"><Service/></section>
      <section id="about"><About/></section>
      <section id="contact"><Contact/></section>
    </>
  );
}