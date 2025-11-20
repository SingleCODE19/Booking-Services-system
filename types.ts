export interface Service {
  id: string;
  name: string;
  pricePerSqFt: number;
  description: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  serviceId: string;
  serviceName: string;
  areaSqFt: number;
  totalCost: number;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  address: string;
  phone: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  mobile: string;
  serviceType: string;
  details: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export enum AppRoutes {
  HOME = '/',
  SERVICES = '/services',
  CALCULATOR = '/calculator',
  ABOUT = '/about',
  LOGIN = '/login',
  REGISTER = '/register',
  DASHBOARD = '/dashboard',
  ADMIN = '/admin',
  BOOKING = '/book',
  CONTACT = '/contact'
}