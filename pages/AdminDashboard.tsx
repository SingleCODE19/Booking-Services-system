import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, Booking } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Phone,
  Mail,
  MapPin,
  Loader2
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { bookings, messages, updateBookingStatus, isLoading: isDataLoading } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'bookings' | 'messages'>('bookings');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (isAuthLoading) {
    return <div className="min-h-screen bg-slate-950 flex justify-center items-center"><Loader2 className="animate-spin text-amber-500" /></div>;
  }

  if (!user || user.role !== 'admin') {
    navigate(AppRoutes.HOME);
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Confirmed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Completed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSearch = booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = bookings
    .filter(b => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + b.totalCost, 0);

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage business operations</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-gray-400 text-xs uppercase font-bold">Total Revenue</p>
              <p className="text-2xl font-bold text-green-400">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-gray-400 text-xs uppercase font-bold">Active Bookings</p>
              <p className="text-2xl font-bold text-amber-400">{bookings.filter(b => b.status === 'Pending' || b.status === 'Confirmed').length}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-800 pb-1">
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 rounded-t-lg font-medium flex items-center gap-2 transition-colors ${activeTab === 'bookings' ? 'bg-slate-800 text-white border-t border-x border-slate-700' : 'text-gray-400 hover:text-white'}`}
          >
            <Calendar size={18} /> Bookings
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 rounded-t-lg font-medium flex items-center gap-2 transition-colors ${activeTab === 'messages' ? 'bg-slate-800 text-white border-t border-x border-slate-700' : 'text-gray-400 hover:text-white'}`}
          >
            <MessageSquare size={18} /> Messages <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{messages.length}</span>
          </button>
        </div>

        {isDataLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-amber-500 w-8 h-8" />
          </div>
        )}

        {/* Bookings Tab */}
        {!isDataLoading && activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['all', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors whitespace-nowrap ${
                      filterStatus === status 
                        ? 'bg-amber-500 border-amber-500 text-white' 
                        : 'bg-slate-900 border-slate-700 text-gray-400 hover:bg-slate-800'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-amber-500 focus:outline-none w-full md:w-64"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-800 text-gray-400 text-sm uppercase">
                      <th className="p-4">Customer</th>
                      <th className="p-4">Service Info</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white">{booking.userName}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1"><Phone size={12} /> {booking.phone}</div>
                          <div className="text-xs text-gray-600 mt-1 max-w-[200px] truncate">{booking.address}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-white font-medium">{booking.serviceName}</div>
                          <div className="text-sm text-gray-500">{booking.areaSqFt} sq.ft</div>
                        </td>
                        <td className="p-4 text-gray-300">{booking.date}</td>
                        <td className="p-4 text-amber-400 font-bold">₹{booking.totalCost.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            {booking.status === 'Pending' && (
                              <>
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                                  className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg border border-blue-500/30"
                                  title="Confirm"
                                >
                                  <CheckCircle size={18} />
                                </button>
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                                  className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg border border-red-500/30"
                                  title="Cancel"
                                >
                                  <XCircle size={18} />
                                </button>
                              </>
                            )}
                            {booking.status === 'Confirmed' && (
                              <button 
                                onClick={() => updateBookingStatus(booking.id, 'Completed')}
                                className="p-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg border border-green-500/30 flex items-center gap-1"
                              >
                                <CheckCircle size={18} /> <span className="text-xs font-bold">Complete</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredBookings.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-500">
                          No bookings found matching filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {!isDataLoading && activeTab === 'messages' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-600 transition-all shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-lg">
                      {msg.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{msg.name}</h3>
                      <p className="text-xs text-gray-500">{msg.date}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail size={14} className="text-amber-500" /> {msg.email || 'No email'}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone size={14} className="text-amber-500" /> {msg.phone}
                  </div>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-gray-300 text-sm italic">
                  "{msg.message}"
                </div>
                <div className="mt-4 flex justify-end">
                  <a 
                    href={`tel:${msg.phone}`}
                    className="text-xs bg-white text-black px-3 py-2 rounded font-bold hover:bg-gray-200 transition-colors"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                <MessageSquare className="mx-auto mb-4 opacity-20" size={48} />
                <p>No messages received yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
