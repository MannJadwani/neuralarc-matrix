import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronRight, Brain, Bot, Zap, ArrowUpRight, Database } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

interface FeaturePoint {
  id: number;
  title: string;
  description: string;
}

const features: FeaturePoint[] = [
  {
    id: 1,
    title: "AI Agents & Automation",
    description: "Intelligent autonomous systems that handle complex tasks with minimal supervision"
  },
  {
    id: 2,
    title: "Enterprise AI Solutions",
    description: "Custom AI systems built to address your specific business challenges"
  },
  {
    id: 3,
    title: "Knowledge & Research Tools",
    description: "AI-powered systems that enhance information discovery and analysis"
  },
  {
    id: 4,
    title: "Blockchain Integration",
    description: "Secure data infrastructure to complement and enhance AI capabilities"
  }
];

const projects = [
  {
    name: "Fitness AI",
    description: "Personalized health optimization",
    icon: <Zap size={20} className="text-orange-400" />
  },
  {
    name: "DocumentAI",
    description: "Intelligent documentation assistant",
    icon: <Database size={20} className="text-blue-400" />
  },
  {
    name: "DevBridge",
    description: "AI-powered developer collaboration",
    icon: <Bot size={20} className="text-green-400" />
  },
  {
    name: "AccessAllGPT",
    description: "Unified AI interaction platform",
    icon: <Brain size={20} className="text-purple-400" />
  }
];

export const HeroV7: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Set loaded state after initial animations
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div id="home" className="relative min-h-screen bg-black overflow-hidden">
      {/* Background dots pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Curved gradient border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      {/* Gradient accents */}
      <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[120px] opacity-50"></div>
      <div className="absolute bottom-20 right-20 w-[400px] h-[400px] rounded-full bg-blue-900/20 blur-[100px] opacity-40"></div>
      
      <Container className="relative z-10">
        <div className="min-h-screen flex flex-col justify-center py-12">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left column - Text content */}
            <div className="lg:col-span-6 lg:pr-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20">
                  <Sparkles size={14} className="text-purple-400 mr-2" />
                  <span className="text-xs font-medium text-purple-400">INTELLIGENT AUTONOMOUS SYSTEMS</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-white">AI Agents That</span>
                    <span className="text-white">Transform Your</span>
                    
                    <div className="h-[calc(1em+0.2rem)] overflow-hidden relative">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={activeFeature}
                          initial={{ y: 60, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -60, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
                        >
                          {activeFeature === 0 ? "Workflows" : activeFeature === 1 ? "Business" : activeFeature === 2 ? "Knowledge" : "Security"}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </h1>
                
                <p className="text-gray-300 text-lg max-w-lg mb-8">
                  We create intelligent AI agents that automate complex tasks, unlock hidden insights, and drive innovation—all while maintaining industry-leading security.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-16">
                  <Button primary className="px-6 py-3">
                    <span className="flex items-center">
                      Explore AI Solutions
                      <ArrowRight size={16} className="ml-2" />
                    </span>
                  </Button>
                  
                  <Button secondary outlined className="px-6 py-3">
                    <span className="flex items-center">
                      View Case Studies
                    </span>
                  </Button>
                </div>
                
                {/* Feature points with indicators */}
                <div className="space-y-4 max-w-lg">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        activeFeature === index 
                          ? 'bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20' 
                          : 'hover:bg-white/5'
                      }`}
                      onClick={() => setActiveFeature(index)}
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`relative flex-shrink-0 w-12 h-12 rounded-lg ${
                          activeFeature === index 
                            ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20' 
                            : 'bg-white/5'
                        } flex items-center justify-center`}>
                          {activeFeature === index && (
                            <motion.div
                              layoutId="featureHighlight"
                              className="absolute inset-0 rounded-lg border border-purple-500/30"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                          <span className={`text-xl font-bold ${
                            activeFeature === index ? 'text-purple-400' : 'text-gray-400'
                          }`}>0{index + 1}</span>
                        </div>
                        
                        <div>
                          <h3 className={`font-semibold ${activeFeature === index ? 'text-white' : 'text-gray-300'}`}>
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-400">{feature.description}</p>
                        </div>
                        
                        {activeFeature === index && (
                          <div className="ml-auto">
                            <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                              <ChevronRight size={14} className="text-purple-400" />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Right column - AI visualization */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* AI network platform */}
                <div className="relative w-full aspect-square max-w-xl mx-auto">
                  {/* Platform base */}
                  <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="absolute inset-x-0 bottom-[5%] z-0 w-4/5 mx-auto h-[30%] bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl rounded-2xl border border-white/10 transform rotate-x-60 skew-y-12 translate-y-1/2"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Platform grid lines */}
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </motion.div>
                  
                  {/* AI project nodes */}
                  {projects.map((project, index) => {
                    // Position variables for the different nodes
                    const positions = [
                      { left: '10%', bottom: '30%', width: '25%', delay: 0.6, duration: 2 },
                      { left: '40%', bottom: '35%', width: '30%', delay: 0.7, duration: 2.5 },
                      { right: '10%', bottom: '25%', width: '22%', delay: 0.8, duration: 3 },
                      { left: '20%', bottom: '20%', width: '20%', delay: 0.9, duration: 2.8 }
                    ];
                    
                    const pos = positions[index % positions.length];
                    
                    return (
                      <motion.div 
                        key={project.name}
                        className="absolute z-10"
                        style={{
                          left: pos.left,
                          right: pos.right,
                          bottom: pos.bottom,
                          width: pos.width,
                          aspectRatio: '1'
                        }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: isLoaded ? [0, -8 - (index * 2), 0] : 0, opacity: 1 }}
                        transition={{ 
                          y: { 
                            delay: pos.delay, 
                            duration: pos.duration, 
                            repeat: Infinity, 
                            repeatType: 'reverse' 
                          },
                          opacity: { duration: 0.8, delay: pos.delay }
                        }}
                      >
                        <div className="relative transform rotate-x-50 skew-y-12 h-full" style={{ transformStyle: 'preserve-3d' }}>
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-800/30 rounded-xl backdrop-blur-sm border border-purple-500/20 shadow-xl p-4">
                            <div>{project.icon}</div>
                            <div className="text-sm font-medium text-white mt-1">{project.name}</div>
                            <div className="text-xs text-gray-400 mt-1">{project.description}</div>
                            <div className="flex items-center gap-1 mt-2">
                              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                              <div className="w-12 h-1 bg-purple-400/30 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  
                  {/* AI Brain/Central Node */}
                  <motion.div 
                    className="absolute left-1/2 bottom-[35%] w-[15%] aspect-square z-20 -translate-x-1/2"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: isLoaded ? [0, -15, 0] : 0, opacity: 1 }}
                    transition={{ 
                      y: { 
                        delay: 1, 
                        duration: 3, 
                        repeat: Infinity, 
                        repeatType: 'reverse' 
                      },
                      opacity: { duration: 0.8, delay: 1 }
                    }}
                  >
                    <div className="relative transform rotate-x-50 skew-y-12 h-full" style={{ transformStyle: 'preserve-3d' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-blue-500/40 rounded-full backdrop-blur-sm border border-purple-400/30 shadow-xl flex items-center justify-center">
                        <Brain size={24} className="text-white" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Connecting lines using SVG */}
                  <svg className="absolute inset-0 w-full h-full z-0" style={{ transform: 'translateZ(-10px)' }}>
                    {/* Lines connecting to central brain */}
                    <motion.line 
                      x1="25%" y1="70%" x2="50%" y2="65%" 
                      stroke="url(#purple-gradient)" 
                      strokeWidth="1" 
                      strokeDasharray="5,5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ delay: 1 }}
                    />
                    <motion.line 
                      x1="55%" y1="65%" x2="70%" y2="75%" 
                      stroke="url(#purple-gradient)" 
                      strokeWidth="1" 
                      strokeDasharray="5,5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ delay: 1.2 }}
                    />
                    <motion.line 
                      x1="35%" y1="65%" x2="20%" y2="80%" 
                      stroke="url(#purple-gradient)" 
                      strokeWidth="1" 
                      strokeDasharray="5,5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ delay: 1.3 }}
                    />
                    <motion.line 
                      x1="65%" y1="65%" x2="50%" y2="65%" 
                      stroke="url(#purple-gradient)" 
                      strokeWidth="1" 
                      strokeDasharray="5,5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ delay: 1.4 }}
                    />
                    <defs>
                      <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.5)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Neural network particles */}
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-purple-400"
                      initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 30 + 60 + '%',
                        opacity: 0
                      }}
                      animate={{
                        y: ['-10%', '-30%'],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>
                
                {/* Technology callout */}
                <motion.div
                  className="absolute -bottom-6 right-0 z-40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <a href="#services" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-md border border-purple-500/20 text-sm text-white hover:border-purple-400/40 transition-colors">
                    See Our AI Portfolio
                    <ArrowUpRight size={14} className="text-purple-400" />
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
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