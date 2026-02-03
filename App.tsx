
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Contact from './pages/Contact';
import ServiceAreas from './pages/ServiceAreas';
import CityLanding from './pages/CityLanding';
import StickyMobileCTA from './components/StickyMobileCTA';
import { Lead, Subcontractor, JobStatus } from './types';
import { INITIAL_LEADS, MOCK_SUBCONTRACTORS } from './constants';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
}

const App: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('quote_requests');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });
  const [subcontractors] = useState<Subcontractor[]>(MOCK_SUBCONTRACTORS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.setItem('quote_requests', JSON.stringify(leads));
  }, [leads]);

  const handleQuoteSubmit = (newLeadData: Omit<Lead, 'id' | 'status' | 'quoteAmount' | 'createdAt'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `req-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: JobStatus.New,
      quoteAmount: Math.floor(Math.random() * 200) + 150, // Mock calculation
      createdAt: new Date().toISOString(),
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const handleAssignSubcontractor = (leadId: string, subId: string) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return { ...lead, assignedTo: subId, status: JobStatus.Booked };
      }
      return lead;
    }));
  };

  const handleStatusChange = (leadId: string, status: JobStatus) => {
    setLeads(prev => prev.map(lead => {
        if (lead.id === leadId) {
            return { ...lead, status };
        }
        return lead;
    }));
  };

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this quote request?')) {
      setLeads(prev => prev.filter(l => l.id !== leadId));
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-gray-900 pb-20 md:pb-0">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onQuoteSubmit={handleQuoteSubmit} />} />
            <Route path="/services/:slug" element={<ServiceDetail onQuoteSubmit={handleQuoteSubmit} />} />
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? (
                  <AdminDashboard 
                    leads={leads} 
                    subcontractors={subcontractors}
                    onAssign={handleAssignSubcontractor}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteLead}
                  />
                ) : (
                  <Login onLogin={setIsAuthenticated} />
                )
              } 
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/:citySlug" element={<CityLanding onQuoteSubmit={handleQuoteSubmit} />} />
          </Routes>
        </main>
        <Footer />
        <StickyMobileCTA />
      </div>
    </Router>
  );
};

export default App;
