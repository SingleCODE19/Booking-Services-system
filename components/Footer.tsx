import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-gray-400">
            <li><Link to={AppRoutes.ABOUT} className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to={AppRoutes.SERVICES} className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to={AppRoutes.CONTACT} className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to={AppRoutes.CALCULATOR} className="hover:text-white transition-colors">Price Calculator</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-6">Contact Info</h3>
          <ul className="space-y-4 text-gray-400">
            <li>Phone: +91 {CONTACT_INFO.phone.slice(0,3)} {CONTACT_INFO.phone.slice(3,6)} {CONTACT_INFO.phone.slice(6)}</li>
            <li>Email: {CONTACT_INFO.email}</li>
            <li>Address: 223A, Vaishnav Vihar, Jaipur</li>
          </ul>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-lg font-bold mb-6">Working Hours</h3>
          <ul className="space-y-4 text-gray-400">
            <li>Monday - Saturday: 9:00 AM - 7:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-900 mt-12 pt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Arjun Marble Polish. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;