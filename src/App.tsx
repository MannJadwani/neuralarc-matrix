import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import ServicesV2 from './components/sections/ServicesV2';
import PortfolioV2 from './components/sections/PortfolioV2';
import { About } from './components/sections/About';
import { Testimonials } from './components/sections/Testimonials';
import { Blog } from './components/sections/Blog';
import { Contact } from './components/sections/Contact';
import { HeroV6 } from './components/sections/HeroV6';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroV6 />
      <ServicesV2 />
      <PortfolioV2 />
      <About />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;