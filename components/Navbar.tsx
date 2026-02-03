import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => location.pathname === path ? 'text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-600';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <div className="bg-brand-600 p-1.5 rounded-lg text-white">
                <ShieldCheck className="h-6 w-6 md:h-7 md:w-7" />
              </div>
              <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter uppercase">ClearVista</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <div className="relative group">
              <button className="text-gray-600 hover:text-brand-600 flex items-center font-medium">
                Services
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform z-50 overflow-hidden">
                <Link to="/services/house-cleaning" className="block px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600">House Cleaning</Link>
                <Link to="/services/apartment-cleaning" className="block px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600">Apartment Cleaning</Link>
                <Link to="/services/deep-cleaning" className="block px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600">Deep Cleaning</Link>
                <Link to="/services/move-out" className="block px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600">Move-Out / Move-In</Link>
                <Link to="/services/office-cleaning" className="block px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600">Office Cleaning</Link>
              </div>
            </div>
            <Link to="/service-areas" className={isActive('/service-areas')}>Service Areas</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            <div className="flex flex-col items-center">
              <Link to="/contact" className="flex items-center bg-brand-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-brand-700 transition shadow-md shadow-brand-200">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Link>
              <span className="text-[10px] font-bold text-brand-600 mt-1 uppercase tracking-tighter">We respond in minutes</span>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center space-x-3 md:hidden">
            <Link to="/contact" className="bg-brand-50 text-brand-600 p-2 rounded-full active:bg-brand-100">
              <Mail className="h-6 w-6" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-brand-600 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white transition-transform duration-300 transform md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-6 pb-12 overflow-y-auto">
          <div className="flex flex-col gap-6 mb-12">
            <Link to="/" className="text-2xl font-bold text-gray-900" onClick={closeMenu}>Home</Link>
            
            <div className="flex flex-col gap-4">
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Our Services</p>
               <Link to="/services/house-cleaning" className="text-xl font-medium text-gray-700 hover:text-brand-600 pl-2 border-l-2 border-transparent active:border-brand-600 active:text-brand-600" onClick={closeMenu}>House Cleaning</Link>
               <Link to="/services/apartment-cleaning" className="text-xl font-medium text-gray-700 hover:text-brand-600 pl-2 border-l-2 border-transparent active:border-brand-600 active:text-brand-600" onClick={closeMenu}>Apartment Cleaning</Link>
               <Link to="/services/deep-cleaning" className="text-xl font-medium text-gray-700 hover:text-brand-600 pl-2 border-l-2 border-transparent active:border-brand-600 active:text-brand-600" onClick={closeMenu}>Deep Cleaning</Link>
               <Link to="/services/move-out" className="text-xl font-medium text-gray-700 hover:text-brand-600 pl-2 border-l-2 border-transparent active:border-brand-600 active:text-brand-600" onClick={closeMenu}>Move-Out / In</Link>
               <Link to="/services/office-cleaning" className="text-xl font-medium text-gray-700 hover:text-brand-600 pl-2 border-l-2 border-transparent active:border-brand-600 active:text-brand-600" onClick={closeMenu}>Office Cleaning</Link>
            </div>
            
            <Link to="/service-areas" className="text-2xl font-bold text-gray-900" onClick={closeMenu}>Service Areas</Link>
            <Link to="/contact" className="text-2xl font-bold text-gray-900" onClick={closeMenu}>Contact Us</Link>
          </div>

          <div className="mt-auto flex flex-col gap-4 text-center">
             <Link to="/contact" onClick={closeMenu} className="flex items-center justify-center bg-brand-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg">
               <Mail className="w-5 h-5 mr-3" />
               Contact Us
             </Link>
             <p className="text-brand-600 font-black text-sm uppercase tracking-widest">We respond within minutes</p>
             <p className="text-gray-500 text-sm mt-4">Professional Cleaning for Westchester County</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;