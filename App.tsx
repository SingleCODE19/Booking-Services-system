import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { AppRoutes } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import CalculatorPage from './pages/CalculatorPage';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import AIChat from './components/AIChat';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-white selection:text-black">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path={AppRoutes.HOME} element={<Home />} />
                <Route path={AppRoutes.SERVICES} element={<Services />} />
                <Route path={AppRoutes.ABOUT} element={<About />} />
                <Route path={AppRoutes.CALCULATOR} element={<CalculatorPage />} />
                <Route path={AppRoutes.LOGIN} element={<Auth />} />
                <Route path={AppRoutes.REGISTER} element={<Auth />} />
                <Route path={AppRoutes.DASHBOARD} element={<Dashboard />} />
                <Route path={AppRoutes.ADMIN} element={<AdminDashboard />} />
                <Route path={AppRoutes.CONTACT} element={<Contact />} />
                <Route path="*" element={<Navigate to={AppRoutes.HOME} replace />} />
              </Routes>
            </main>
            
            <AIChat />
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;