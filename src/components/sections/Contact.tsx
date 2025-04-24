import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Mail, MapPin, Phone } from 'lucide-react';

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  details: string;
  link?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, details, link }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
        {link ? (
          <a href={link} className="text-gray-400 hover:text-blue-400 transition-colors">
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
  return (
    <Section id="contact">
      <div className="text-center mb-16">
        <p className="text-blue-400 font-medium mb-2 tracking-wider">CONTACT US</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Get In Touch
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have a project in mind or want to learn more about our services? 
          Reach out to us and our team will get back to you promptly.
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
                details="info@neuralarc.com"
                link="mailto:info@neuralarc.com"
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
                details="123 Tech Plaza, San Francisco, CA 94105"
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-6">Business Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Monday - Friday:</span>
                <span className="text-white">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Saturday:</span>
                <span className="text-white">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sunday:</span>
                <span className="text-white">Closed</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6">Send Us a Message</h3>
          
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-300 mb-2 text-sm">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="How can we help you?"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            
            <Button primary className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};