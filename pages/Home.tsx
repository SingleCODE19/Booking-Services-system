import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover brightness-[0.3]"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
            Premium Marble & Stone Polishing Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Transform your surfaces with our professional polishing expertise
          </p>
          <div className="pt-8">
            <Link 
              to={AppRoutes.SERVICES} 
              className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-transform hover:-translate-y-1 inline-block"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;