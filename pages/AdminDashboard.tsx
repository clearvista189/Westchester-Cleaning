import React, { useState } from 'react';
import { Lead, Subcontractor, JobStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DollarSign, Users, Briefcase, Info, X, Copy, Mail, Trash2 } from 'lucide-react';

interface AdminDashboardProps {
  leads: Lead[];
  subcontractors: Subcontractor[];
  onAssign: (leadId: string, subId: string) => void;
  onStatusChange: (leadId: string, status: JobStatus) => void;
  onDelete: (leadId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ leads, subcontractors, onAssign, onStatusChange, onDelete }) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'subs'>('jobs');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const selectedLead = leads.find(l => l.id === selectedLeadId);

  // Stats
  const totalRevenue = leads.reduce((acc, lead) => acc + (lead.status === JobStatus.Completed ? lead.quoteAmount : 0), 0);
  const newJobs = leads.filter(l => l.status === JobStatus.New).length;
  const activeSubs = subcontractors.filter(s => s.available).length;

  const chartData = [
    { name: 'New', count: leads.filter(l => l.status === JobStatus.New).length },
    { name: 'Contacted', count: leads.filter(l => l.status === JobStatus.Contacted).length },
    { name: 'Quoted', count: leads.filter(l => l.status === JobStatus.Quoted).length },
    { name: 'Booked', count: leads.filter(l => l.status === JobStatus.Booked).length },
    { name: 'Completed', count: leads.filter(l => l.status === JobStatus.Completed).length },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.New: return 'bg-blue-100 text-blue-800';
      case JobStatus.Contacted: return 'bg-yellow-100 text-yellow-800';
      case JobStatus.Quoted: return 'bg-purple-100 text-purple-800';
      case JobStatus.Booked: return 'bg-green-100 text-green-800';
      case JobStatus.Completed: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Cleaning Admin Dashboard</h1>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button 
                onClick={() => setActiveTab('jobs')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'jobs' ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
            >
                Quote Requests
            </button>
            <button 
                onClick={() => setActiveTab('subs')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'subs' ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
            >
                Subcontractors
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Revenue (Closed)</p>
              <p className="text-2xl font-black text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
             <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">New Leads</p>
              <p className="text-2xl font-black text-gray-900">{newJobs}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
             <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Available Subs</p>
              <p className="text-2xl font-black text-gray-900">{activeSubs}</p>
            </div>
          </div>
        </div>

        {activeTab === 'jobs' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="font-bold text-gray-800">Quotes & Lead Pipeline</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">ZIP</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => setSelectedLeadId(lead.id)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900">{lead.customerName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.zipCode}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.serviceType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-md ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-brand-600 hover:text-brand-900 bg-brand-50 p-2 rounded-lg">
                           <Info className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'subs' && (
             <div className="grid lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h3 className="font-bold text-gray-800">Subcontractor Directory</h3>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {subcontractors.map(sub => (
                            <li key={sub.id} className="p-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{sub.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-900 font-black">{sub.rating} ★</p>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${sub.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {sub.available ? 'Ready' : 'In Field'}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                 </div>
                 
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit">
                    <h3 className="font-bold text-gray-800 mb-6">Pipeline Status</h3>
                    <div className="h-64">
                       <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={chartData}>
                               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                               <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} />
                               <YAxis axisLine={false} tickLine={false} fontSize={10} />
                               <Tooltip 
                                 contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                               />
                               <Bar dataKey="count" fill="#0284c7" radius={[4, 4, 0, 0]} />
                           </BarChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
             </div>
        )}

        {selectedLead && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Lead Details</h3>
                            <p className="text-xs text-gray-500 font-medium">Reference ID: {selectedLead.id}</p>
                        </div>
                        <button onClick={() => setSelectedLeadId(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <X className="h-6 w-6 text-gray-500" />
                        </button>
                    </div>
                    
                    <div className="p-6 overflow-y-auto flex-grow space-y-8">
                        <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <label className="block text-xs font-black text-brand-700 uppercase tracking-widest mb-2">Update Pipeline Status</label>
                                <select 
                                    className="bg-white border border-brand-200 rounded-xl px-4 py-2 font-bold text-gray-900 focus:ring-2 focus:ring-brand-500 outline-none"
                                    value={selectedLead.status}
                                    onChange={(e) => onStatusChange(selectedLead.id, e.target.value as JobStatus)}
                                >
                                    {Object.values(JobStatus).map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => onDelete(selectedLead.id)}
                                    className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" /> Delete
                                </button>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Contact Info</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gray-100 p-2 rounded-lg"><Users className="h-4 w-4 text-gray-600" /></div>
                                            <span className="font-bold text-gray-900">{selectedLead.customerName}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gray-100 p-2 rounded-lg"><Mail className="h-4 w-4 text-gray-600" /></div>
                                            <span className="text-gray-700 text-sm">{selectedLead.email}</span>
                                        </div>
                                        <button onClick={() => copyToClipboard(selectedLead.email)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-brand-600"><Copy className="h-4 w-4" /></button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Job Details</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between"><span className="text-gray-500">Service:</span> <span className="font-bold text-gray-900">{selectedLead.serviceType}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">ZIP Code:</span> <span className="font-bold text-gray-900">{selectedLead.zipCode}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Frequency:</span> <span className="font-bold text-gray-900">{selectedLead.frequency}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Proposed Date:</span> <span className="font-bold text-gray-900">{selectedLead.date}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                             <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Add-Ons & Instructions</h4>
                             <div className="flex flex-wrap gap-2">
                                {selectedLead.addOns && selectedLead.addOns.length > 0 ? (
                                    selectedLead.addOns.map(addon => (
                                        <span key={addon} className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-bold border border-brand-100">{addon}</span>
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-400 italic">No add-ons selected</span>
                                )}
                             </div>
                             <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-sm text-gray-700 italic leading-relaxed">
                                    {selectedLead.instructions || "No special instructions provided."}
                                </p>
                             </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Estimated Quote:</span>
                            <span className="text-xl font-black text-brand-700">${selectedLead.quoteAmount}</span>
                        </div>
                        <button 
                            onClick={() => setSelectedLeadId(null)}
                            className="bg-brand-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-brand-500/20"
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;