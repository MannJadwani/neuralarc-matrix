import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

type Testimonial = {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CEO',
    company: 'FinTech Innovations',
    content: 'Neuralarc Matrix transformed our financial services platform with their blockchain expertise. The smart contract implementation has reduced transaction costs by 35% while improving security and transparency.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    name: 'David Chen',
    position: 'CTO',
    company: 'DataSphere',
    content: 'The AI solution developed by Neuralarc Matrix has revolutionized our data analytics capabilities. Their team\'s expertise in machine learning algorithms delivered a system that accurately predicts customer behavior with 92% accuracy.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Founder',
    company: 'ArtBlock NFT',
    content: 'Working with Neuralarc Matrix on our NFT marketplace was an exceptional experience. Their understanding of both the technical and artistic aspects of blockchain technology created a platform that artists and collectors love.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
        <p className="text-blue-400 font-medium mb-2 tracking-wider">TESTIMONIALS</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our clients have to say about working with Neuralarc Matrix.
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black p-8 sm:p-10 rounded-2xl border border-gray-800 max-w-4xl mx-auto relative">
        <div className="absolute top-8 left-8 text-blue-500 opacity-20">
          <Quote size={64} />
        </div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <p className="text-gray-300 text-lg italic">{current.content}</p>
          </div>
          
          <div className="flex items-center">
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
        </div>
        
        <div className="flex justify-between mt-8">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-white hover:bg-blue-500 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-white hover:bg-blue-500 transition-colors"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </Section>
  );
};