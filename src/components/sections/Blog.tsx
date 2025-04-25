import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { ArrowRight, Brain, Bot, Zap, Link as LinkIcon, Lock, Database } from 'lucide-react';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  icon: React.ReactNode;
  image: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of AI Agents: Autonomous Systems in Business',
    excerpt: 'Explore how autonomous AI agents are transforming business operations and creating new efficiencies in enterprise environments.',
    date: 'May 15, 2025',
    author: 'Sophia Chen',
    authorRole: 'AI Research Lead',
    category: 'AI Agents',
    icon: <Bot size={14} />,
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'Blockchain and AI: Building Trust in Intelligent Systems',
    excerpt: 'Discover how the integration of blockchain technology with AI systems creates trustworthy and transparent solutions for enterprises.',
    date: 'May 12, 2025',
    author: 'Marcus Johnson',
    authorRole: 'Blockchain Architect',
    category: 'Blockchain',
    icon: <LinkIcon size={14} />,
    image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Smart Contracts: Automating Business Logic with Blockchain',
    excerpt: 'Learn how smart contracts can automate complex business processes with unmatched security, reducing costs and eliminating intermediaries.',
    date: 'May 4, 2025',
    author: 'Elena Rodriguez',
    authorRole: 'Smart Contract Developer',
    category: 'Blockchain',
    icon: <Lock size={14} />,
    image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const Blog: React.FC = () => {
  return (
    <Section id="blog" dark>
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-purple-500/20 bg-purple-500/5">
          <span className="text-sm font-medium tracking-wide text-purple-400">INSIGHTS & RESEARCH</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Latest From Our Tech Lab
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Stay updated with cutting-edge research and insights on AI agents, 
          blockchain technology, and the future of secure intelligent systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article 
            key={post.id}
            className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 backdrop-blur-sm text-purple-400 text-xs font-medium rounded-full">
                  {post.icon}
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-400">{post.date}</span>
                <span className="text-purple-400 text-xs px-2 py-1 bg-purple-400/10 rounded-full">{post.authorRole}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-400 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <a 
                  href="#" 
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium text-sm"
                >
                  Read Article
                  <ArrowRight size={16} className="ml-1" />
                </a>
                <span className="text-gray-500 text-sm">{post.author}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button secondary className="border-purple-500/20 hover:border-purple-500/40">View All Research</Button>
      </div>
    </Section>
  );
};