import React from 'react';
import { Container } from '../ui/Container';
import { Link } from '../ui/Link';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Brain } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 mb-12">
          <div>
            <Link
              href="#home"
              className="text-xl font-bold tracking-tighter text-white flex items-center mb-4"
            >
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mr-1.5">
                Neuralarc
              </span>
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Matrix</span>
              <Brain size={18} className="ml-1.5 text-purple-400" />
            </Link>
            <p className="text-gray-400 mb-6">
              Empowering businesses with intelligent AI agents and secure blockchain solutions that transform operations, enhance security, and drive innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#home" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-purple-400 transition-colors">
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-gray-400 hover:text-purple-400 transition-colors">
                  AI Research
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Our Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  AI Agents & Automation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Enterprise AI Solutions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Blockchain Development
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Smart Contracts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Knowledge & Research Tools
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  AI-Blockchain Integration
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">AI Updates</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive insights on AI advancements, blockchain innovations, and our latest intelligent solutions.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-4 py-2 rounded-r-lg flex items-center justify-center transition-colors"
                >
                  <Mail size={18} />
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Neuralarc Matrix. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-500 hover:text-gray-400 text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-400 text-sm">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-400 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};