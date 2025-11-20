import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { SERVICES } from '../constants';
import { AppRoutes, Booking } from '../types';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { bookings, addBooking, getUserBookings, isLoading: isDataLoading } = useData();
  const navigate = useNavigate();
  
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [date, setDate] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not logged in (wait for auth check)
  if (!isAuthLoading && !user) {
    navigate(AppRoutes.LOGIN);
    return null;
  }

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-500 w-12 h-12" />
      </div>
    );
  }

  // Safe check for user existence after loading
  if (!user) return null;

  const userBookings = getUserBookings(user.id);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return;

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      serviceId: service.id,
      serviceName: service.name,
      areaSqFt: parseInt(area),
      totalCost: parseInt(area) * service.pricePerSqFt,
      date,
      status: 'Pending',
      address,
      phone
    };

    await addBooking(newBooking);
    setIsSubmitting(false);
    setActiveTab('history');
    
    // Reset form
    setArea('');
    setAddress('');
    setDate('');
    setPhone('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'Confirmed': return 'text-blue-400 bg-blue-400/10';
      case 'Completed': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getUnitLabel = (id: string) => {
    if (id === 'home-cleaning-room') return 'rooms';
    if (id === 'home-cleaning-house') return 'package';
    return 'sq.ft';
  };

  const getInputLabel = (id: string) => {
    if (id === 'home-cleaning-room') return 'Number of Rooms';
    if (id === 'home-cleaning-house') return 'Quantity (1 for whole house)';
    return 'Area (Sq. Ft)';
  };

  const getDisplayUnit = (booking: Booking) => {
      if (booking.serviceId === 'home-cleaning-room') return 'rooms';
      if (booking.serviceId === 'home-cleaning-house') return 'package';
      return 'sq.ft';
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white">Hello, {user.name}</h1>
            <p className="text-gray-400">Manage your stone care services</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button 
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'new' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}
            >
              New Booking
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'history' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}
            >
              My Bookings
            </button>
          </div>
        </div>

        {activeTab === 'new' ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="text-amber-400" /> Schedule Service
              </h2>
              <form onSubmit={handleBook} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Service Type</label>
                  <select 
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.name} (₹{s.pricePerSqFt}/{getUnitLabel(s.id)})</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">{getInputLabel(serviceId)}</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none"
                      placeholder={serviceId === 'home-cleaning-house' ? "1" : "Enter value"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Preferred Date</label>
                    <input 
                      type="date" 
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none"
                    placeholder="Enter your contact number"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Service Address</label>
                  <textarea 
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter full address within Jaipur"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none"
                  ></textarea>
                </div>
                
                {area && serviceId && (
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 flex justify-between items-center">
                    <span className="text-gray-400">Estimated Cost:</span>
                    <span className="text-2xl font-bold text-amber-400">
                      ₹{(parseInt(area) * (SERVICES.find(s => s.id === serviceId)?.pricePerSqFt || 0)).toLocaleString()}
                    </span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg shadow-lg flex justify-center items-center"
                >
                  {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20}/> : null}
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl flex flex-col justify-center items-center text-center space-y-4">
              <MapPin className="text-amber-400 w-12 h-12" />
              <h3 className="text-xl font-bold text-white">Service Area: Jaipur</h3>
              <p className="text-gray-400">
                We currently serve all areas within Jaipur city limits, including Jhotwara, Vaishali Nagar, Mansarovar, and Malviya Nagar.
              </p>
              <div className="w-full h-48 bg-slate-900 rounded-lg overflow-hidden relative mt-4">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.07696436283!2d75.73263016696058!3d26.915380672822657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4164e54d3c5%3A0x862a9676483733c!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1709538421983!5m2!1sen!2sin" 
                   width="100%" 
                   height="100%" 
                   style={{border:0}} 
                   loading="lazy"
                   title="Jaipur Map"
                 ></iframe>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {isDataLoading ? (
               <div className="flex justify-center py-20">
                 <Loader2 className="animate-spin text-amber-500 w-8 h-8" />
               </div>
            ) : userBookings.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <Clock className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No bookings found. Schedule your first service today!</p>
              </div>
            ) : (
              userBookings.map(booking => (
                <div key={booking.id} className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white">{booking.serviceName}</h3>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm flex items-center gap-4">
                      <span className="flex items-center gap-1"><Calendar size={14}/> {booking.date}</span>
                      <span className="flex items-center gap-1"><MapPin size={14}/> {booking.areaSqFt} {getDisplayUnit(booking)}</span>
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{booking.address}</p>
                  </div>
                  <div className="text-right w-full md:w-auto">
                    <div className="text-2xl font-bold text-amber-400">₹{booking.totalCost.toLocaleString()}</div>
                    {booking.status === 'Pending' && (
                      <div className="text-xs text-gray-500 mt-1 flex items-center justify-end gap-1">
                        <AlertCircle size={12} /> Waiting for confirmation
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;