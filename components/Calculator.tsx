import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../types';
import { ChevronDown } from 'lucide-react';

const Calculator: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [area, setArea] = useState<string>('');
  const navigate = useNavigate();

  const selectedService = SERVICES.find(s => s.id === selectedServiceId);
  const totalCost = selectedService && area ? parseInt(area) * selectedService.pricePerSqFt : 0;

  const getUnitLabel = (id: string) => {
    if (id === 'home-cleaning-room') return 'room';
    if (id === 'home-cleaning-house') return 'package';
    return 'sq ft';
  };

  const getInputLabel = (id: string) => {
    if (id === 'home-cleaning-room') return 'Number of Rooms';
    if (id === 'home-cleaning-house') return 'Quantity';
    return 'Area (in sq ft)';
  };

  const handleBook = () => {
    navigate(AppRoutes.SERVICES);
  };

  return (
    <div className="bg-[#0B101B] border border-slate-800 rounded-xl p-8 shadow-2xl max-w-3xl mx-auto">
      <div className="space-y-8">
        {/* Service Selection */}
        <div>
          <label className="block text-sm font-bold text-white mb-3">Select Service</label>
          <div className="relative">
            <select
              className="w-full bg-black border border-slate-700 rounded-lg px-4 py-4 text-white appearance-none focus:border-white focus:outline-none transition-colors cursor-pointer"
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
            >
              {SERVICES.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} (₹{service.pricePerSqFt} per {getUnitLabel(service.id)})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        {/* Area Input */}
        <div>
          <label className="block text-sm font-bold text-white mb-3">
            {selectedService ? getInputLabel(selectedService.id) : 'Area'}
          </label>
          <input
            type="number"
            className="w-full bg-black border border-slate-700 rounded-lg px-4 py-4 text-white placeholder-slate-500 focus:border-white focus:outline-none transition-colors"
            placeholder={selectedService?.id === 'home-cleaning-house' ? "Enter 1" : "Enter area"}
            value={area}
            onChange={(e) => setArea(e.target.value)}
            min="0"
          />
        </div>

        {/* Result Box */}
        <div className="bg-[#161b28] rounded-lg p-10 text-center mt-8 border border-slate-800">
          <p className="text-gray-400 text-lg mb-2 font-medium">Estimated Price</p>
          <div className="text-6xl font-bold text-white tracking-tight">
            ₹{totalCost.toLocaleString()}
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBook}
          className="w-full bg-gray-100 text-black font-bold text-lg py-4 rounded-lg hover:bg-white transition-colors mt-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Book This Service
        </button>
      </div>
    </div>
  );
};

export default Calculator;