import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AppRoutes } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate(AppRoutes.HOME);
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Services', path: AppRoutes.SERVICES },
    { name: 'Price Calculator', path: AppRoutes.CALCULATOR },
    { name: 'Contact', path: AppRoutes.CONTACT },
    { name: 'About', path: AppRoutes.ABOUT },
  ];

  const isAuthPage = location.pathname === AppRoutes.LOGIN || location.pathname === AppRoutes.REGISTER;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isAuthPage ? 'bg-black py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(AppRoutes.HOME)}>
            <h1 className="text-white font-bold text-2xl tracking-tight">
              Arjun Marble Polish
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to={AppRoutes.ADMIN} className="text-amber-400 hover:text-amber-300 text-sm font-bold flex items-center gap-1">
                    <ShieldCheck size={16} /> Admin Panel
                  </Link>
                )}
                <Link to={AppRoutes.DASHBOARD} className="text-gray-300 hover:text-white text-sm font-medium">Dashboard</Link>
                <button onClick={handleLogout} className="text-gray-300 hover:text-white text-sm font-medium">
                  Logout
                </button>
              </>
            ) : (
              <Link to={AppRoutes.LOGIN} className="text-gray-300 hover:text-white text-sm font-medium">
                Sign In
              </Link>
            )}

            <Link 
              to={AppRoutes.SERVICES} 
              className="bg-white text-black px-5 py-2.5 rounded text-sm font-bold hover:bg-gray-200 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black absolute w-full border-t border-gray-800">
          <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)} 
                className="text-gray-300 hover:text-white text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <>
                 {user.role === 'admin' && (
                  <Link 
                    to={AppRoutes.ADMIN} 
                    onClick={() => setIsOpen(false)} 
                    className="text-amber-400 hover:text-amber-300 text-base font-bold flex items-center gap-2"
                  >
                     <ShieldCheck size={18} /> Admin Panel
                  </Link>
                )}
                <Link to={AppRoutes.DASHBOARD} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white text-base font-medium">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-gray-300 hover:text-white text-base font-medium">
                   Logout
                </button>
              </>
            ) : (
              <Link to={AppRoutes.LOGIN} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white text-base font-medium">
                 Sign In
              </Link>
            )}
             <Link 
              to={AppRoutes.SERVICES} 
              onClick={() => setIsOpen(false)}
              className="bg-white text-black px-6 py-3 rounded text-sm font-bold hover:bg-gray-200 transition-colors w-full text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;