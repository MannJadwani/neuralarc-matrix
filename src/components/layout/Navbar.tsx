import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Brain, Zap } from 'lucide-react';
import { Link } from '../ui/Link';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'AI Solutions', href: '#services' },
  { name: 'Blockchain', href: '#services' },
  { name: 'Projects', href: '#portfolio' },
  { name: 'About', href: '#about' },
  { name: 'Blog', href: '#blog' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="#home"
              className="text-xl font-bold tracking-tighter text-white flex items-center"
            >
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mr-1.5">
                Neuralarc
              </span>
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Matrix</span>
              <Brain size={18} className="ml-1.5 text-purple-400" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium ${
                  link.name === 'AI Solutions' 
                    ? 'text-purple-400 font-semibold flex items-center gap-1.5' 
                    : 'text-gray-300 hover:text-white transition-colors'
                }`}
              >
                {link.name === 'AI Solutions' && <Zap size={14} className="text-purple-400" />}
                {link.name}
              </Link>
            ))}
            <Button
              primary
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
            >
              Get Demo
            </Button>
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-purple-500/20">
            <div className="flex flex-col px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium ${
                    link.name === 'AI Solutions' 
                      ? 'text-purple-400 font-semibold flex items-center gap-1.5' 
                      : 'text-gray-300 hover:text-white transition-colors'
                  }`}
                >
                  {link.name === 'AI Solutions' && <Zap size={14} className="text-purple-400" />}
                  {link.name}
                </Link>
              ))}
              <Button
                primary
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                Get Demo
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};