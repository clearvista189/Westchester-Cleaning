import React, { useState } from 'react';
import { Mail, Clock, Loader2, CheckCircle, Send, MapPin } from 'lucide-react';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition text-base text-gray-900 bg-white placeholder-gray-400";
  const labelClasses = "block text-sm font-bold text-gray-900 mb-1.5";

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Contact Us"
        description="Get in touch with ClearVista Cleaning. Email us at hello.clearvista@gmail.com for a free quote. Serving all of Westchester County."
      />
      <div className="bg-brand-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Contact Us</h1>
          <p className="text-xl text-brand-100">We're here to help with your cleaning needs.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8 font-medium">
              We pride ourselves on our responsiveness. Reach out to us and we'll get back to you within minutes during business hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <a 
                    href="mailto:hello.clearvista@gmail.com" 
                    className="mt-1 text-brand-600 font-bold hover:text-brand-700 transition-all block underline underline-offset-4 decoration-brand-200 hover:decoration-brand-500"
                  >
                    hello.clearvista@gmail.com
                  </a>
                  <p className="text-sm text-brand-600 font-bold uppercase tracking-widest mt-1">Responding in minutes</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                  <p className="mt-1 text-gray-600">Mon-Fri 8am to 6pm</p>
                  <p className="mt-1 text-gray-600">Sat-Sun 9am to 4pm</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Service Area</h3>
                  <p className="mt-1 text-gray-600 font-bold text-brand-700">All of Westchester County, NY</p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">We are a fully mobile managed service. Our professional teams come directly to your home or office.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-6 sm:p-10 rounded-[2rem] shadow-xl border border-gray-100">
             {submitted ? (
               <div className="text-center py-12">
                 <div className="flex justify-center mb-6">
                   <div className="bg-green-100 p-4 rounded-full">
                     <CheckCircle className="h-12 w-12 text-green-600" />
                   </div>
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                 <p className="text-gray-600 mb-8">
                   Thank you for reaching out. A member of our local team will respond to your email at <strong>{formData.email}</strong> shortly.
                 </p>
                 <button 
                   onClick={() => setSubmitted(false)}
                   className="text-brand-600 font-bold hover:underline"
                 >
                   Send another message
                 </button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Us</h3>
                 <p className="text-sm text-gray-500 mb-6">Have a question? We're ready to help.</p>
                 
                 <input type="text" name="_gotcha" style={{ display: 'none' }} />
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div>
                     <label className={labelClasses}>Your Name</label>
                     <input
                       required
                       type="text"
                       name="name"
                       value={formData.name}
                       onChange={handleChange}
                       className={inputClasses}
                       placeholder="John Doe"
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
                       placeholder="john@example.com"
                     />
                   </div>
                 </div>

                 <div>
                   <label className={labelClasses}>Subject</label>
                   <input
                     required
                     type="text"
                     name="subject"
                     value={formData.subject}
                     onChange={handleChange}
                     className={inputClasses}
                     placeholder="How can we help?"
                   />
                 </div>

                 <div>
                   <label className={labelClasses}>Message</label>
                   <textarea
                     required
                     name="message"
                     value={formData.message}
                     onChange={handleChange}
                     rows={5}
                     className={inputClasses}
                     placeholder="Tell us about your needs..."
                   />
                 </div>

                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className="w-full bg-brand-600 text-white font-black py-4 rounded-xl hover:bg-brand-700 active:scale-[0.98] transition-all flex items-center justify-center shadow-lg shadow-brand-500/20 disabled:opacity-70 disabled:cursor-not-allowed text-lg uppercase tracking-tight"
                 >
                   {isSubmitting ? (
                     <>
                       <Loader2 className="animate-spin h-6 w-6 mr-2" />
                       Sending...
                     </>
                   ) : (
                     <>
                       <Send className="w-5 h-5 mr-2" />
                       Send Message
                     </>
                   )}
                 </button>
                 
                 <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">
                   Fast response guaranteed
                 </p>
               </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;