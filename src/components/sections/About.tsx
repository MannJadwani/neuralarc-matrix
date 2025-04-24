import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Users, Award, Calendar, ArrowRight } from 'lucide-react';

interface StatProps {
  number: string;
  label: string;
  icon: React.ReactNode;
}

const Stat: React.FC<StatProps> = ({ number, label, icon }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 mr-4">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{number}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <p className="text-blue-400 font-medium mb-2 tracking-wider">ABOUT US</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pioneering the Future of Digital Technology
          </h2>
          <p className="text-gray-400 mb-6">
            Neuralarc Matrix was founded in 2021 by a team of blockchain enthusiasts, AI researchers, and experienced web developers with a shared vision: to bridge the gap between cutting-edge technology and practical business applications.
          </p>
          <p className="text-gray-400 mb-6">
            We specialize in developing innovative solutions at the intersection of artificial intelligence and blockchain technology. Our team of experts combines deep technical knowledge with strategic business acumen to deliver transformative digital experiences.
          </p>
          <p className="text-gray-400 mb-8">
            Whether you're looking to optimize operations with AI, build secure and transparent blockchain systems, or create next-generation web applications, Neuralarc Matrix has the expertise to turn your vision into reality.
          </p>
          
          <Button primary>
            Learn More
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
        
        <div>
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team working"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Stat 
                  number="50+" 
                  label="Team Members" 
                  icon={<Users size={24} />} 
                />
                <Stat 
                  number="100+" 
                  label="Projects Completed" 
                  icon={<Award size={24} />} 
                />
                <Stat 
                  number="4+" 
                  label="Years Experience" 
                  icon={<Calendar size={24} />} 
                />
                <Stat 
                  number="24/7" 
                  label="Support Available" 
                  icon={<Users size={24} />} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};