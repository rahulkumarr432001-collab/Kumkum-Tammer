export interface Costume {
  id: string;
  name: string;
  category: string;
  image: string;
  priceRent: number;
  priceBuy: number;
  sizes: string[];
  description: string;
  accessoriesIncluded: string[];
  materials: string;
  popularity: number; // 1 to 5 rating or popularity index
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string; // Lucide icon name
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Parent of 5yo", "School Coordinator"
  content: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface BookingInquiry {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  costumeId: string;
  costumeName: string;
  rentalDate: string;
  durationDays: number;
  inquiryType: 'rental' | 'purchase';
  childAge: number;
  childHeightCm?: number;
  message?: string;
  status: 'Pending' | 'Approved' | 'Completed';
  createdAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
