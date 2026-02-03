import React from 'react';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheck className="h-8 w-8 text-brand-500" />
              <span className="text-xl font-bold">ClearVista</span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium managed cleaning services for Westchester County. Reliable, vetted, and insured.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/services/house-cleaning" className="hover:text-white transition">House Cleaning</Link></li>
              <li><Link to="/services/apartment-cleaning" className="hover:text-white transition">Apartment Cleaning</Link></li>
              <li><Link to="/services/deep-cleaning" className="hover:text-white transition">Deep Cleaning</Link></li>
              <li><Link to="/services/move-out" className="hover:text-white transition">Move-In / Move-Out</Link></li>
              <li><Link to="/services/office-cleaning" className="hover:text-white transition">Office Cleaning</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Locations</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/white-plains-house-cleaning" className="hover:text-white transition">White Plains</Link></li>
              <li><Link to="/yonkers-house-cleaning" className="hover:text-white transition">Yonkers</Link></li>
              <li><Link to="/scarsdale-house-cleaning" className="hover:text-white transition">Scarsdale</Link></li>
              <li><Link to="/new-rochelle-house-cleaning" className="hover:text-white transition">New Rochelle</Link></li>
              <li><Link to="/mount-vernon-house-cleaning" className="hover:text-white transition">Mount Vernon</Link></li>
              <li><Link to="/service-areas" className="hover:text-white transition text-brand-400">View All Areas &rarr;</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-brand-500 flex-shrink-0" />
                <a 
                  href="mailto:hello.clearvista@gmail.com" 
                  className="text-brand-400 hover:text-brand-300 underline underline-offset-4 decoration-brand-500/50 hover:decoration-brand-500 transition-all font-medium"
                >
                  hello.clearvista@gmail.com
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-brand-500 font-bold hover:text-brand-400">Contact Form &rarr;</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} ClearVista Cleaning Services. All rights reserved.</p>
          <Link 
            to="/admin" 
            className="flex items-center gap-1.5 px-3 py-1 rounded hover:bg-white/5 hover:text-white transition-all opacity-60 hover:opacity-100"
          >
            <Lock className="w-3 h-3" />
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;