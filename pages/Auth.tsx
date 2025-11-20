import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppRoutes } from '../types';
import { Loader2 } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = isLogin ? email.split('@')[0] : name;
    await login(email, finalName);
    navigate(AppRoutes.DASHBOARD);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 pt-20">
      <div className="bg-[#0B101B] border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-8">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-white mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-transparent border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-white focus:ring-0 transition-colors placeholder-slate-600"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-white mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-white focus:ring-0 transition-colors placeholder-slate-600"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-white mb-2">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full bg-transparent border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-white focus:ring-0 transition-colors placeholder-slate-600"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-white mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              className="w-full bg-transparent border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-white focus:ring-0 transition-colors placeholder-slate-600"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 rounded-lg transition-colors mt-4 flex justify-center items-center"
          >
            {isLoading ? <Loader2 className="animate-spin mr-2" size={20}/> : null}
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            disabled={isLoading}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            {isLogin ? (
              <>Don't have an account? <span className="text-white font-bold">Sign Up</span></>
            ) : (
              <>Already have an account? <span className="text-white font-bold">Sign In</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
