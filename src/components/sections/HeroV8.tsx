import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, ArrowRight, Cpu, Database, Network, Lock, LineChart, MessageSquareText, Link2, LinkIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

// Define technologies to be displayed in orbiting nodes
const technologies = [
  { name: 'Machine Learning', icon: <BrainCircuit className="w-5 h-5" />, type: 'ai' },
  { name: 'Neural Networks', icon: <Network className="w-5 h-5" />, type: 'ai' },
  { name: 'Data Processing', icon: <Database className="w-5 h-5" />, type: 'ai' },
  { name: 'Secure AI', icon: <Lock className="w-5 h-5" />, type: 'ai' },
  { name: 'Smart Contracts', icon: <Link2 className="w-5 h-5" />, type: 'blockchain' },
  { name: 'Decentralized Apps', icon: <LinkIcon className="w-5 h-5" />, type: 'blockchain' },
  { name: 'Edge Computing', icon: <Cpu className="w-5 h-5" />, type: 'ai' },
];

export const HeroV8: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Rotate through technology tags
    const interval = setInterval(() => {
      setActiveTagIndex(prev => (prev + 1) % technologies.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate positions for orbiting nodes
  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 150;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        delay: 0.3,
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div id="home" className="relative min-h-screen bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[120px] opacity-40"></div>
      <div className="absolute bottom-20 right-20 w-[400px] h-[400px] rounded-full bg-blue-900/20 blur-[100px] opacity-30"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <Container className="relative z-10">
        <div className="min-h-screen flex flex-col justify-center py-12">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            ref={containerRef}
          >
            {/* Left Column: Content */}
            <div className="flex flex-col space-y-6">
              <motion.div variants={textVariants} className="space-y-2">
                <motion.div 
                  className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
                  </span>
                  <span className="text-xs font-medium text-purple-400">AI & BLOCKCHAIN SOLUTIONS</span>
                </motion.div>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                  variants={textVariants}
                >
                  <span className="text-white">Transform Your Business With </span>
                  <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Dual Innovation</span>
                </motion.h1>
              </motion.div>
              
              <motion.p 
                className="text-gray-300 text-lg max-w-xl mb-4"
                variants={textVariants}
              >
                Harness the combined power of AI and blockchain technologies to optimize workflows, enhance security, and create truly innovative solutions for your business challenges.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 mb-8"
                variants={textVariants}
              >
                <Button primary className="px-6 py-3">
                  <span className="flex items-center">
                    Explore Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
                
                <Button secondary outlined className="px-6 py-3">
                  <span className="flex items-center">
                    View Case Studies
                  </span>
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-2 mt-6"
                variants={textVariants}
              >
                {technologies.map((tech, index) => (
                  <div 
                    key={tech.name} 
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors border ${
                      activeTagIndex === index 
                        ? tech.type === 'blockchain' 
                          ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                          : 'bg-purple-500/10 border-purple-500/20 text-purple-400' 
                        : 'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    <span className={activeTagIndex === index ? 'opacity-100' : 'opacity-70'}>
                      {tech.icon}
                    </span>
                    {tech.name}
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Right Column: Visual Elements */}
            <div className="relative h-[400px] md:h-[500px]">
              {/* Center brain node */}
              <motion.div 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 backdrop-blur-sm border border-purple-400/30 flex items-center justify-center z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  boxShadow: ['0 0 0px rgba(168, 85, 247, 0.2)', '0 0 30px rgba(168, 85, 247, 0.3)', '0 0 0px rgba(168, 85, 247, 0.2)']
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5,
                  boxShadow: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }
                }}
              >
                <BrainCircuit className="text-white w-10 h-10" />
              </motion.div>
              
              {/* Orbiting nodes */}
              {technologies.map((tech, index) => {
                const position = getNodePosition(index, technologies.length);
                return (
                  <motion.div
                    key={tech.name}
                    className={`absolute left-1/2 top-1/2 w-14 h-14 rounded-full backdrop-blur-sm border flex items-center justify-center
                    ${tech.type === 'blockchain' 
                      ? 'bg-gradient-to-br from-blue-500/20 to-blue-800/30 border-blue-400/20' 
                      : 'bg-gradient-to-br from-purple-600/20 to-blue-800/30 border-purple-500/20'}`}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 1,
                      x: position.x, 
                      y: position.y,
                      scale: activeTagIndex === index ? 1.2 : 1,
                      boxShadow: activeTagIndex === index 
                        ? tech.type === 'blockchain' 
                          ? '0 0 15px rgba(59, 130, 246, 0.4)' 
                          : '0 0 15px rgba(168, 85, 247, 0.4)' 
                        : 'none',
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.8 + (index * 0.1)
                    }}
                  >
                    <div className="text-white">
                      {tech.icon}
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full z-0">
                {technologies.map((tech, index) => {
                  const position = getNodePosition(index, technologies.length);
                  return (
                    <motion.line
                      key={`line-${index}`}
                      x1="50%"
                      y1="50%"
                      x2={`calc(50% + ${position.x}px)`}
                      y2={`calc(50% + ${position.y}px)`}
                      stroke={tech.type === 'blockchain' ? "rgba(59, 130, 246, 0.5)" : "rgba(168, 85, 247, 0.5)"}
                      strokeWidth={activeTagIndex === index ? 2 : 1}
                      strokeDasharray={activeTagIndex === index ? "0" : "5,5"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeTagIndex === index ? 0.8 : 0.4 }}
                      transition={{ duration: 1, delay: 1 + (index * 0.1) }}
                    />
                  );
                })}
              </svg>
              
              {/* Particles */}
              {[...Array(20)].map((_, i) => {
                const techIndex = i % technologies.length;
                const tech = technologies[techIndex];
                const position = getNodePosition(techIndex, technologies.length);
                const scale = Math.random() * 0.5 + 0.5;
                return (
                  <motion.div
                    key={`particle-${i}`}
                    className={`absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full ${
                      tech.type === 'blockchain' ? 'bg-blue-400' : 'bg-purple-400'
                    }`}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 0 
                    }}
                    animate={{ 
                      x: [0, position.x * scale], 
                      y: [0, position.y * scale],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "linear"
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <a
          href="#services"
          className="flex flex-col items-center text-gray-500 hover:text-purple-400 transition-colors"
        >
          <span className="text-xs mb-2">Scroll to Explore</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
};

export default HeroV8; 