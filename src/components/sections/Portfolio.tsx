import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { ChevronRight } from 'lucide-react';

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: 'DeFi Exchange Platform',
    category: 'Blockchain',
    description: 'A decentralized exchange platform with liquidity pools and staking features',
    image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Smart Contracts', 'DeFi', 'Web3', 'React'],
  },
  {
    id: 2,
    title: 'AI-Powered Analytics Dashboard',
    category: 'AI',
    description: 'Machine learning solution for real-time data analysis and visualization',
    image: 'https://images.pexels.com/photos/7567454/pexels-photo-7567454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Machine Learning', 'Python', 'Data Visualization', 'TensorFlow'],
  },
  {
    id: 3,
    title: 'NFT Marketplace',
    category: 'Blockchain',
    description: 'A platform for creating, buying, and selling unique digital assets',
    image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['NFT', 'Ethereum', 'Solidity', 'IPFS'],
  },
  {
    id: 4,
    title: 'Predictive Maintenance System',
    category: 'AI',
    description: 'AI-driven system to predict equipment failures before they occur',
    image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Deep Learning', 'IoT', 'Predictive Analytics', 'Industrial'],
  },
  {
    id: 5,
    title: 'Decentralized Identity Solution',
    category: 'Blockchain',
    description: 'Self-sovereign identity management using blockchain technology',
    image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Digital Identity', 'Privacy', 'Blockchain', 'Zero-Knowledge Proofs'],
  },
  {
    id: 6,
    title: 'Natural Language Processing API',
    category: 'AI',
    description: 'API for sentiment analysis, text classification, and entity recognition',
    image: 'https://images.pexels.com/photos/335890/pexels-photo-335890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['NLP', 'API', 'Machine Learning', 'Python'],
  },
];

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Blockchain', 'AI', 'Web3'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <Section id="portfolio" dark>
      <div className="text-center mb-16">
        <p className="text-blue-400 font-medium mb-2 tracking-wider">OUR WORK</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Featured Projects
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our portfolio of groundbreaking blockchain and AI solutions that have helped
          businesses transform their operations and create new value.
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div 
            key={project.id}
            className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-3 py-1 bg-blue-500/20 backdrop-blur-sm text-blue-400 text-xs font-medium rounded-full">
                  {project.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a 
                href="#" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm"
              >
                View Case Study
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button secondary>View All Projects</Button>
      </div>
    </Section>
  );
};