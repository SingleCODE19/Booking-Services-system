import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { getStoneCareAdvice } from '../services/geminiService';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your Stone Care Assistant. Ask me about cleaning tips, polish types, or our services.", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getStoneCareAdvice(input);
    
    setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* FAB */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-xl shadow-amber-500/20 z-50 transition-all hover:scale-110"
      >
        {isOpen ? <X /> : <MessageSquare />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden max-h-[600px]">
          
          {/* Header */}
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-amber-400" size={18} />
              <h3 className="text-white font-semibold">Stone Care AI Expert</h3>
            </div>
            <span className="text-xs text-green-400 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
              Online
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-900/90 min-h-[300px] max-h-[400px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-amber-500 text-white rounded-br-none' 
                    : 'bg-slate-800 text-gray-200 border border-slate-700 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl rounded-bl-none">
                  <Loader2 className="animate-spin text-amber-400" size={18} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-800 border-t border-slate-700">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                className="flex-1 bg-slate-900 border border-slate-600 rounded-full px-4 py-2 text-white focus:outline-none focus:border-amber-500 text-sm"
                placeholder="Ask about polishing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white p-2 rounded-full transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="text-[10px] text-gray-500 text-center mt-2">
              Powered by Gemini AI. Advice is for informational purposes.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;