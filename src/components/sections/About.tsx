import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Users, Award, Calendar, ArrowRight, Brain, Zap, Bot, Lock, Database, Link } from 'lucide-react';

interface StatProps {
  number: string;
  label: string;
  icon: React.ReactNode;
}

const Stat: React.FC<StatProps> = ({ number, label, icon }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mr-4">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{number}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </div>
  );
};

interface ValueProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Value: React.FC<ValueProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export const About: React.FC = () => {
  return (
    <Section id="about">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-purple-500/20 bg-purple-500/5">
          <span className="text-sm font-medium tracking-wide text-purple-400">OUR MISSION</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Innovation at Our Core
          </span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          We're dedicated to creating intelligent and secure systems that transform how businesses operate, 
          combining AI automation with blockchain security to unlock new possibilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">
            Empowering Business Through Dual Technologies
          </h3>
          <p className="text-gray-400 mb-6">
            Neuralarc Matrix was founded by a team of AI researchers, blockchain specialists, and experienced developers with a shared vision: to create solutions that combine the power of intelligent systems with the security and transparency of blockchain technology.
          </p>
          <p className="text-gray-400 mb-6">
            We specialize in developing AI agents that automate complex workflows, enhance decision-making, and create new possibilities for innovation, while leveraging blockchain technology to provide enhanced security, transparency, and trust.
          </p>
          <p className="text-gray-400 mb-8">
            Our dual-technology approach ensures clients benefit from the transformative power of AI with the added confidence of blockchain-backed security and verification systems. This combination creates solutions that are not only intelligent but also trustworthy.
          </p>
          
          <Button primary className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
            Our Approach
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
        
        <div>
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="AI Team collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Stat 
                  number="35+" 
                  label="AI Specialists" 
                  icon={<Brain size={24} />} 
                />
                <Stat 
                  number="120+" 
                  label="Automation Solutions" 
                  icon={<Zap size={24} />} 
                />
                <Stat 
                  number="98%" 
                  label="Client Satisfaction" 
                  icon={<Award size={24} />} 
                />
                <Stat 
                  number="24/7" 
                  label="AI-Powered Support" 
                  icon={<Bot size={24} />} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h3 className="text-2xl font-bold text-white text-center mb-12">Our Core Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Value 
            icon={<Brain size={24} />}
            title="AI-First Approach"
            description="We build intelligence into everything we create, putting AI agents at the center of our solutions."
          />
          <Value 
            icon={<Zap size={24} />}
            title="Automation Excellence"
            description="We identify and eliminate inefficiencies through intelligent process automation and optimization."
          />
          <Value 
            icon={<Lock size={24} />}
            title="Blockchain Security"
            description="We leverage blockchain technology to provide unmatched security, transparency and trust for critical operations."
          />
          <Value 
            icon={<Link size={24} />}
            title="Integrated Innovation"
            description="We seamlessly combine AI and blockchain to create solutions that are both intelligent and trustworthy."
          />
        </div>
      </div>
    </Section>
  );
};