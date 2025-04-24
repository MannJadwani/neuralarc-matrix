import React from 'react';
import { Section } from '../ui/Section';
import { Brain, Cpu, Code, Database, Globe, Lock } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 group">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 mb-5 group-hover:bg-blue-500/20 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export const Services: React.FC = () => {
  const services = [
    {
      title: 'AI Development',
      description: 'Custom AI solutions using machine learning, natural language processing, and neural networks for business optimization.',
      icon: <Brain size={24} />,
    },
    {
      title: 'Blockchain Solutions',
      description: 'Smart contracts, decentralized applications, and custom blockchain networks for secure, transparent transactions.',
      icon: <Database size={24} />,
    },
    {
      title: 'Web3 Development',
      description: 'Full-stack Web3 applications bridging traditional web interfaces with decentralized blockchain backends.',
      icon: <Globe size={24} />,
    },
    {
      title: 'Smart Contract Auditing',
      description: 'Comprehensive security audits and vulnerability assessments for blockchain-based smart contracts.',
      icon: <Lock size={24} />,
    },
    {
      title: 'DeFi Applications',
      description: 'Decentralized finance solutions including exchanges, lending platforms, and yield farming protocols.',
      icon: <Cpu size={24} />,
    },
    {
      title: 'Custom Software',
      description: 'Tailored software solutions that integrate AI and blockchain technologies for your specific business needs.',
      icon: <Code size={24} />,
    },
  ];

  return (
    <Section id="services">
      <div className="text-center mb-16">
        <p className="text-blue-400 font-medium mb-2 tracking-wider">OUR SERVICES</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Cutting-Edge Digital Solutions
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Leveraging the latest in blockchain and AI technologies to create innovative, 
          secure, and efficient solutions for modern business challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
    </Section>
  );
};