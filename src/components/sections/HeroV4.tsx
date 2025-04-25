import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, ChevronDown, Code, Cpu, Database, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

// TypeWriter effect hook
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(index + 1);
      }, Math.random() * 100 + speed);
      
      return () => clearTimeout(timeout);
    } else {
      setComplete(true);
    }
  }, [index, text, speed]);

  return { displayText, complete };
};

export const HeroV4: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useAnimation();
  const [activeIcon, setActiveIcon] = useState(0);
  const icons = [Code, Cpu, Database, Globe];
  const iconLabels = ['Web3', 'AI', 'Blockchain', 'DeFi'];
  const IconComponent = icons[activeIcon];
  
  const { displayText: titleText, complete: titleComplete } = useTypewriter('Digital Innovation', 80);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    controls.start({
      scale: [0.95, 1.05, 1],
      transition: { duration: 0.5 }
    });
  }, [activeIcon, controls]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Make canvas fullscreen
    const resize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    // Create stars
    const stars: Star[] = [];
    const starCount = Math.min(Math.floor(window.innerWidth / 8), 300);
    
    class Star {
      x: number;
      y: number;
      z: number;
      pz: number;
      
      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth) - (canvas?.width || window.innerWidth) / 2;
        this.y = Math.random() * (canvas?.height || window.innerHeight) - (canvas?.height || window.innerHeight) / 2;
        this.z = Math.random() * 2000;
        this.pz = this.z;
      }
      
      update(speed: number) {
        this.z = this.z - speed;
        if (this.z < 1) {
          this.z = 2000;
          this.x = Math.random() * (canvas?.width || window.innerWidth) - (canvas?.width || window.innerWidth) / 2;
          this.y = Math.random() * (canvas?.height || window.innerHeight) - (canvas?.height || window.innerHeight) / 2;
          this.pz = this.z;
        }
      }
      
      draw() {
        if (!ctx || !canvas) return;
        
        const sx = this.x / this.z * 500 + canvas.width / 2;
        const sy = this.y / this.z * 500 + canvas.height / 2;
        
        const size = Math.max(1.5 * (2000 / this.z), 0.5);
        
        // Previous position for trails
        const psx = this.x / this.pz * 500 + canvas.width / 2;
        const psy = this.y / this.pz * 500 + canvas.height / 2;
        
        // Update previous z
        this.pz = this.z;
        
        // Star
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, 1 - this.z / 2000)})`;
        ctx.arc(sx, sy, size, 0, 2 * Math.PI);
        ctx.fill();
        
        // Trail
        ctx.beginPath();
        ctx.strokeStyle = `rgba(59, 130, 246, ${Math.min(0.5, 0.5 - this.z / 4000)})`;
        ctx.lineWidth = size / 2;
        ctx.moveTo(psx, psy);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    }
    
    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
    
    // Mouse position for speed control
    let mouseX = 0;
    let mouseY = 0;
    let speed = 5;
    let targetSpeed = 5;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      targetSpeed = 5 + Math.abs(mouseX) * 10 + Math.abs(mouseY) * 5;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animate stars
    let hue = 220;
    let animationId: number;
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with a gradient background
      ctx.fillStyle = 'rgba(0, 0, 10, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Smoothly adjust speed
      speed += (targetSpeed - speed) * 0.01;
      
      // Update and draw stars
      stars.forEach(star => {
        star.update(speed);
        star.draw();
      });
      
      // Occasional "pulse" effects
      if (Math.random() > 0.99) {
        const radius = Math.random() * 100 + 50;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.3)`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        hue = (hue + 1) % 360;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  const floatingVariants: Variants = {
    float: {
      y: [-15, 15],
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 3,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-black" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black"></div>
      
      <Container className="relative z-10 mt-16 px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Glowing circular orbs in background */}
              <div className="absolute -left-10 -top-10 w-28 h-28 rounded-full bg-blue-500/10 blur-xl"></div>
              <div className="absolute -right-8 -bottom-8 w-20 h-20 rounded-full bg-indigo-600/10 blur-xl"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 backdrop-blur-lg bg-black/30 p-7 md:p-10 rounded-2xl border border-white/5 shadow-2xl"
              >
                <div className="flex items-center mb-8">
                  <div className="inline-flex h-7 items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 text-xs font-medium text-blue-400">
                    <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-blue-400"></span>
                    THE FUTURE OF BLOCKCHAIN AND AI
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                    Next Generation
                  </span>
                </h1>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 min-h-[60px] text-blue-400">
                  {titleText}
                  {!titleComplete && <span className="animate-pulse">|</span>}
                </h2>
                
                <p className="text-gray-300 text-lg mb-8 max-w-lg">
                  Pioneering the fusion of blockchain architecture and artificial intelligence to create transformative solutions that redefine industry standards.
                </p>
                
                <div className="flex flex-wrap gap-5 items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button primary className="px-8 py-3 text-base">
                      Start Building
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button secondary outlined className="px-8 py-3 text-base">
                      Explore Use Cases
                    </Button>
                  </motion.div>
                </div>
                
                <div className="mt-12 pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-4 justify-between">
                    {iconLabels.map((label, index) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: activeIcon === index ? 1 : 0.5 }}
                        onClick={() => setActiveIcon(index)}
                        className={`flex flex-col items-center cursor-pointer ${activeIcon === index ? 'text-blue-400' : 'text-gray-400'}`}
                      >
                        {React.createElement(icons[index], { size: 20 })}
                        <span className="mt-1 text-xs font-medium">{label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative max-w-md">
              <motion.div
                variants={floatingVariants}
                animate="float"
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 blur-2xl rounded-full transform -rotate-12 scale-75"
              />
              
              <motion.div
                variants={floatingVariants}
                animate="float"
                transition={{ delay: 0.5 }}
                className="absolute inset-0 w-full h-full bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 blur-2xl rounded-full transform rotate-12 scale-90"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <div className="rounded-2xl p-1 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20">
                  <div className="relative bg-gradient-to-br from-blue-900/90 to-indigo-900/90 p-8 rounded-xl backdrop-blur-sm shadow-2xl border border-white/5 overflow-hidden">
                    {/* Animated glowing dots in background */}
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-blue-400/50"
                        animate={{
                          x: [
                            Math.random() * 400 - 200,
                            Math.random() * 400 - 200,
                            Math.random() * 400 - 200
                          ],
                          y: [
                            Math.random() * 400 - 200,
                            Math.random() * 400 - 200,
                            Math.random() * 400 - 200
                          ],
                          opacity: [0.2, 0.8, 0.2]
                        }}
                        transition={{
                          duration: Math.random() * 10 + 10,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                      />
                    ))}
                    
                    <div className="mb-10 relative">
                      <div className="flex items-center justify-center mb-6">
                        <motion.div
                          animate={controls}
                          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/30 to-indigo-500/30 flex items-center justify-center"
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeIcon}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.3 }}
                            >
                              <IconComponent size={36} className="text-blue-400" />
                            </motion.div>
                          </AnimatePresence>
                        </motion.div>
                      </div>
                      
                      <AnimatePresence mode="wait">
                        <motion.h3
                          key={activeIcon}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="text-2xl font-bold text-center text-white mb-3"
                        >
                          {iconLabels[activeIcon]} Technology
                        </motion.h3>
                      </AnimatePresence>
                      
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={activeIcon}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-300 text-center"
                        >
                          {activeIcon === 0 && "Build secure, decentralized applications with our powerful Web3 infrastructure."}
                          {activeIcon === 1 && "Leverage our advanced AI models to create intelligent and adaptive systems."}
                          {activeIcon === 2 && "Implement robust blockchain solutions with our scalable architecture."}
                          {activeIcon === 3 && "Revolutionize finance with our cutting-edge DeFi protocols."}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    
                    <div className="space-y-5">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
                          <div className="flex-1">
                            <div className="h-2 bg-gradient-to-r from-blue-400/70 to-blue-400/10 rounded-full" 
                                 style={{ width: `${85 - i * 10}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Illuminated edges */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"></div>
                  </div>
                </div>
                
                {/* Code snippets floating around */}
                <motion.div
                  initial={{ opacity: 0, x: -50, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -left-16 top-1/4 bg-gray-900/90 p-3 rounded-lg border border-blue-500/20 shadow-lg transform -rotate-6 text-xs font-mono text-blue-300 backdrop-blur-md"
                >
                  <pre>{'import { Matrix } from "neuralarc";'}</pre>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute -right-10 bottom-1/3 bg-gray-900/90 p-3 rounded-lg border border-blue-500/20 shadow-lg transform rotate-3 text-xs font-mono text-blue-300 backdrop-blur-md"
                >
                  <pre>{'const ai = new AI.Model("GPT-4");'}</pre>
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
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
      >
        <a href="#services" className="flex flex-col items-center group">
          <span className="text-sm mb-2 text-gray-400 group-hover:text-blue-400 transition-colors">Discover More</span>
          <div className="bg-gray-800/50 p-3 rounded-full border border-white/10 group-hover:border-blue-500/30 group-hover:bg-blue-900/20 transition-all">
            <ChevronDown size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
          </div>
        </a>
      </motion.div>
    </div>
  );
}; 