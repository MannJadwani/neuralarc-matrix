import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';

type Testimonial = {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
  rating: number;
  solution: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Director of Operations',
    company: 'Enterprise Solutions Inc.',
    content: 'The AI automation agents developed by Neuralarc Matrix have completely transformed our business processes. What used to take our team hours now happens automatically with greater precision. Our productivity has increased by 40% and our team can now focus on strategic initiatives.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    solution: 'AI Workflow Automation'
  },
  {
    id: 2,
    name: 'Alex Chen',
    position: 'CTO',
    company: 'FinTech Innovations',
    content: 'Integrating blockchain technology with our AI systems has revolutionized how we handle data security and transactions. Neuralarc Matrix delivered a solution that not only provides the efficiency of AI but also the transparency and security of blockchain. Our clients now have complete trust in our automated processes.',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    solution: 'AI-Blockchain Integration'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'CEO',
    company: 'HealthTech Innovations',
    content: 'Neuralarc Matrix\'s dual-technology approach transformed our patient management system. The AI agents automated administration while blockchain ensured HIPAA compliance and data integrity. This combination reduced workload by 65% while enhancing security — exactly what we needed in healthcare.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    solution: 'Healthcare AI with Blockchain Security'
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const current = testimonials[currentIndex];

  return (
    <Section dark>
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-purple-500/20 bg-purple-500/5">
          <span className="text-sm font-medium tracking-wide text-purple-400">SUCCESS STORIES</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Transformative Results With
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            AI & Blockchain Solutions
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          See how our integrated technology approach has delivered exceptional outcomes and enhanced security for businesses across industries.
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black p-8 sm:p-10 rounded-2xl border border-gray-800 max-w-4xl mx-auto relative">
        {/* Solution Label */}
        <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-full text-white text-sm font-medium">
          {current.solution}
        </div>
        
        <div className="absolute top-8 left-8 text-purple-500 opacity-20">
          <Quote size={64} />
        </div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <p className="text-gray-300 text-lg">{current.content}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img 
                  src={current.image} 
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-white font-semibold">{current.name}</h4>
                <p className="text-gray-400 text-sm">
                  {current.position}, {current.company}
                </p>
              </div>
            </div>
            
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  fill={i < current.rating ? "#a855f7" : "none"} 
                  className={i < current.rating ? "text-purple-500" : "text-gray-600"} 
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-white hover:bg-purple-500 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentIndex ? 'bg-purple-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-white hover:bg-purple-500 transition-colors"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </Section>
  );
};