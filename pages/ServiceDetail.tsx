import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { SERVICE_CONTENT } from '../constants';
import QuoteForm from '../components/QuoteForm';
import { Lead, ServiceType } from '../types';
import { Check, ShieldCheck, ChevronDown, ChevronUp, HelpCircle, Mail } from 'lucide-react';
import SEO from '../components/SEO';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="text-lg font-bold text-gray-800 group-hover:text-brand-600 transition-colors">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-brand-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-brand-600" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

interface ServiceDetailProps {
  onQuoteSubmit: (lead: Omit<Lead, 'id' | 'status' | 'quoteAmount' | 'createdAt'>) => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ onQuoteSubmit }) => {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? SERVICE_CONTENT[slug] : undefined;

  if (!content) {
    return <Navigate to="/" replace />;
  }

  const getServiceTypeEnum = (slug: string): ServiceType => {
      switch(slug) {
          case 'house-cleaning': return ServiceType.HouseCleaning;
          case 'apartment-cleaning': return ServiceType.ApartmentCleaning;
          case 'deep-cleaning': return ServiceType.DeepCleaning;
          case 'move-out': return ServiceType.MoveOut;
          case 'office-cleaning': return ServiceType.Office;
          default: return ServiceType.HouseCleaning;
      }
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": content.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "ClearVista Cleaning Services"
    },
    "description": content.shortDesc,
    "areaServed": {
      "@type": "City",
      "name": "Westchester County"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": content.title,
      "itemListElement": content.benefits.map(benefit => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": benefit
        }
      }))
    }
  };

  return (
    <div className="bg-white">
      <SEO 
        title={content.seoTitle || content.title}
        description={content.seoDescription || content.shortDesc}
        keywords={content.seoKeywords}
        image={content.imagePlaceholder}
        schema={serviceSchema}
      />
      
      {/* Service Hero */}
      <div className="bg-brand-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">{content.title}</h1>
          <p className="text-xl text-brand-100 max-w-3xl mx-auto leading-relaxed">{content.shortDesc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:grid lg:grid-cols-3 gap-12">
        
        {/* Sidebar Quote Form */}
        <div className="lg:col-span-1 lg:order-2">
          <div className="space-y-8">
             {/* Pricing Table */}
             {content.pricingExamples && (
               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                 <h3 className="font-bold text-gray-900 mb-6 text-xl">Pricing Estimates</h3>
                 <div className="space-y-4">
                      {content.pricingExamples.map((p, idx) => (
                        <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                          <span className="text-gray-600 font-medium">{p.label}</span>
                          <span className="font-bold text-brand-700">{p.price}</span>
                        </div>
                      ))}
                 </div>
                 <div className="mt-6 pt-6 border-t border-gray-100 flex items-start bg-gray-50 -mx-8 px-8 -mb-8 rounded-b-2xl">
                    <ShieldCheck className="h-5 w-5 text-brand-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-500 italic leading-snug">
                        Note: Final quotes may vary based on specific home conditions and selected add-ons. 
                        <strong> Insured & Bonded service guaranteed.</strong>
                    </p>
                 </div>
               </div>
             )}
             
             <div id="booking-form" className="shadow-2xl rounded-2xl overflow-hidden">
                <QuoteForm onSubmit={onQuoteSubmit} preSelectedService={getServiceTypeEnum(content.slug)} />
             </div>
             
             <div className="bg-brand-900 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden group">
                <div className="relative z-10 text-center">
                    <h4 className="font-bold text-xl mb-3">Custom Requirements?</h4>
                    <p className="text-brand-100 text-sm mb-6 leading-relaxed">We specialize in tailoring our protocols to your specific needs. Message our local team.</p>
                    <Link to="/contact" className="inline-flex items-center justify-center w-full bg-white text-brand-900 font-bold py-4 px-4 rounded-xl hover:bg-brand-50 transition-colors shadow-sm">
                        <Mail className="w-5 h-5 mr-2" /> Contact Us
                    </Link>
                    <p className="text-[10px] font-bold text-brand-300 mt-2 uppercase tracking-widest">We respond within minutes</p>
                </div>
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-brand-800 rounded-full opacity-50 transition-transform group-hover:scale-110"></div>
             </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 lg:order-1">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <ShieldCheck className="h-8 w-8 text-brand-600 mr-3" />
                Experience the ClearVista Difference
            </h2>
            <p className="text-gray-700 leading-relaxed mb-10 text-xl">
              {content.longDesc}
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Benefits</h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-16">
              {content.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center p-4 bg-brand-50 rounded-xl border border-brand-100">
                  <div className="bg-white p-1 rounded-full mr-3 shadow-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </div>
                  <span className="text-gray-800 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-12">
                <div className="flex items-center mb-8">
                    <div className="bg-brand-100 p-3 rounded-full mr-4">
                        <HelpCircle className="h-7 w-7 text-brand-600" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Expert Answers</h3>
                        <p className="text-gray-500 text-sm">Everything you need to know about our {content.title}</p>
                    </div>
                </div>
                <div className="divide-y divide-gray-100">
                    {content.faqs.map((faq, idx) => (
                        <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
          </div>

          <div className="relative group mt-12">
            <img 
              src={content.imagePlaceholder} 
              alt={content.title} 
              className="w-full h-[300px] md:h-[450px] object-cover rounded-2xl shadow-xl transform transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetail;