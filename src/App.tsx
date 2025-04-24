import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Portfolio } from './components/sections/Portfolio';
import { About } from './components/sections/About';
import { Testimonials } from './components/sections/Testimonials';
import { Blog } from './components/sections/Blog';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;