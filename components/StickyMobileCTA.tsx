import React from 'react';
import { Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const StickyMobileCTA: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] px-4 py-3 flex gap-3">
      <Link 
        to="/contact" 
        className="flex-1 flex flex-col items-center justify-center bg-gray-100 text-gray-900 font-bold py-2 rounded-xl active:bg-gray-200 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          <span>Contact</span>
        </div>
        <span className="text-[8px] font-bold text-brand-600 uppercase tracking-tighter">Minutes away</span>
      </Link>
      <a 
        href="#quote-form" 
        className="flex-[2] flex items-center justify-center gap-2 bg-brand-600 text-white font-bold py-3 rounded-xl active:bg-brand-700 transition-shadow shadow-md shadow-brand-200"
        onClick={(e) => {
          const element = document.getElementById('quote-form');
          if (element) {
            e.preventDefault();
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <Calendar className="w-5 h-5" />
        Get a Free Quote
      </a>
    </div>
  );
};

export default StickyMobileCTA;