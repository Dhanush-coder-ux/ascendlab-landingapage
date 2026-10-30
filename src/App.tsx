import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Work from "./components/Work";
import Testimonials from "./components/Testimonials";
import Process from "./components/Process";
import Why from "./components/Why";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  const [service, setService] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-white text-ink">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-md"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <Hero />
        <Services pick={setService} />
        <About />
        <Work />
        <Testimonials />
        <Process />
        <Why />
        <FAQ />
        <Contact service={service} />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
