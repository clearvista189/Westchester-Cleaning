import React from 'react';
import { Link } from 'react-router-dom';
import QuoteForm from '../components/QuoteForm';
import { Lead } from '../types';
import { Star, Shield, Clock, Award, Mail, Calendar, CheckCircle } from 'lucide-react';
import { SERVICE_CONTENT } from '../constants';
import SEO from '../components/SEO';

interface HomeProps {
  onQuoteSubmit: (lead: Omit<Lead, 'id' | 'status' | 'quoteAmount' | 'createdAt'>) => void;
}

const Home: React.FC<HomeProps> = ({ onQuoteSubmit }) => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ClearVista Cleaning Services",
    "image": "https://images.unsplash.com/photo-1603614486387-276f74fcbe2a",
    "@id": "https://clearvistaclean.com",
    "url": "https://clearvistaclean.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Westchester County",
      "addressRegion": "NY",
      "addressCountry": "US"
    }
  };

  const scrollToQuote = (e: React.MouseEvent) => {
    const element = document.getElementById('quote-section');
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      <SEO 
        title="#1 Cleaning Service in Westchester, NY" 
        description="Professional home and office cleaning services in Westchester County. Insured, vetted cleaners for House Cleaning, Deep Cleaning, and Move-In/Out services."
        schema={localBusinessSchema}
      />
      
      {/* Hero Section */}
      <section className="relative bg-brand-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1603614486387-276f74fcbe2a?auto=format&fit=crop&q=80&w=1600" 
            alt="Clean living room" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-36">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-brand-800 rounded-full px-4 py-1.5 mb-6 border border-brand-700">
              <Star className="h-4 w-4 text-yellow-400 mr-2" fill="currentColor" />
              <span className="text-xs font-bold uppercase tracking-wider">Top-Rated Cleaning Service</span>
            </div>
            <h1 className="text-4xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              A Sparkling Home <br className="hidden lg:block" />
              <span className="text-brand-400">Without the Effort</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Professional, vetted, and reliable cleaning services tailored to your lifestyle. Book in 60 seconds and reclaim your time with ClearVista.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <a 
                href="#quote-section" 
                onClick={scrollToQuote}
                className="w-full sm:w-auto bg-brand-600 text-white px-8 py-5 rounded-2xl font-bold text-xl shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2 hover:bg-brand-500 transition-all active:scale-[0.98]"
               >
                  <Calendar className="w-6 h-6" />
                  Get a Free Quote
               </a>
               <div className="w-full sm:w-auto flex flex-col items-center">
                 <Link 
                  to="/contact" 
                  className="w-full bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all active:scale-[0.98]"
                 >
                    <Mail className="w-6 h-6" />
                    Contact Us
                 </Link>
                 <span className="text-xs font-bold text-brand-400 mt-2 uppercase tracking-widest">We respond within minutes</span>
               </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 justify-center opacity-80">
              <div className="flex items-center text-sm font-medium">
                 <Shield className="h-5 w-5 text-brand-400 mr-2" />
                 Insured & Bonded
              </div>
              <div className="flex items-center text-sm font-medium">
                 <Award className="h-5 w-5 text-brand-400 mr-2" />
                 Satisfaction Guarantee
              </div>
              <div className="flex items-center text-sm font-medium">
                 <Clock className="h-5 w-5 text-brand-400 mr-2" />
                 60s Booking
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50 transform translate-y-1/2 rounded-[100%] scale-x-110"></div>
      </section>

      {/* Trust Signals Section (Mobile View Only) */}
      <section className="bg-gray-50 py-10 md:hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-6">
          {[
            { icon: Shield, text: "Fully Insured" },
            { icon: Award, text: "Vetted Cleaners" },
            { icon: Clock, text: "Instant Quotes" },
            { icon: Star, text: "5-Star Service" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm">
              <item.icon className="w-6 h-6 text-brand-600 flex-shrink-0" />
              <span className="text-sm font-bold text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Professional Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Tailored cleaning solutions for every home and business in Westchester County.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Object.values(SERVICE_CONTENT).map((service) => (
              <div key={service.slug} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
                <div className="h-56 overflow-hidden relative">
                  <img src={service.imagePlaceholder} alt={service.title} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm flex-1 leading-relaxed">{service.shortDesc}</p>
                  <Link to={`/services/${service.slug}`} className="bg-brand-50 text-brand-700 font-bold py-3 px-4 rounded-xl text-center hover:bg-brand-600 hover:text-white transition-all text-sm">
                    View Pricing & Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section - High Prominence */}
      <section id="quote-section" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Ready to Experience <br className="hidden lg:block" /> a Spotless Home?
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Fill out our secure form to get an instant estimate. Our managed platform ensures you get matched with the best vetted professionals in Westchester.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Secure Cashless Payments</h4>
                    <p className="text-sm text-gray-500">Pay only after the clean is complete and you're satisfied.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg mt-1">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">100% Satisfaction Guarantee</h4>
                    <p className="text-sm text-gray-500">Not happy with a spot? We'll re-clean it for free within 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
               <QuoteForm onSubmit={onQuoteSubmit} />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">How ClearVista Works</h2>
            <p className="text-gray-600">The easiest way to a clean home, guaranteed.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Clock, title: "1. Book in 60s", desc: "Choose your service, date, and time. Secure your booking online instantly." },
              { icon: Shield, title: "2. We Arrive", desc: "Our background-checked, insured professionals arrive fully equipped to clean." },
              { icon: Star, title: "3. Enjoy & Relax", desc: "Walk into a sparkling home. Your satisfaction is our absolute priority." }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 text-brand-600 shadow-sm border border-gray-100 transform transition-transform hover:scale-105">
                  <step.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified Testimonials Placeholder */}
      <section className="py-20 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-800 rounded-full -ml-32 -mb-32 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">What Our Clients Say</h2>
          </div>
          <div className="bg-white/10 p-8 lg:p-16 rounded-[2rem] border border-white/10 max-w-4xl mx-auto backdrop-blur-md">
             <p className="text-2xl lg:text-3xl font-medium italic leading-relaxed text-brand-100">
               Customer reviews coming soon — ask us about our introductory cleaning offer via our contact page.
             </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;