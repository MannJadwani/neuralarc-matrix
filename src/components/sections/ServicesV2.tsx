import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Brain, Cpu, Code, Database, Globe, Lock, ArrowUpRight, ChevronRight, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';

// Define service data
const services = [
  {
    id: 'ai-agents',
    title: 'AI Agents & Automation',
    shortDescription: 'Intelligent autonomous systems',
    description: 'Advanced AI agents that can perform complex tasks autonomously, automate workflows, and integrate with existing systems to enhance productivity and decision-making capabilities.',
    icon: Brain,
    color: 'purple',
    features: [
      'Autonomous Task Execution',
      'Workflow Automation',
      'Multi-agent Systems',
      'Conversational Interfaces',
      'Process Optimization'
    ],
    caseStudy: {
      title: 'Enterprise Automation Platform',
      result: '68% increase in operational efficiency'
    }
  },
  {
    id: 'ai-development',
    title: 'Enterprise AI Solutions',
    shortDescription: 'Custom AI for business challenges',
    description: 'Tailored artificial intelligence solutions leveraging machine learning, natural language processing, and neural networks to optimize operations, enhance customer experiences, and drive innovation.',
    icon: Cpu,
    color: 'blue',
    features: [
      'Deep Learning Models',
      'Natural Language Processing',
      'Predictive Analytics',
      'AI Strategy Consulting',
      'Neural Network Architecture'
    ],
    caseStudy: {
      title: 'Predictive Maintenance System',
      result: '47% reduction in equipment downtime'
    }
  },
  {
    id: 'research',
    title: 'Research & Knowledge Tools',
    shortDescription: 'AI-powered information retrieval',
    description: 'Sophisticated knowledge management systems that leverage AI to extract insights from data, automate research processes, and provide intelligent search capabilities across multiple information sources.',
    icon: Globe,
    color: 'teal',
    features: [
      'Document Intelligence',
      'Knowledge Mining',
      'Semantic Search',
      'Research Automation',
      'Data Synthesis'
    ],
    caseStudy: {
      title: 'Financial Research Platform',
      result: '78% faster market analysis'
    }
  },
  {
    id: 'custom',
    title: 'Custom Software',
    shortDescription: 'Bespoke AI-powered solutions',
    description: 'Tailored software solutions that integrate AI technologies to address your specific business needs, streamline operations, and create competitive advantages through intelligent automation.',
    icon: Code,
    color: 'pink',
    features: [
      'Enterprise Integration',
      'Legacy System Modernization',
      'Custom API Development',
      'Process Automation',
      'Data Pipeline Architecture'
    ],
    caseStudy: {
      title: 'Healthcare Records Management',
      result: '87% reduction in processing time'
    }
  },
  {
    id: 'vision',
    title: 'Computer Vision Systems',
    shortDescription: 'Visual intelligence for applications',
    description: 'Advanced computer vision solutions that enable machines to interpret and understand visual information from the world, powering applications from quality control to autonomous navigation.',
    icon: Database,
    color: 'cyan',
    features: [
      'Object Detection & Recognition',
      'Image Classification',
      'Video Analytics',
      'Visual Search',
      'AR/VR Integration'
    ],
    caseStudy: {
      title: 'Manufacturing Quality Inspection',
      result: '92% defect detection accuracy'
    }
  },
  {
    id: 'blockchain',
    title: 'Blockchain Integration',
    shortDescription: 'Secure data & transaction systems',
    description: 'Strategic blockchain implementation to complement AI systems with secure, transparent and immutable record-keeping, enabling trust in automated decision-making and data exchange.',
    icon: Lock,
    color: 'indigo',
    features: [
      'AI-Blockchain Hybrid Systems',
      'Smart Contract Automation',
      'Secure Data Exchange',
      'Transparent AI Decision Records',
      'Decentralized AI Governance'
    ],
    caseStudy: {
      title: 'Transparent AI Decision Platform',
      result: '100% auditability of AI actions'
    }
  }
];

const ServicesV2: React.FC = () => {
  const [activeService, setActiveService] = useState(services[0]);
  const [hovered, setHovered] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  // Helper function for color classes
  const getColorClass = (type: string, color: string): string => {
    const colorMap: Record<string, Record<string, string>> = {
      bg: {
        blue: 'bg-blue-500',
        indigo: 'bg-indigo-500',
        purple: 'bg-purple-500',
        cyan: 'bg-cyan-500',
        teal: 'bg-teal-500',
        pink: 'bg-pink-500'
      },
      bgLight: {
        blue: 'bg-blue-500/10',
        indigo: 'bg-indigo-500/10',
        purple: 'bg-purple-500/10',
        cyan: 'bg-cyan-500/10',
        teal: 'bg-teal-500/10',
        pink: 'bg-pink-500/10'
      },
      border: {
        blue: 'border-blue-500/20',
        indigo: 'border-indigo-500/20',
        purple: 'border-purple-500/20',
        cyan: 'border-cyan-500/20',
        teal: 'border-teal-500/20',
        pink: 'border-pink-500/20'
      },
      text: {
        blue: 'text-blue-500',
        indigo: 'text-indigo-500',
        purple: 'text-purple-500',
        cyan: 'text-cyan-500',
        teal: 'text-teal-500',
        pink: 'text-pink-500'
      },
      textLight: {
        blue: 'text-blue-400',
        indigo: 'text-indigo-400',
        purple: 'text-purple-400',
        cyan: 'text-cyan-400',
        teal: 'text-teal-400',
        pink: 'text-pink-400'
      },
      gradient: {
        blue: 'from-blue-500 to-indigo-600',
        indigo: 'from-indigo-500 to-purple-600',
        purple: 'from-purple-500 to-pink-600',
        cyan: 'from-cyan-500 to-blue-600',
        teal: 'from-teal-500 to-cyan-600',
        pink: 'from-pink-500 to-purple-600'
      }
    };
    
    return colorMap[type][color] || colorMap[type].blue;
  };
  
  return (
    <div id="services" ref={sectionRef} className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMyMDIwMjAiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBoLTYweiIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]"></div>
      
      <Container className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-purple-500/20 bg-purple-500/5">
            <span className="text-sm font-medium tracking-wide text-purple-400">OUR EXPERTISE</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Intelligent Solutions Powered by
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              AI & Blockchain Technologies
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg leading-relaxed md:text-xl max-w-3xl mx-auto">
            We combine cutting-edge AI and blockchain technologies to deliver secure, 
            intelligent solutions that transform businesses across industries.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-10 gap-8 items-start">
          {/* Services list - Left column on desktop */}
          <motion.div 
            className="lg:col-span-4 xl:col-span-3 space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setActiveService(service)}
                className={`relative cursor-pointer rounded-xl p-4 border transition-all duration-300 ${
                  activeService.id === service.id
                    ? `${getColorClass('border', service.color)} ${getColorClass('bgLight', service.color)}`
                    : 'border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                }`}
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.1 * index + 0.3
                }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    activeService.id === service.id
                      ? getColorClass('bgLight', service.color)
                      : 'bg-white/5'
                  }`}>
                    {React.createElement(service.icon, { 
                      size: 24,
                      className: activeService.id === service.id
                        ? getColorClass('text', service.color)
                        : 'text-gray-400'
                    })}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`font-medium ${
                        activeService.id === service.id
                          ? 'text-white'
                          : 'text-gray-200'
                      }`}>
                        {service.title}
                      </h3>
                      
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors ${
                        activeService.id === service.id || hovered === service.id
                          ? getColorClass('bg', service.color) + ' bg-opacity-20'
                          : 'bg-transparent'
                      }`}>
                        <ChevronRight size={14} className={
                          activeService.id === service.id
                            ? getColorClass('text', service.color)
                            : 'text-gray-500'
                        } />
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400">{service.shortDescription}</p>
                  </div>
                </div>
                
                {/* Active indicator */}
                {activeService.id === service.id && (
                  <motion.div 
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${getColorClass('bg', service.color)}`}
                    layoutId="activeServiceIndicator"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Service detail - Right column on desktop */}
          <div className="lg:col-span-6 xl:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Colorful top border */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${getColorClass('gradient', activeService.color)}`}></div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Main content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${getColorClass('bgLight', activeService.color)}`}>
                          {React.createElement(activeService.icon, { 
                            size: 32,
                            className: getColorClass('text', activeService.color)
                          })}
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{activeService.title}</h3>
                          <p className="text-gray-400">{activeService.shortDescription}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-8">
                        {activeService.description}
                      </p>
                      
                      {/* Features list */}
                      <div className="mb-8">
                        <h4 className="text-white font-medium mb-4">Key Capabilities</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {activeService.features.map((feature, idx) => (
                            <motion.div 
                              key={idx}
                              className="flex items-center gap-3"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className={`w-2 h-2 rounded-full ${getColorClass('bg', activeService.color)}`}></div>
                              <span className="text-gray-300">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* CTA button */}
                      <button className={`px-5 py-2.5 rounded-lg text-white font-medium transition-all flex items-center gap-2 bg-gradient-to-r ${getColorClass('gradient', activeService.color)} hover:shadow-lg hover:shadow-${activeService.color}-500/10`}>
                        Learn More
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                    
                    {/* Case study sidebar */}
                    <div className="md:w-72 shrink-0">
                      <div className={`rounded-xl border ${getColorClass('border', activeService.color)} p-5 bg-gray-900`}>
                        <h4 className="text-white font-medium mb-2">Case Study</h4>
                        <h5 className={`font-medium ${getColorClass('textLight', activeService.color)} mb-4`}>
                          {activeService.caseStudy.title}
                        </h5>
                        
                        <div className={`bg-gray-800 p-4 rounded-lg mb-4 border ${getColorClass('border', activeService.color)}`}>
                          <div className="text-gray-400 text-sm mb-1">Result</div>
                          <div className="text-white font-bold text-lg">{activeService.caseStudy.result}</div>
                        </div>
                        
                        <button className="w-full px-4 py-2 border border-white/10 rounded-lg text-white flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 transition-colors">
                          View Case Study
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ServicesV2; 