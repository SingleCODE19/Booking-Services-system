import { Booking, ContactMessage, QuoteRequest, User } from '../types';

// Database Simulation Service
// This mimics a backend API. In the future, you can replace the localStorage logic
// inside these functions with Firebase/Supabase API calls without breaking the rest of the app.

const DB_KEYS = {
  BOOKINGS: 'arjun_marble_bookings',
  MESSAGES: 'arjun_marble_messages',
  QUOTES: 'arjun_marble_quotes',
  USERS: 'arjun_marble_users',
  CURRENT_USER: 'arjun_marble_user'
};

const DELAY_MS = 600; // Simulate network latency

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const db = {
  // --- Users ---
  async getCurrentUser(): Promise<User | null> {
    await delay(200);
    const stored = localStorage.getItem(DB_KEYS.CURRENT_USER);
    return stored ? JSON.parse(stored) : null;
  },

  async loginUser(email: string, name: string): Promise<User> {
    await delay(DELAY_MS);
    const role = email === 'admin@arjun.com' ? 'admin' : 'user';
    const user: User = {
      id: email, // simple ID strategy
      name,
      email,
      role,
    };
    localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
    return user;
  },

  async logoutUser(): Promise<void> {
    await delay(200);
    localStorage.removeItem(DB_KEYS.CURRENT_USER);
  },

  // --- Bookings ---
  async getBookings(): Promise<Booking[]> {
    await delay(DELAY_MS);
    const stored = localStorage.getItem(DB_KEYS.BOOKINGS);
    return stored ? JSON.parse(stored) : [];
  },

  async createBooking(booking: Booking): Promise<Booking> {
    await delay(DELAY_MS);
    const bookings = await this.getBookings();
    const newBookings = [booking, ...bookings];
    localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify(newBookings));
    return booking;
  },

  async updateBookingStatus(id: string, status: Booking['status']): Promise<void> {
    await delay(DELAY_MS);
    const bookings = await this.getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(DB_KEYS.BOOKINGS, JSON.stringify(updated));
  },

  // --- Messages ---
  async getMessages(): Promise<ContactMessage[]> {
    await delay(DELAY_MS);
    const stored = localStorage.getItem(DB_KEYS.MESSAGES);
    return stored ? JSON.parse(stored) : [];
  },

  async createMessage(message: ContactMessage): Promise<ContactMessage> {
    await delay(DELAY_MS);
    const messages = await this.getMessages();
    const newMessages = [message, ...messages];
    localStorage.setItem(DB_KEYS.MESSAGES, JSON.stringify(newMessages));
    return message;
  },

  // --- Quotes ---
  async getQuotes(): Promise<QuoteRequest[]> {
    await delay(DELAY_MS);
    const stored = localStorage.getItem(DB_KEYS.QUOTES);
    return stored ? JSON.parse(stored) : [];
  }
};
