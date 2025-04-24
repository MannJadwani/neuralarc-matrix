import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  image: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Decentralized Finance: Trends to Watch',
    excerpt: 'Explore the emerging trends in DeFi that are reshaping the financial landscape and creating new opportunities.',
    date: 'May 15, 2025',
    author: 'Alex Morgan',
    authorRole: 'Blockchain Specialist',
    category: 'Blockchain',
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'How AI is Transforming Software Development Practices',
    excerpt: 'Discover how artificial intelligence is changing the way developers build, test, and deploy software applications.',
    date: 'May 8, 2025',
    author: 'Jamie Chen',
    authorRole: 'AI Researcher',
    category: 'Artificial Intelligence',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Building Secure Smart Contracts: Best Practices',
    excerpt: 'Learn the essential security considerations and best practices for developing robust smart contracts.',
    date: 'April 28, 2025',
    author: 'Michael Wilson',
    authorRole: 'Security Expert',
    category: 'Blockchain',
    image: 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const Blog: React.FC = () => {
  return (
    <Section id="blog" dark>
      <div className="text-center mb-16">
        <p className="text-blue-400 font-medium mb-2 tracking-wider">INSIGHTS & NEWS</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Latest From Our Blog
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Stay updated with the latest trends and insights in blockchain technology, 
          artificial intelligence, and web development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article 
            key={post.id}
            className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-3 py-1 bg-blue-500/20 backdrop-blur-sm text-blue-400 text-xs font-medium rounded-full">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center text-sm text-gray-400 mb-3">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-400 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <a 
                href="#" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm"
              >
                Read More
                <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button secondary>View All Articles</Button>
      </div>
    </Section>
  );
};