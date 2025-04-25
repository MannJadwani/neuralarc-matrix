import { motion } from 'framer-motion';

export const HeroV2 = () => {
  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-xl"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="absolute w-48 h-48 bg-blue-500/20 rounded-full blur-xl -top-20 -right-20"
        variants={floatingVariants}
        animate="float"
      />
      
      <div className="relative z-10 text-center space-y-8 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400"
        >
          Transform Your Digital Presence
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto"
        >
          We create immersive digital experiences that captivate audiences and drive results
        </motion.p>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </section>
  );
};