import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { CITY_CONTENT } from '../cityContent';
import QuoteForm from '../components/QuoteForm';
import { Lead, ServiceType } from '../types';
import SEO from '../components/SEO';
import { Check, Star, MapPin, ShieldCheck, ArrowRight, Mail, Calendar } from 'lucide-react';

interface CityLandingProps {
  onQuoteSubmit: (lead: Omit<Lead, 'id' | 'status' | 'quoteAmount' | 'createdAt'>) => void;
}

const CityLanding: React.FC<CityLandingProps> = ({ onQuoteSubmit }) => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const content = citySlug ? CITY_CONTENT[citySlug] : undefined;

  if (!content) {
    return <Navigate to="/service-areas" replace />;
  }

  const citySchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "House Cleaning",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ClearVista Cleaning Services",
      "areaServed": {
        "@type": "City",
        "name": content.cityName
      }
    }
  };

  const scrollToQuote = (e: React.MouseEvent) => {
    const element = document.getElementById('quote-form-section');
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      <SEO 
        title={content.seoTitle} 
        description={content.seoDescription}
        keywords={`${content.cityName} cleaning services, maid service ${content.cityName}, house cleaning ${content.cityName} NY`}
        schema={citySchema}
      />

      {/* Hero Section */}
      <div className="relative bg-brand-900 text-white overflow-hidden">
        <div className="absolute inset-0">
           <div className="absolute inset-0 bg-brand-900 opacity-90 z-10"></div>
           <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1600" alt="Cleaning background" className="w-full h-full object-cover opacity-20" />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
             <div className="inline-flex items-center bg-brand-800 rounded-full px-4 py-1.5 mb-6 border border-brand-700">
                <MapPin className="h-4 w-4 text-brand-300 mr-2" />
                <span className="text-xs font-bold uppercase tracking-wide">Serving {content.cityName}, NY</span>
             </div>
             <h1 className="text-4xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
               {content.heroTitle}
             </h1>
             <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto leading-relaxed">
               {content.heroSubtitle}
             </p>
             
             <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
               <a 
                href="#quote-form-section" 
                onClick={scrollToQuote}
                className="w-full sm:w-auto bg-white text-brand-900 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
               >
                 <Calendar className="w-6 h-6" />
                 Get a Free Quote
               </a>
               <div className="w-full sm:w-auto flex flex-col items-center">
                 <Link to="/contact" className="w-full bg-brand-800/50 text-white px-10 py-5 rounded-2xl font-bold text-xl border border-white/20 flex items-center justify-center gap-2 hover:bg-brand-800 transition-all">
                   <Mail className="w-6 h-6" />
                   Contact Us
                 </Link>
                 <span className="text-xs font-bold text-brand-400 mt-2 uppercase tracking-widest">We respond within minutes</span>
               </div>
             </div>

             <div className="mt-12 flex flex-wrap gap-8 justify-center opacity-70 text-sm">
                <div className="flex items-center gap-2"><Check className="w-5 h-5 text-brand-400" /> Insured & Bonded</div>
                <div className="flex items-center gap-2"><Check className="w-5 h-5 text-brand-400" /> Vetted Cleaners</div>
                <div className="flex items-center gap-2"><Check className="w-5 h-5 text-brand-400" /> Satisfaction Guaranteed</div>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-6">{content.introTitle}</h2>
              <div className="prose prose-blue prose-lg text-gray-600 space-y-6">
                {content.introText.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-lg">{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mb-12 bg-gray-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Cleaning Services in {content.cityName}</h3>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed">{content.localServicesText}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { title: "Standard House Cleaning", path: "/services/house-cleaning", icon: Star },
                  { title: "Apartment Cleaning", path: "/services/apartment-cleaning", icon: ShieldCheck },
                  { title: "Deep Cleaning", path: "/services/deep-cleaning", icon: ShieldCheck },
                  { title: "Move-In / Move-Out", path: "/services/move-out", icon: ArrowRight },
                  { title: "Office & Commercial", path: "/services/office-cleaning", icon: MapPin }
                ].map((s, idx) => (
                  <Link key={idx} to={s.path} className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-brand-300 hover:shadow-md transition-all group">
                    <div className="bg-brand-50 p-3 rounded-xl mr-5 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <s.icon className="h-7 w-7" />
                    </div>
                    <span className="font-bold text-gray-900 text-lg">{s.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-12">
               <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Why {content.cityName} Chooses ClearVista</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {content.whyChooseUs.map((item, idx) => (
                   <div key={idx} className="flex flex-col bg-white p-8 rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex items-center mb-4">
                       <div className="bg-green-100 p-2 rounded-lg mr-4">
                        <Check className="h-6 w-6 text-green-600" />
                       </div>
                       <h4 className="font-bold text-xl text-gray-900">{item.title}</h4>
                     </div>
                     <p className="text-gray-600 leading-relaxed">{item.description}</p>
                   </div>
                 ))}
               </div>
            </div>

            <div className="mb-12 bg-white rounded-[2rem] border border-gray-100 p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">Common Questions</h3>
              <div className="space-y-8">
                {content.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-50 pb-8 last:border-0 last:pb-0">
                    <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-start gap-3">
                        <span className="bg-brand-100 text-brand-700 w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">Q</span>
                        {faq.question}
                    </h4>
                    <p className="text-gray-600 leading-relaxed pl-11">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="lg:col-span-1 flex flex-col gap-8">
            <div className="sticky top-24 flex flex-col gap-8">
              
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                 <h3 className="font-bold text-gray-900 mb-4 text-2xl tracking-tight">Local Pricing</h3>
                 <p className="text-sm text-gray-500 mb-8 leading-relaxed">Estimated standard cleaning rates for {content.cityName}. Final quote confirmed instantly.</p>
                 <div className="space-y-5">
                      {content.pricing.map((p, idx) => (
                        <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0 text-base">
                          <span className="text-gray-600 font-semibold">{p.label}</span>
                          <span className="font-bold text-brand-700 text-lg">{p.price}</span>
                        </div>
                      ))}
                 </div>
               </div>

               <div id="quote-form-section" className="scroll-mt-24">
                 <QuoteForm onSubmit={onQuoteSubmit} preSelectedService={ServiceType.HouseCleaning} />
               </div>
               
               <div className="bg-brand-900 p-10 rounded-3xl text-white shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-800 rounded-full -mr-16 -mt-16 opacity-50 transition-transform group-hover:scale-110"></div>
                  <div className="relative z-10 text-center">
                      <h4 className="font-bold text-2xl mb-4 leading-tight">Expert Support Available</h4>
                      <p className="text-brand-100 mb-8 leading-relaxed">Need help choosing a service or have special requirements? Talk to a local expert.</p>
                      <Link to="/contact" className="flex flex-col items-center justify-center bg-white text-brand-900 font-bold py-5 rounded-2xl text-xl shadow-sm active:bg-gray-50 transition-colors">
                        <span className="flex items-center"><Mail className="w-6 h-6 mr-3" /> Contact Us</span>
                        <span className="text-[10px] font-bold text-brand-600 mt-1 uppercase tracking-widest">Responding within minutes</span>
                      </Link>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CityLanding;