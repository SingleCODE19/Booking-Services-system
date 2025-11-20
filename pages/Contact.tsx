import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'sent'>('idle');
  const { addMessage } = useData();

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Store message
    addMessage({
      id: Date.now().toString(),
      name,
      email,
      phone,
      message,
      date: new Date().toISOString().split('T')[0]
    });

    setTimeout(() => {
      setFormStatus('sent');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-gray-400">We are ready to answer your questions and provide a free quote.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500/20 p-3 rounded-lg text-amber-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Phone Number</h4>
                    <p className="text-xl font-bold text-white">{CONTACT_INFO.phone}</p>
                    <p className="text-sm text-gray-500">Mon-Sun: 9am - 8pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500/20 p-3 rounded-lg text-amber-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Email Address</h4>
                    <p className="text-white break-all">{CONTACT_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500/20 p-3 rounded-lg text-amber-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Office Address</h4>
                    <p className="text-white">{CONTACT_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-64 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.684915919952!2d75.7472809!3d26.9452093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db32c4a382e81%3A0x56610937510c6d77!2sJhotwara%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1709539000000" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen 
                loading="lazy" 
                title="Arjun Marble Location"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            {formStatus === 'sent' ? (
              <div className="bg-green-500/20 border border-green-500 text-green-400 p-6 rounded-lg text-center">
                <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                <p>Thank you for contacting us. We will get back to you shortly.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-4 text-sm underline">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Name</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Phone</label>
                    <input 
                      type="tel" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Message / Service Requirement</label>
                  <textarea 
                    rows={4} 
                    required 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg shadow-lg flex justify-center items-center gap-2"
                >
                  {formStatus === 'submitting' ? 'Sending...' : <><Send size={18} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;