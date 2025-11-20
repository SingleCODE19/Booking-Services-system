import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { Service } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onSubmit: (data: any) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, service, onSubmit }) => {
  const [area, setArea] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');

  if (!isOpen || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      serviceId: service.id,
      area: parseInt(area),
      name,
      phone,
      date
    });
    onClose();
  };

  const getLabel = (id: string) => {
    if (id === 'home-cleaning-room') return 'Number of Rooms';
    if (id === 'home-cleaning-house') return 'Quantity (Enter 1)';
    return 'Area (in sq ft)';
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white">Book {service.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-white mb-2">{getLabel(service.id)}</label>
            <div className="relative">
              <input
                type="number"
                required
                min="1"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-transparent border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-white focus:ring-0 transition-colors placeholder-slate-600"
                placeholder={service.id === 'home-cleaning-house' ? "1" : "Enter value"}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-white focus:ring-0 transition-colors placeholder-slate-600"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2">Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-white focus:ring-0 transition-colors placeholder-slate-600"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2">Preferred Date</label>
            <div className="relative">
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-white focus:ring-0 transition-colors placeholder-slate-600 appearance-none"
              />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded-lg mt-4 hover:bg-gray-200 transition-colors"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;