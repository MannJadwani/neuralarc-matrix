import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Container } from '../ui/Container';
import { ExternalLink, ArrowRight, Monitor, MoveUpRight, BarChart3, LucideIcon, Layers, ShieldCheck, Cpu, Brain, Zap, Database, Bot } from 'lucide-react';

// Project type definition
type Technology = 'ai-agents' | 'automation' | 'knowledge' | 'enterprise' | 'blockchain' | 'web3';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: Technology;
  tags: string[];
  caseStudyUrl: string;
  liveUrl?: string;
  client: string;
  icon: LucideIcon;
  stats: {
    label: string;
    value: string;
  }[];
}

// Project data
const projects: Project[] = [
  {
    id: 'fitness-ai',
    title: 'Fitness AI',
    description: 'AI-generated personalized fitness and nutrition plans that adapt to user progress, preferences, and health goals in real-time.',
    image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'ai-agents',
    tags: ['AI Agents', 'Personalization', 'Health Tech', 'Python'],
    caseStudyUrl: '#',
    liveUrl: '#',
    client: 'FitEvolution',
    icon: Zap,
    stats: [
      { label: 'User Retention', value: '86%' },
      { label: 'Goal Achievement', value: '73%' },
      { label: 'Development Time', value: '4 months' }
    ]
  },
  {
    id: 'document-ai',
    title: 'DocumentAI',
    description: 'Intelligent system for process recording, documentation automation, and guide creation that reduces manual documentation by 90%.',
    image: 'https://images.pexels.com/photos/7374/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'automation',
    tags: ['Process Automation', 'NLP', 'Documentation', 'React'],
    caseStudyUrl: '#',
    liveUrl: '#',
    client: 'DocuTech Systems',
    icon: Database,
    stats: [
      { label: 'Time Saved', value: '32 hrs/week' },
      { label: 'Accuracy', value: '96.5%' },
      { label: 'ROI', value: '318%' }
    ]
  },
  {
    id: 'dev-bridge',
    title: 'DevBridge',
    description: 'AI-powered collaboration platform that bridges the gap between developers and non-technical stakeholders through intelligent code interpretation.',
    image: 'https://images.pexels.com/photos/7173026/pexels-photo-7173026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'ai-agents',
    tags: ['AI Communication', 'Developer Tools', 'Collaboration', 'TypeScript'],
    caseStudyUrl: '#',
    liveUrl: '#',
    client: 'TechBridge Solutions',
    icon: Bot,
    stats: [
      { label: 'Project Delivery', value: '+40% faster' },
      { label: 'Meeting Time', value: '-65%' },
      { label: 'User Base', value: '12K+' }
    ]
  },
  {
    id: 'access-all-gpt',
    title: 'AccessAllGPT',
    description: 'Unified LLM access platform that provides consistent, secure, and optimized interactions with multiple AI models through a single interface.',
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'enterprise',
    tags: ['LLM Integration', 'API Gateway', 'Enterprise AI', 'Node.js'],
    caseStudyUrl: '#',
    liveUrl: '#',
    client: 'Global Innovations Inc.',
    icon: Brain,
    stats: [
      { label: 'API Calls', value: '50M+ daily' },
      { label: 'Cost Savings', value: '43%' },
      { label: 'Enterprise Users', value: '50+' }
    ]
  },
  {
    id: 'research-companion',
    title: 'Research Companion',
    description: 'Intelligent research assistant that aggregates, analyzes, and synthesizes information from multiple sources similar to Perplexity AI.',
    image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'knowledge',
    tags: ['Knowledge Management', 'Research Tools', 'Information Retrieval', 'Python'],
    caseStudyUrl: '#',
    client: 'Academic Innovations',
    icon: Layers,
    stats: [
      { label: 'Research Time', value: '-68%' },
      { label: 'Sources Analyzed', value: '1000+ per query' },
      { label: 'Accuracy', value: '94.2%' }
    ]
  },
  {
    id: 'nft-ticketing',
    title: 'NFT Ticketing Platform',
    description: 'Blockchain-based event ticketing solution on Solana that reduces fraud and enables new revenue streams through programmable tickets.',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'blockchain',
    tags: ['NFT', 'Solana', 'Event Tech', 'React'],
    caseStudyUrl: '#',
    client: 'EventChain',
    icon: ShieldCheck,
    stats: [
      { label: 'Fraud Reduction', value: '99.7%' },
      { label: 'Secondary Sales', value: '$1.2M' },
      { label: 'Events Hosted', value: '230+' }
    ]
  }
];

// Filter categories
const categories: {id: Technology | 'all', label: string}[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai-agents', label: 'AI Agents' },
  { id: 'automation', label: 'Automation' },
  { id: 'knowledge', label: 'Knowledge Tools' },
  { id: 'enterprise', label: 'Enterprise AI' },
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'web3', label: 'Web3 & DApps' }
];

// Main component
const PortfolioV2: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Technology | 'all'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Filter projects by category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  // Handle project click
  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
    setIsProjectModalOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  // Close project modal
  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <div id="portfolio" ref={sectionRef} className="relative py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMxYTFhMWEiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBoLTYweiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Subtle gradient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]"></div>
      
      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-purple-500/20 bg-purple-500/5">
            <span className="text-sm font-medium tracking-wide text-purple-400">OUR AI PROJECTS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Innovative Solutions with
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              AI & Blockchain Technologies
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg leading-relaxed md:text-xl">
            Explore our portfolio of AI and blockchain-powered systems that have 
            transformed operations and delivered exceptional outcomes across industries.
          </p>
        </motion.div>
        
        {/* Category Filter */}
        <div className="mb-12">
          <motion.div 
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-gray-400 text-lg">No projects found in this category.</p>
              </motion.div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layoutId={`project-card-${project.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 cursor-pointer">
                    {/* Project Image with overlay */}
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10"></div>
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Category tag */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-md text-purple-400 text-xs font-medium">
                          <project.icon size={12} />
                          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                        </span>
                      </div>
                      
                      {/* Client badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs">
                          {project.client}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* View details button */}
                      <div className="flex items-center gap-2 text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                        View Case Study
                        <div className="w-5 h-5 rounded-full bg-purple-400/10 flex items-center justify-center group-hover:bg-purple-400/20 transition-colors">
                          <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover overlay with stats */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray
                    -900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {project.stats.map((stat, idx) => (
                          <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-lg p-2 text-center">
                            <div className="text-white font-bold text-lg">{stat.value}</div>
                            <div className="text-gray-400 text-xs">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      
                      <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        Explore Case Study
                        <MoveUpRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        
        {/* Load More Button */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center gap-2 mx-auto">
            View All Projects
            <ArrowRight size={16} className="text-purple-400" />
          </button>
        </motion.div>
      </Container>
      
      {/* Project Modal */}
      <AnimatePresence>
        {isProjectModalOpen && activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProjectModal}
            />
            
            {/* Modal Content */}
            <motion.div
              layoutId={`project-card-${activeProject.id}`}
              className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl overflow-hidden w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl"
            >
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                onClick={closeProjectModal}
              >
                ✕
              </button>
              
              {/* Project Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-10"></div>
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Project title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-md text-purple-400 text-xs font-medium">
                      <activeProject.icon size={12} />
                      {activeProject.category.charAt(0).toUpperCase() + activeProject.category.slice(1)}
                    </span>
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs">
                      {activeProject.client}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{activeProject.title}</h2>
                </div>
              </div>
              
              {/* Project details */}
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-white mb-4">Overview</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {activeProject.description}
                      <br /><br />
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.
                    </p>
                    
                    <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {activeProject.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="text-sm px-3 py-1 rounded-full bg-purple-900/20 text-purple-400 border border-purple-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href={activeProject.caseStudyUrl} 
                        className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium flex items-center gap-2"
                      >
                        Full Case Study
                        <ExternalLink size={16} />
                      </a>
                      
                      {activeProject.liveUrl && (
                        <a 
                          href={activeProject.liveUrl} 
                          className="px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
                        >
                          View Live Project
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Project Results</h3>
                      
                      <div className="space-y-4 mb-6">
                        {activeProject.stats.map((stat, idx) => (
                          <div key={idx} className="bg-white/5 rounded-lg p-4">
                            <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                            <div className="text-white font-bold text-xl">{stat.value}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-white font-medium mb-3">Client</h4>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                            {activeProject.icon && <activeProject.icon size={20} className="text-purple-400" />}
                          </div>
                          <div className="text-gray-300">{activeProject.client}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioV2; 