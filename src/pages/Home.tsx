import Contact from "../components/sections/Contact";
import Faq from "../components/sections/Faq";
import Hero from "../components/sections/Hero";
import Industries from "../components/sections/Industries";
import Insights from "../components/sections/Insights";
import Intro from "../components/sections/Intro";
import LanguageStrip from "../components/sections/LanguageStrip";
import Languages from "../components/sections/Languages";
import Process from "../components/sections/Process";
import Quality from "../components/sections/Quality";
import Services from "../components/sections/Services";
import Testimonials from "../components/sections/Testimonials";
import WhyUs from "../components/sections/WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <LanguageStrip />
      <Intro />
      <Services />
      <Industries />
      <Languages />
      <WhyUs />
      <Quality />
      <Process />
      <Testimonials />
      <Insights />
      <Faq />
      <Contact />
    </>
  );
}
