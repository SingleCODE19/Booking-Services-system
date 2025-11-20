import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { Service } from '../types';
import BookingModal from '../components/BookingModal';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../types';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { addBooking } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookClick = (service: Service) => {
    if (!user) {
      navigate(AppRoutes.LOGIN);
      return;
    }
    setSelectedService(service);
  };

  const handleBookingSubmit = (data: any) => {
    if (!user || !selectedService) return;
    
    addBooking({
      id: Date.now().toString(),
      userId: user.id,
      userName: data.name,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      areaSqFt: data.area,
      totalCost: data.area * selectedService.pricePerSqFt,
      date: data.date,
      status: 'Pending',
      address: 'Pending Address', // Simplified for modal
      phone: data.phone
    });
  };

  const getUnitText = (id: string) => {
    if (id === 'home-cleaning-room') return 'per room';
    if (id === 'home-cleaning-house') return 'whole house';
    return 'per sq ft';
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
          <div className="w-16 h-1 bg-white mx-auto rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-[#0B101B] border border-slate-800 rounded-xl p-6 flex flex-col h-full hover:border-slate-600 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{service.name}</h3>
                <span className="text-2xl font-bold text-white">₹{service.pricePerSqFt}</span>
              </div>
              
              <p className="text-gray-400 text-sm mb-4 flex-grow mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex items-end justify-between mt-auto">
                 <span className="text-gray-500 text-xs">{getUnitText(service.id)}</span>
              </div>
              
              <button 
                onClick={() => handleBookClick(service)}
                className="w-full bg-gray-100 text-black font-bold py-3 rounded-lg mt-4 hover:bg-white transition-colors"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <BookingModal 
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default Services;