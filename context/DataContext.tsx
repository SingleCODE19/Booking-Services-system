import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Booking, QuoteRequest, ContactMessage } from '../types';
import { db } from '../services/db';
import { useAuth } from './AuthContext';

interface DataContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => Promise<void>;
  updateBookingStatus: (id: string, status: Booking['status']) => Promise<void>;
  quotes: QuoteRequest[];
  messages: ContactMessage[];
  addMessage: (message: ContactMessage) => Promise<void>;
  getUserBookings: (userId: string) => Booking[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const loadData = async () => {
    // We only strictly need to load data if logged in, 
    // but for this demo we'll load public data (bookings) to check status
    setIsLoading(true);
    try {
      const [loadedBookings, loadedMessages, loadedQuotes] = await Promise.all([
        db.getBookings(),
        db.getMessages(),
        db.getQuotes()
      ]);
      
      setBookings(loadedBookings);
      // Only show messages/quotes to admin actually, but we filter in UI
      setMessages(loadedMessages);
      setQuotes(loadedQuotes);
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []); // Initial load

  const addBooking = async (booking: Booking) => {
    setIsLoading(true);
    await db.createBooking(booking);
    await loadData(); // Refresh state
  };

  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    // Optimistic update for better UX
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    await db.updateBookingStatus(id, status);
  };

  const addMessage = async (message: ContactMessage) => {
    await db.createMessage(message);
    await loadData();
  };

  const getUserBookings = (userId: string) => {
    return bookings.filter(b => b.userId === userId);
  };

  // We only expose addQuote placeholder as we haven't built that UI fully yet
  // but the interface requires it
  const quotesContext = {
    quotes,
    addQuote: async () => {} 
  };

  return (
    <DataContext.Provider value={{ 
      bookings, 
      addBooking, 
      updateBookingStatus,
      ...quotesContext,
      messages, 
      addMessage, 
      getUserBookings,
      isLoading,
      refreshData: loadData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
