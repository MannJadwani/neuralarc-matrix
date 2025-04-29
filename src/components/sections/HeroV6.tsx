import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, ExternalLink, Shield, Zap, Code, Database, Lock, Globe, BarChart3, Brain, Bot, Network, Cpu, Workflow } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export const HeroV6: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // For card tilt effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Transform values for perspective effect
  const transformZ = useTransform(
    [rotateX, rotateY],
    ([latestRotateX, latestRotateY]) => {
      return `perspective(2000px) rotateX(${latestRotateX}deg) rotateY(${latestRotateY}deg)`;
    }
  );
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position
    const rotateXValue = (mouseY / height) * 10; // 10 degree max rotation
    const rotateYValue = (mouseX / width) * -10; // 10 degree max rotation
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
    
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };
  
  const tabs = [
    {
      title: "AI Agents",
      icon: Bot,
      description: "Intelligent autonomous agents that learn, adapt, and execute complex tasks with human-like understanding."
    },
    {
      title: "Blockchain",
      icon: Network,
      description: "Secure, scalable blockchain infrastructure with smart contracts and decentralized applications."
    },
    {
      title: "Automation",
      icon: Workflow,
      description: "End-to-end process automation powered by AI and blockchain for seamless operations."
    },
    {
      title: "Analytics",
      icon: BarChart3,
      description: "Advanced AI-driven analytics and insights for data-driven decision making."
    }
  ];
  
  // Floating widgets data
  const floatingWidgets = [
    { icon: Bot, color: "bg-blue-500/80", delay: 0 },
    { icon: Network, color: "bg-indigo-500/80", delay: 0.5 },
    { icon: Cpu, color: "bg-purple-500/80", delay: 1 },
    { icon: Brain, color: "bg-cyan-500/80", delay: 1.5 },
  ];
  
  useEffect(() => {
    // Auto-rotate tabs every 4 seconds
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % tabs.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [tabs.length]);
  
  return (
    <section 
      id="home" 
      className="relative bg-gradient-to-b from-black to-gray-900 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMyMDIwMjAiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBoLTYweiIvPjwvZz48L3N2Zz4=')] opacity-30"
        aria-hidden="true"
      ></div>
      
      {/* Enhanced gradient accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 blur-[100px] rounded-full animate-pulse-slow" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-500/10 blur-[100px] rounded-full animate-pulse-slow" aria-hidden="true"></div>
      <div className="absolute top-1/3 left-1/4 w-1/5 h-1/5 bg-purple-500/5 blur-[80px] rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} aria-hidden="true"></div>
      
      <Container className="relative z-10">
        <div className="min-h-screen flex flex-col justify-center py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left column */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="inline-flex px-3 py-1 mb-6 rounded-full border border-blue-500/20 bg-blue-500/5">
                    <span className="text-xs font-medium tracking-wide text-blue-400">NEURALARC MATRIX</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                    <span className="text-white">Next-Gen</span>
                    <br />
                    <motion.span 
                      className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent inline-block"
                      animate={{ 
                        backgroundPosition: ['0% center', '100% center'],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }}
                      style={{ 
                        backgroundSize: '200% 100%'
                      }}
                    >
                      AI & Blockchain
                    </motion.span>
                  </h1>
                  
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
                    Transform your business with intelligent AI agents and secure blockchain solutions. We combine cutting-edge AI with enterprise-grade blockchain technology to deliver next-generation digital transformation.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 items-center mb-16">
                    <a href="#contact" className="flex items-center" aria-label="Get Started">
                      <Button primary className="px-6 py-3 group">
                        Get Started
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                          aria-hidden="true"
                        >
                          <ArrowRight className="size-4" />
                        </motion.div>
                      </Button>
                    </a>
                    
                    <Button secondary outlined className="px-6 py-3 group">
                      <a href="#contact" className="flex items-center" aria-label="Get Demo">
                        Get Demo
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                          aria-hidden="true"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </a>
                    </Button>
                  </div>
                  
                  {/* Stats with animation */}
                  <div className="grid grid-cols-3 gap-4 mb-8" role="list" aria-label="Key statistics">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
                      className="border border-white/5 rounded-lg p-4 bg-white/5 backdrop-blur-sm transition-all duration-300"
                      role="listitem"
                    >
                      <motion.div 
                        className="text-3xl font-bold text-white mb-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        50+
                      </motion.div>
                      <div className="text-sm text-gray-400">AI Agents Deployed</div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.1)" }}
                      className="border border-white/5 rounded-lg p-4 bg-white/5 backdrop-blur-sm transition-all duration-300"
                      role="listitem"
                    >
                      <motion.div 
                        className="text-3xl font-bold text-white mb-1"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
                      >
                        10K+
                      </motion.div>
                      <div className="text-sm text-gray-400">Transactions/sec</div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.1)" }}
                      className="border border-white/5 rounded-lg p-4 bg-white/5 backdrop-blur-sm transition-all duration-300"
                      role="listitem"
                    >
                      <motion.div 
                        className="text-3xl font-bold text-white mb-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        95%
                      </motion.div>
                      <div className="text-sm text-gray-400">AI Accuracy</div>
                    </motion.div>
                  </div>
                  
                  {/* Client logos */}
                  <div>
                    <div className="text-sm text-gray-500 mb-3">Trusted by industry leaders</div>
                    <div className="flex space-x-6 items-center">
                      {[1, 2, 3, 4].map((_, i) => (
                        <motion.div 
                          key={i} 
                          className="h-8 w-20 bg-white/5 hover:bg-white/10 rounded transition-all duration-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + (i * 0.1) }}
                          whileHover={{ scale: 1.05 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Enhanced Right column with 3D effects */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative"
              >
                {/* Floating widgets */}
                {floatingWidgets.map((widget, i) => (
                  <motion.div
                    key={i}
                    className={`absolute z-20 w-10 h-10 ${widget.color} rounded-lg shadow-lg flex items-center justify-center`}
                    style={{ 
                      top: `${15 + (i * 20)}%`, 
                      left: i % 2 === 0 ? '-5%' : '95%',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: [0, 1, 1, 0], 
                      y: [20, 0, 0, -20],
                      x: i % 2 === 0 ? [0, 15, 15, 30] : [0, -15, -15, -30], 
                    }}
                    transition={{ 
                      duration: 7, 
                      repeat: Infinity, 
                      delay: widget.delay,
                      times: [0, 0.1, 0.9, 1] 
                    }}
                  >
                    <widget.icon className="text-white w-5 h-5" />
                  </motion.div>
                ))}
                
                {/* Animated connection lines */}
                <svg className="absolute inset-0 z-10 w-full h-full">
                  {floatingWidgets.map((_, i) => (
                    <motion.path
                      key={i}
                      d={`M ${50 + (i % 2 === 0 ? -30 : 30)} ${120 + (i * 60)} Q ${i % 2 === 0 ? 150 : 250} ${150 + (i * 20)}, ${220} ${190}`}
                      stroke="url(#blue-gradient)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: [0, 1, 1, 0], 
                        opacity: [0, 0.6, 0.6, 0] 
                      }}
                      transition={{ 
                        duration: 7, 
                        repeat: Infinity, 
                        delay: 0.2 * i,
                        times: [0, 0.3, 0.7, 1]
                      }}
                    />
                  ))}
                  <defs>
                    <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                      <stop offset="100%" stopColor="rgba(99, 102, 241, 0.2)" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Main 3D card with tilt effect */}
                <motion.div
                  ref={cardRef}
                  style={{ transform: transformZ }}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={handleMouseLeave}
                  className="relative z-10 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl transition-all duration-300"
                  whileHover={{ boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)" }}
                >
                  {/* Ambient glow on hover */}
                  {isHovered && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  
                  {/* Tabs header */}
                  <div className="flex border-b border-white/10">
                    {tabs.map((tab, index) => (
                      <button
                        key={tab.title}
                        onClick={() => setActiveTab(index)}
                        className={`relative flex items-center justify-center px-4 py-3 flex-1 text-sm font-medium transition-all ${
                          activeTab === index
                            ? 'text-blue-400 bg-white/5'
                            : 'text-gray-400 hover:text-gray-300 hover:bg-white/[0.02]'
                        }`}
                      >
                        <tab.icon className="w-4 h-4 mr-2" />
                        {tab.title}
                        {activeTab === index && (
                          <motion.div
                            layoutId="activeTabIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                            initial={false}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Tab content with enhanced visuals */}
                  <div className="bg-gradient-to-br from-gray-900 to-black">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="p-6 relative"
                      >
                        {/* Tab-specific accent light */}
                        <motion.div 
                          className={`absolute ${
                            activeTab === 0 ? 'top-0 right-0 bg-blue-500/10' : 
                            activeTab === 1 ? 'bottom-0 left-0 bg-indigo-500/10' : 
                            activeTab === 2 ? 'top-0 left-0 bg-purple-500/10' : 
                            'bottom-0 right-0 bg-cyan-500/10'
                          } w-32 h-32 rounded-full blur-xl opacity-50 pointer-events-none`}
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        
                        <div className="flex items-start mb-4">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mr-4 backdrop-blur-sm">
                            <motion.div
                              animate={{ 
                                rotate: [0, 5, 0, -5, 0],
                              }}
                              transition={{ 
                                duration: 5, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              {React.createElement(tabs[activeTab].icon, { className: "text-blue-400", size: 20 })}
                            </motion.div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">{tabs[activeTab].title}</h3>
                            <p className="text-gray-400 text-sm">{tabs[activeTab].description}</p>
                          </div>
                        </div>
                        
                        {/* Enhanced code sample with 3D effect */}
                        <motion.div 
                          className="rounded-lg overflow-hidden bg-gray-950 border border-white/5 font-mono text-sm p-4 text-gray-300 relative"
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center border-b border-white/5 pb-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50 mr-2"></div>
                            <div className="text-gray-500 text-xs ml-2">Terminal</div>
                          </div>
                          <div className="text-green-400">$ neuralarc init project</div>
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400"
                          >
                            ✓ Initializing AI agent...
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-400"
                          >
                            ✓ Setting up blockchain node...
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-gray-400"
                          >
                            ✓ Configuring smart contracts...
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-white"
                          >
                            ✓ Project ready! Happy building!
                          </motion.div>
                          
                          {/* Floating cursor effect */}
                          <motion.div 
                            className="w-2 h-5 bg-white/50 absolute"
                            animate={{ 
                              opacity: [1, 0, 1],
                              bottom: ['55%', '15%']
                            }}
                            transition={{ 
                              opacity: { repeat: Infinity, duration: 0.8 },
                              bottom: { duration: 2 }
                            }}
                            style={{ left: '190px' }}
                          />
                        </motion.div>
                        
                        {/* Feature highlights with animation */}
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.div 
                              key={i} 
                              className="flex items-center"
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 * i }}
                              whileHover={{ x: 2 }}
                            >
                              <motion.div 
                                className="w-1 h-1 bg-blue-500 rounded-full mr-2"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                              />
                              <div className="text-xs text-gray-400">
                                {activeTab === 0 ? "Intelligent" : 
                                 activeTab === 1 ? "Secure" : 
                                 activeTab === 2 ? "Automated" : "Analytical"} Feature {i}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
                
                {/* Improved decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-80 rounded-full bg-blue-500/5 blur-xl -z-10 animate-pulse-slow"></div>
                <div className="absolute top-1/2 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-xl -z-10 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                
                {/* Additional floating elements */}
                <motion.div
                  className="absolute bottom-10 left-10 w-5 h-5 rounded-full bg-blue-500/40 -z-5"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute top-10 right-10 w-3 h-3 rounded-full bg-purple-500/40 -z-5"
                  animate={{ 
                    y: [0, -15, 0],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                <motion.div
                  className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-indigo-500/40 -z-5"
                  animate={{ 
                    y: [0, -12, 0],
                    x: [0, 5, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.a 
              href="#services"
              className="flex flex-col items-center text-gray-500 hover:text-blue-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              <span className="text-xs mb-2">Scroll to explore</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                animate={{ y: [0, 3, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <polyline points="7 13 12 18 17 13"></polyline>
                <polyline points="7 6 12 11 17 6"></polyline>
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </Container>
      
      {/* Add CSS animation classes */}
      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.7; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 5s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
}; 