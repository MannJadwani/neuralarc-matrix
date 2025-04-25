import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, Layers, Zap, Shield, Target } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export const HeroV5: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  
  const features = [
    {
      title: "Blockchain Solutions",
      description: "Enterprise-grade blockchain infrastructure built for security and scalability.",
      icon: Shield,
      color: "blue"
    },
    {
      title: "AI Integration",
      description: "Powerful machine learning models that adapt to your business needs.",
      icon: Zap,
      color: "indigo"
    },
    {
      title: "Web3 Development",
      description: "Build decentralized applications with our comprehensive toolset.",
      icon: Layers,
      color: "purple"
    },
    {
      title: "Strategic Innovation",
      description: "Tailored digital solutions to transform your industry position.",
      icon: Target,
      color: "cyan"
    }
  ];
  
  useEffect(() => {
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    let nodes: CircuitNode[] = [];
    let connections: Connection[] = [];
    
    // Set up canvas dimensions
    const resize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initCircuit();
      }
    };
    
    class CircuitNode {
      x: number;
      y: number;
      radius: number;
      color: string;
      pulseRadius: number;
      maxPulseRadius: number;
      isPulsing: boolean;
      pulseOpacity: number;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.color = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})`;
        this.pulseRadius = 0;
        this.maxPulseRadius = 40;
        this.isPulsing = false;
        this.pulseOpacity = 0.5;
      }
      
      startPulse() {
        this.isPulsing = true;
        this.pulseRadius = 0;
        this.pulseOpacity = 0.5;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        // Draw node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Draw pulse effect
        if (this.isPulsing) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(59, 130, 246, ${this.pulseOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Update pulse
          this.pulseRadius += 1;
          this.pulseOpacity -= 0.01;
          
          if (this.pulseRadius > this.maxPulseRadius) {
            this.isPulsing = false;
          }
        }
      }
    }
    
    class Connection {
      from: CircuitNode;
      to: CircuitNode;
      progress: number;
      speed: number;
      width: number;
      color: string;
      
      constructor(from: CircuitNode, to: CircuitNode) {
        this.from = from;
        this.to = to;
        this.progress = 0;
        this.speed = Math.random() * 0.004 + 0.001;
        this.width = Math.random() * 1 + 0.5;
        this.color = `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        const dx = this.to.x - this.from.x;
        const dy = this.to.y - this.from.y;
        const endX = this.from.x + dx * this.progress;
        const endY = this.from.y + dy * this.progress;
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(this.from.x, this.from.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();
        
        // Update progress
        this.progress += this.speed;
        
        // If line completed, reset
        if (this.progress >= 1) {
          this.to.startPulse();
          this.progress = 0;
        }
      }
    }
    
    const initCircuit = () => {
      nodes = [];
      connections = [];
      
      // Create circuit pattern - grid with some randomness
      const gridSize = 60;
      const cols = Math.floor(canvas.width / gridSize);
      const rows = Math.floor(canvas.height / gridSize);
      
      // Create grid of nodes with slight position randomness
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Skip some nodes randomly
          if (Math.random() > 0.7) continue;
          
          const x = i * gridSize + Math.random() * 15 - 7.5;
          const y = j * gridSize + Math.random() * 15 - 7.5;
          
          nodes.push(new CircuitNode(x, y));
        }
      }
      
      // Create connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only connect nodes that are close enough
          if (distance < gridSize * 1.5) {
            // Randomly decide direction of connection
            if (Math.random() > 0.5) {
              connections.push(new Connection(nodes[i], nodes[j]));
            } else {
              connections.push(new Connection(nodes[j], nodes[i]));
            }
          }
        }
      }
      
      // Start some random pulses
      for (let i = 0; i < Math.min(5, nodes.length); i++) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        randomNode.startPulse();
      }
    };
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with semi-transparent background to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      connections.forEach(connection => connection.draw(ctx));
      
      // Draw nodes
      nodes.forEach(node => node.draw(ctx));
      
      // Random new pulse
      if (Math.random() > 0.99 && nodes.length > 0) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        randomNode.startPulse();
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', resize);
    resize();
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  const wrapperVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };
  
  // Helper function to render the correct color class based on feature color
  const getColorClass = (prefix: string, color: string) => {
    if (color === "blue") return `${prefix}blue-500/20`;
    if (color === "indigo") return `${prefix}indigo-500/20`;
    if (color === "purple") return `${prefix}purple-500/20`;
    if (color === "cyan") return `${prefix}cyan-500/20`;
    return `${prefix}blue-500/20`;
  };
  
  // Helper function for text color
  const getTextColorClass = (color: string) => {
    if (color === "blue") return "text-blue-400";
    if (color === "indigo") return "text-indigo-400";
    if (color === "purple") return "text-purple-400"; 
    if (color === "cyan") return "text-cyan-400";
    return "text-blue-400";
  };
  
  const ActiveFeatureIcon = features[activeFeature].icon;
  
  return (
    <div ref={containerRef} id="home" className="relative min-h-screen overflow-hidden bg-black">
      {/* Circuit board background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80"></div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Base layer overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMxYTFhMWEiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <Container className="relative z-10 px-4">
        <div className="min-h-screen flex flex-col justify-center py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left column - Main content */}
              <motion.div 
                className="lg:col-span-7 lg:pr-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex h-8 mb-6 items-center rounded-full border border-blue-600/20 bg-blue-600/10 px-3 md:px-4 text-xs font-medium text-blue-400">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  TRANSFORMING THE DIGITAL LANDSCAPE
                </div>
                
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                  variants={wrapperVariants}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                >
                  <motion.span 
                    variants={itemVariants}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-100 leading-tight block mb-1"
                  >
                    Advanced Blockchain
                  </motion.span>
                  <motion.span 
                    variants={itemVariants}
                    className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent leading-tight"
                  >
                    & AI Solutions
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Neuralarc Matrix combines cutting-edge technologies to deliver secure, scalable, and innovative solutions that empower businesses for the future.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-5 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      primary 
                      className="px-8 py-3 text-base rounded-lg relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center">
                        Explore Solutions
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      secondary 
                      outlined 
                      className="px-8 py-3 text-base rounded-lg"
                    >
                      View Portfolio
                    </Button>
                  </motion.div>
                </motion.div>
                
                {/* Feature cards */}
                <div className="mt-16 grid grid-cols-2 gap-4">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={feature.title}
                      className={`p-5 border rounded-lg backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                        activeFeature === idx 
                          ? 'border-blue-500/30 bg-blue-900/10' 
                          : 'border-white/5 bg-white/5 hover:bg-white/10'
                      }`}
                      onClick={() => setActiveFeature(idx)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                      transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                    >
                      <div className="flex space-x-4">
                        <div className={`flex-shrink-0 rounded-lg w-10 h-10 flex items-center justify-center ${
                          activeFeature === idx ? 'bg-blue-500/20' : 'bg-gray-800'
                        }`}>
                          <feature.icon 
                            size={20} 
                            className={activeFeature === idx ? 'text-blue-400' : 'text-gray-400'} 
                          />
                        </div>
                        <div>
                          <h3 className={`font-medium mb-1 ${
                            activeFeature === idx ? 'text-blue-400' : 'text-white'
                          }`}>
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Right column - Visual element */}
              <motion.div 
                className="lg:col-span-5 flex items-center justify-center"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="relative max-w-md w-full aspect-square">
                  {/* Decorative elements */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl"></div>
                  
                  {/* Main visual */}
                  <motion.div 
                    className="relative"
                    initial={{ rotateY: 20 }}
                    animate={{ 
                      rotateY: [20, -20, 20],
                      rotateX: [-5, 5, -5]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity,
                      ease: "linear" 
                    }}
                  >
                    {/* 3D Layered panel */}
                    <div className="relative">
                      {/* Shadow and backdrop layers */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-blue-600/5 blur-xl transform scale-95 -rotate-3"></div>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-indigo-600/5 blur-xl transform scale-105 rotate-6"></div>
                      
                      {/* Main panel */}
                      <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 shadow-2xl">
                        {/* Header gradient */}
                        <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                        
                        {/* Content */}
                        <div className="p-8 bg-gradient-to-br from-gray-900/90 to-black/90">
                          {/* Active feature highlight */}
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeFeature}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="mb-8"
                            >
                              <div className="flex items-center mb-4">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getColorClass('bg-', features[activeFeature].color)}`}>
                                  <ActiveFeatureIcon size={28} className={getTextColorClass(features[activeFeature].color)} />
                                </div>
                                <div className="ml-4">
                                  <h3 className="text-xl font-bold text-white">{features[activeFeature].title}</h3>
                                  <p className="text-gray-400 text-sm">{activeFeature + 1} of {features.length}</p>
                                </div>
                              </div>
                              <p className="text-gray-300 mb-6">{features[activeFeature].description}</p>
                            </motion.div>
                          </AnimatePresence>
                          
                          {/* Visual elements */}
                          <div className="space-y-6">
                            {/* Architecture visualization */}
                            <div className="grid grid-cols-3 gap-2">
                              {[...Array(9)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="aspect-square rounded-lg bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-white/5 flex items-center justify-center overflow-hidden"
                                  initial={{ opacity: 0.3 }}
                                  animate={{ 
                                    opacity: [0.3, i % 3 === activeFeature % 3 ? 1 : 0.3, 0.3],
                                    borderColor: i % 3 === activeFeature % 3 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.05)'
                                  }}
                                  transition={{ 
                                    duration: 2, 
                                    delay: i * 0.1,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                  }}
                                >
                                  <div className={`w-1/2 h-1/2 rounded-md ${i % 4 === 0 ? 'bg-blue-500/20' : 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20'}`}></div>
                                </motion.div>
                              ))}
                            </div>
                            
                            {/* Status indicators */}
                            <div className="space-y-3">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
                                  <div className="flex-1">
                                    <div className="h-2 bg-gradient-to-r from-blue-400/50 to-blue-400/10 rounded-full" 
                                         style={{ width: `${90 - i * 10}%` }}></div>
                                  </div>
                                  <div className="ml-3 text-xs text-gray-500">{95 - i * 5}%</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative code snippets */}
                    <motion.div 
                      className="absolute -left-12 top-16 bg-gray-900/80 p-3 rounded-md border border-white/5 text-xs font-mono text-blue-300 transform -rotate-3 backdrop-blur-sm"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <pre>{`// Neuralarc Matrix API\nconst blockchain = new Chain();`}</pre>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute -right-8 bottom-24 bg-gray-900/80 p-3 rounded-md border border-white/5 text-xs font-mono text-indigo-300 transform rotate-3 backdrop-blur-sm"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <pre>{`model.train(data, {\n  epochs: 100\n});`}</pre>
                    </motion.div>
                  </motion.div>
                </div>
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
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <a 
          href="#services" 
          className="group flex flex-col items-center"
        >
          <span className="text-sm text-gray-400 mb-2 group-hover:text-blue-400 transition-colors">Discover Our Services</span>
          <motion.div 
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 group-hover:bg-blue-900/20 group-hover:border-blue-500/20 transition-all"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
          </motion.div>
        </a>
      </motion.div>
    </div>
  );
}; 