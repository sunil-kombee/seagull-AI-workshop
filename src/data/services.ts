import type { LucideIcon } from "lucide-react";
import {
  PlaneTakeoff,
  Ticket,
  Car,
  Users,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  icon?: LucideIcon;
  dataAiHint: string;
  rating?: number;
  reviews?: number;
  featured?: boolean;
  weeklyDeal?: boolean;
  popular?: boolean;
}

export const serviceCategories = [
  {
    name: "Airport Transfers",
    icon: PlaneTakeoff,
    slug: "airport-transfers",
    dataAiHint: "airport transport",
  },
  {
    name: "Activity Tickets",
    icon: Ticket,
    slug: "activity-tickets",
    dataAiHint: "event ticket",
  },
  {
    name: "Car Rentals",
    icon: Car,
    slug: "car-rentals",
    dataAiHint: "vehicle rental",
  },
  {
    name: "Tour Guides",
    icon: Users,
    slug: "tour-guides",
    dataAiHint: "guide person",
  },
  {
    name: "SIM Cards",
    icon: Smartphone,
    slug: "sim-cards",
    dataAiHint: "mobile chip",
  },
  {
    name: "Travel Insurance",
    icon: ShieldCheck,
    slug: "travel-insurance",
    dataAiHint: "insurance policy",
  },
];

export const mockServices: Service[] = [
  {
    id: "1",
    name: "Airport Transfer - City Center",
    description: "Comfortable private transfer to your hotel.",
    longDescription:
      "Enjoy a seamless and comfortable private transfer from the airport directly to your hotel in the city center. Our professional drivers will meet you at arrivals and assist with your luggage, ensuring a stress-free start to your trip. Vehicles are modern, air-conditioned, and regularly sanitized.",
    price: 50,
    currency: "USD",
    image: "https://placehold.co/600x400.png",
    category: "Airport Transfers",
    icon: PlaneTakeoff,
    dataAiHint: "airport car",
    rating: 4.8,
    reviews: 120,
    featured: true,
    popular: true,
  },
  {
    id: "2",
    name: "Eiffel Tower Summit Ticket",
    description: "Skip-the-line access to the Eiffel Tower.",
    longDescription:
      "Experience breathtaking panoramic views of Paris from the summit of the Eiffel Tower. With these skip-the-line tickets, you save valuable time and head straight for the elevators. An unforgettable experience for any visitor to Paris.",
    price: 75,
    currency: "EUR",
    image: "https://placehold.co/600x400.png",
    category: "Activity Tickets",
    icon: Ticket,
    dataAiHint: "landmark ticket",
    rating: 4.9,
    reviews: 350,
    featured: true,
    weeklyDeal: true,
  },
  {
    id: "3",
    name: "Full Day Car Rental with Driver",
    description: "Explore the city with a personal driver.",
    longDescription:
      "Discover the city highlights at your own pace with our full-day car rental service, complete with a professional, English-speaking driver. Customize your itinerary and enjoy the convenience and comfort of a private vehicle. Ideal for families or small groups.",
    price: 200,
    currency: "USD",
    image: "https://placehold.co/600x400.png",
    category: "Car Rentals",
    icon: Car,
    dataAiHint: "city car",
    rating: 4.7,
    reviews: 85,
    weeklyDeal: true,
  },
  {
    id: "4",
    name: "Historical City Walking Tour",
    description: "Discover hidden gems with an expert guide.",
    longDescription:
      "Join our acclaimed historical walking tour and uncover the secrets of the city with a knowledgeable local guide. This 3-hour tour covers major landmarks and hidden alleyways, offering fascinating stories and insights into the city's past. Small group sizes ensure a personal experience.",
    price: 40,
    currency: "EUR",
    image: "https://placehold.co/600x400.png",
    category: "Tour Guides",
    icon: Users,
    dataAiHint: "city tour",
    rating: 4.6,
    reviews: 210,
    popular: true,
  },
  {
    id: "5",
    name: "Global Unlimited Data SIM Card",
    description: "Stay connected in over 100 countries.",
    longDescription:
      "Never worry about roaming charges again! Our global SIM card offers unlimited data in over 100 countries. Easy activation and top-up options available. Perfect for frequent travelers or multi-country trips. Supports 4G/LTE speeds where available.",
    price: 30,
    currency: "USD",
    image: "https://placehold.co/600x400.png",
    category: "SIM Cards",
    icon: Smartphone,
    dataAiHint: "sim card",
    rating: 4.5,
    reviews: 150,
    popular: true,
  },
  {
    id: "6",
    name: "Comprehensive Travel Insurance",
    description: "Travel with peace of mind and full coverage.",
    longDescription:
      "Our comprehensive travel insurance plan covers medical emergencies, trip cancellations, lost baggage, and more. Get 24/7 assistance worldwide. Simple claims process. Suitable for individuals, couples, and families. Choose the plan that best fits your travel needs.",
    price: 60,
    currency: "USD",
    image: "https://placehold.co/600x400.png",
    category: "Travel Insurance",
    icon: ShieldCheck,
    dataAiHint: "travel insurance",
    rating: 4.8,
    reviews: 95,
    featured: true,
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return mockServices.find((service) => service.id === id);
};
