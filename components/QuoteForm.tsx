import React, { useState } from 'react';
import { ServiceType, Lead, JobStatus } from '../types';
import { CheckCircle, Loader2, Shield } from 'lucide-react';

interface QuoteFormProps {
  onSubmit: (lead: any) => void;
  preSelectedService?: ServiceType;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit, preSelectedService }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    address: '',
    zipCode: '',
    serviceType: preSelectedService || ServiceType.HouseCleaning,
    bedrooms: '2',
    bathrooms: '1',
    addOns: [] as string[],
    date: '',
    frequency: 'One-time',
    instructions: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOnClick = (option: string) => {
    setFormData(prev => {
      const isSelected = prev.addOns.includes(option);
      if (isSelected) {
        return { ...prev, addOns: prev.addOns.filter(item => item !== option) };
      } else {
        return { ...prev, addOns: [...prev.addOns, option] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!formData.customerName || !formData.email || !formData.zipCode) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mzdzllkl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSubmit(formData);
        setSubmitted(true);
      } else {
        // Fallback: still process locally if external submission fails
        onSubmit(formData);
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      onSubmit(formData);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-green-100 min-h-[400px] flex flex-col justify-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Requested!</h3>
        <p className="text-gray-800 mb-6">
          Thanks! Your quote request has been received. We’ll contact you via email shortly.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setFormData({ ...formData, customerName: '', email: '' }); }}
          className="text-brand-700 font-bold hover:underline p-4"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const addOnOptions = [
    'Inside oven',
    'Inside refrigerator',
    'Interior windows',
    'Heavy pet hair',
    'Deep buildup / hasn’t been cleaned recently',
    'Move-in / move-out level detail'
  ];

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition text-base md:text-sm text-gray-900 bg-white placeholder-gray-400";
  const labelClasses = "block text-sm font-bold text-gray-900 mb-1.5";

  return (
    <div id="quote-form" className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl border-t-8 border-brand-600 scroll-mt-24">
      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-2xl font-bold text-gray-900">Get a Free Quote</h3>
      </div>
      <p className="text-gray-600 mb-6 text-sm">Takes less than 60 seconds to complete.</p>
      
      <form 
        onSubmit={handleSubmit} 
        action="https://formspree.io/f/mzdzllkl" 
        method="POST" 
        className="space-y-5"
      >
        <input type="text" name="_gotcha" style={{ display: 'none' }} />
        <div>
          <label className={labelClasses}>Full Name</label>
          <input
            required
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Full Name"
          />
        </div>

        <div>
          <label className={labelClasses}>Email Address</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder="email@example.com"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className={labelClasses}>Service Address</label>
            <input
              required
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Address, City, State"
            />
          </div>
          <div>
            <label className={labelClasses}>ZIP Code</label>
            <input
              required
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={inputClasses}
              placeholder="10601"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>Service Type</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className={inputClasses}
            >
              {Object.values(ServiceType).map((type) => (
                <option key={type} value={type} className="text-gray-900">{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Frequency</label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="One-time" className="text-gray-900">One-time Clean</option>
              <option value="Weekly" className="text-gray-900">Weekly (Save 15%)</option>
              <option value="Bi-weekly" className="text-gray-900">Bi-weekly (Save 10%)</option>
              <option value="Monthly" className="text-gray-900">Monthly (Save 5%)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>Bedrooms</label>
            <select
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className={inputClasses}
            >
              {[1, 2, 3, 4, 5, 6, 7].map(num => (
                <option key={num} value={num} className="text-gray-900">{num} {num === 1 ? 'Bedroom' : 'Bedrooms'}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Bathrooms</label>
            <select
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className={inputClasses}
            >
              {[1, 1.5, 2, 2.5, 3, 3.5, 4, 5].map(num => (
                <option key={num} value={num} className="text-gray-900">{num} {num === 1 ? 'Bathroom' : 'Bathrooms'}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <label className="block text-sm font-black text-gray-900 mb-0.5 uppercase tracking-tight">Optional Add-On Services</label>
          <p className="text-[11px] text-gray-500 mb-4">Pricing will be confirmed before booking.</p>
          <div className="grid grid-cols-1 gap-y-3">
            {addOnOptions.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer group py-1">
                <input
                  type="checkbox"
                  name="addOns"
                  value={option}
                  checked={formData.addOns.includes(option)}
                  onChange={() => handleAddOnClick(option)}
                  className="h-6 w-6 rounded border-gray-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                />
                <span className="text-base md:text-sm text-gray-900 group-hover:text-black transition-colors font-semibold">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClasses}>Preferred Date</label>
          <input
            required
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Special Instructions (Optional)</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={3}
            className={inputClasses}
            placeholder="Gate code, pets, specific focus areas..."
          />
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-600 text-white font-black py-4 rounded-xl hover:bg-brand-700 active:scale-[0.98] transition-all flex items-center justify-center shadow-lg shadow-brand-500/20 disabled:opacity-70 disabled:cursor-not-allowed text-lg uppercase tracking-tight"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-6 w-6 mr-2" />
                Processing...
              </>
            ) : (
              'Get My Free Quote'
            )}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-widest">
             <Shield className="w-4 h-4 text-green-600" />
             Vetted & Background-Checked
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;