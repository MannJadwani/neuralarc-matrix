import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Mail, MapPin, Phone, Bot, Zap, Calendar } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  details: string;
  link?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, details, link }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
        {link ? (
          <a href={link} className="text-gray-400 hover:text-purple-400 transition-colors">
            {details}
          </a>
        ) : (
          <p className="text-gray-400">{details}</p>
        )}
      </div>
    </div>
  );
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async () => {
    // Validate form data
    if (!formData.name || !formData.email || !formData.interest || !formData.message) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Log the form data and environment variables (without sensitive data)
    console.log('Form Data:', formData);
    console.log('Supabase URL exists:', !!import.meta.env.VITE_SUPABASE_URL);
    console.log('Supabase Anon Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

    try {
      const { data, error } = await supabase
        .from('matrix_contact')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            interest: formData.interest,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        console.error('Supabase Error:', error);
        throw error;
      }

      console.log('Success Response:', data);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', interest: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Section id="contact">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full border border-purple-500/20 bg-purple-500/5">
          <span className="text-sm font-medium tracking-wide text-purple-400">LET'S COLLABORATE</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Get Started with Intelligent
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Automation Solutions
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Ready to transform your business with AI-powered automation? 
          Reach out to discuss how our intelligent agents can solve your unique challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 mb-8">
            <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <ContactInfo 
                icon={<Mail size={24} />}
                title="Email Us"
                details="mann@neuralarc.in"
                link="mailto:mann@neuralarc.in"
              />
              
              <ContactInfo 
                icon={<Phone size={24} />}
                title="Call Us"
                details="+1 (555) 123-4567"
                link="tel:+15551234567"
              />
              
              <ContactInfo 
                icon={<MapPin size={24} />}
                title="Visit Us"
                details="123 AI Innovation Center, San Francisco, CA 94105"
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-6">AI Consultation Options</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mr-3">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium">AI Strategy Session</h4>
                  <p className="text-gray-400 text-sm">1-hour deep dive into your automation needs</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mr-3">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium">Solution Demo</h4>
                  <p className="text-gray-400 text-sm">See our AI agents in action with a personalized demo</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mr-3">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium">Virtual Consultation</h4>
                  <p className="text-gray-400 text-sm">Remote meeting with our AI specialists</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6">Tell Us About Your Project</h3>
          
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="interest" className="block text-gray-300 mb-2 text-sm">
                Primary Interest
              </label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select your primary interest</option>
                <option value="ai-agents">AI Agents & Automation</option>
                <option value="enterprise">Enterprise AI Solutions</option>
                <option value="research">Knowledge & Research Tools</option>
                <option value="blockchain">Blockchain Integration</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">
                Tell Us About Your Challenge
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Describe the process or challenge you'd like to automate with AI..."
              ></textarea>
            </div>
            
            {submitStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {errorMessage || 'There was an error submitting your message. Please try again.'}
              </div>
            )}
            
            <Button 
              primary 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Submitting...' : 'Request AI Consultation'}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};