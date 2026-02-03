import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const ServiceAreas: React.FC = () => {
  const areas = [
    { name: 'White Plains', path: '/white-plains-house-cleaning' },
    { name: 'Yonkers', path: '/yonkers-house-cleaning' },
    { name: 'New Rochelle', path: '/new-rochelle-house-cleaning' },
    { name: 'Mount Vernon', path: '/mount-vernon-house-cleaning' },
    { name: 'Scarsdale', path: '/scarsdale-house-cleaning' },
    // Point non-indexed cities to contact page to capture leads
    { name: 'Rye', path: '/contact' },
    { name: 'Tarrytown', path: '/contact' },
    { name: 'Mamaroneck', path: '/contact' },
    { name: 'Port Chester', path: '/contact' },
    { name: 'Ossining', path: '/contact' },
    { name: 'Eastchester', path: '/contact' },
    { name: 'Harrison', path: '/contact' },
    { name: 'Dobbs Ferry', path: '/contact' },
    { name: 'Peekskill', path: '/contact' },
  ];

  return (
    <div className="bg-white">
      <SEO
        title="Service Areas - Cleaning Services in Westchester County & Nearby Areas"
        description="We proudly serve Westchester County, including White Plains, Yonkers, Scarsdale, and more. Professional, vetted local cleaners for your home or office."
        keywords="cleaning service areas westchester, maid service white plains, cleaning yonkers, scarsdale house cleaning"
      />
      
      {/* Hero */}
      <div className="bg-brand-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Service Areas</h1>
          <p className="text-xl text-brand-100">Proudly Serving Westchester County & Nearby Areas</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Local Cleaning Professionals You Can Trust</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At ClearVista Cleaning Services, we are dedicated to bringing high-quality, managed cleaning solutions to homes and businesses across the entire region. We understand that inviting someone into your home requires trust. That's why every service is performed by strictly vetted, background-checked, and highly trained local cleaners who live and work in your community.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              From the bustling streets of <Link to="/yonkers-house-cleaning" className="text-brand-600 hover:underline">Yonkers</Link> to the quiet neighborhoods of <Link to="/scarsdale-house-cleaning" className="text-brand-600 hover:underline">Scarsdale</Link>, our teams are equipped to handle everything from standard house cleaning to complex deep cleanings. We handle all the logistics, scheduling, and payment processing, so you get a seamless, professional experience every time. Our commitment to excellence ensures that whether you are in <Link to="/mount-vernon-house-cleaning" className="text-brand-600 hover:underline">Mount Vernon</Link> or <Link to="/white-plains-house-cleaning" className="text-brand-600 hover:underline">White Plains</Link>, you receive the same gold standard of service.
            </p>
            
            <div className="mt-8">
                <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 transition">
                Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 sticky top-24">
            <div className="flex items-center mb-6">
              <MapPin className="h-8 w-8 text-brand-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Cities We Serve</h3>
            </div>
            <p className="text-gray-600 mb-6 text-sm">Select your city to learn more about our local services and pricing.</p>
            
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {areas.map((city) => (
                <li key={city.name} className="flex items-center group">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 group-hover:text-brand-500 transition-colors" />
                  <Link 
                    to={city.path} 
                    className="text-gray-700 font-medium hover:text-brand-700 hover:underline transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-gray-500 italic">
              * Don't see your city? We are expanding rapidly. Contact us to check availability in your zip code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreas;