import type { LucideIcon } from "lucide-react";
import {
  Users,
  Car,
  Ticket,
  Smartphone,
  ShieldCheck,
  Scissors,
  PawPrint,
  Sparkles,
  Home,
  CalendarCheck,
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
  icon?: string;
  dataAiHint: string;
  rating?: number;
  reviews?: number;
  featured?: boolean;
  weeklyDeal?: boolean;
  popular?: boolean;
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  serviceCoverage?: string[];
  process?: string[];
  reviewsList?: Array<{
    name: string;
    date: string;
    rating: number;
    text: string;
  }>;
  booking?: {
    pricePerSession: number;
    discount: number;
    addOns: Array<{ name: string; price: number }>;
    specialOffer?: string;
  };
}

export const serviceCategories = [
  {
    name: "Cleaning",
    icon: "sparkles",
    slug: "cleaning",
    dataAiHint: "home cleaning",
  },
  {
    name: "Haircut",
    icon: "scissors",
    slug: "haircut",
    dataAiHint: "haircut service",
  },
  {
    name: "Laundry",
    icon: "home",
    slug: "laundry",
    dataAiHint: "laundry service",
  },
  {
    name: "Pet Grooming",
    icon: "paw-print",
    slug: "pet-grooming",
    dataAiHint: "pet grooming",
  },
];

export const mockServices: Service[] = [
  {
    id: "1",
    name: "Professional Deep House Cleaning",
    description:
      "Expert cleaning services that leave your home spotless and refreshed.",
    longDescription:
      "Our deep cleaning service tackles dirt and grime in every corner of your home. Perfect for seasonal cleaning or before/after events. Our trained professionals use premium equipment and eco-friendly cleaning solutions.",
    price: 80,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    category: "Cleaning",
    icon: "sparkles",
    dataAiHint: "deep cleaning",
    rating: 4.9,
    reviews: 240,
    featured: true,
    features: [
      {
        icon: "users",
        title: "Professional Staff",
        description:
          "Background-checked, trained, and committed to excellence.",
      },
      {
        icon: "sparkles",
        title: "Eco-friendly Products",
        description: "Safe and effective cleaning solutions.",
      },
      {
        icon: "shield-check",
        title: "100% Satisfaction",
        description: "We guarantee your satisfaction with every cleaning.",
      },
    ],
    serviceCoverage: [
      "Floor cleaning",
      "Bathroom cleaning",
      "Kitchen cleaning",
      "Window cleaning",
      "Dusting",
      "Surface sanitization",
    ],
    process: [
      "Book your cleaning online",
      "Our team arrives on time",
      "We deep clean your home",
      "Enjoy your spotless space",
    ],
    reviewsList: [
      {
        name: "Sarah Johnson",
        date: "May 16, 2024",
        rating: 5,
        text: "The deep cleaning service was exceptional. Every corner of my home is spotless. Will definitely book again!",
      },
      {
        name: "Michael Chen",
        date: "May 15, 2024",
        rating: 5,
        text: "Professional staff and amazing results. I appreciate their attention to detail and eco-friendly products.",
      },
      {
        name: "Emily Rodriguez",
        date: "May 9, 2024",
        rating: 5,
        text: "Best cleaning service I’ve ever used. They transformed my home!",
      },
    ],
    booking: {
      pricePerSession: 80,
      discount: 0.2,
      addOns: [
        { name: "Deep Carpet Cleaning", price: 30 },
        { name: "Cabinet Organization", price: 20 },
      ],
      specialOffer: "Book 2 sessions and get 20% off your total purchase!",
    },
  },
  {
    id: "2",
    name: "Home Haircut & Styling",
    description:
      "Salon-quality haircut and styling in the comfort of your home.",
    longDescription:
      "Our professional stylists bring the salon to you! Get a fresh haircut, beard trim, or styling for any occasion. We use sanitized tools and premium products for all hair types.",
    price: 40,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    category: "Haircut",
    icon: "scissors",
    dataAiHint: "haircut",
    rating: 4.8,
    reviews: 180,
    featured: true,
    features: [
      {
        icon: "scissors",
        title: "Expert Stylists",
        description: "Experienced, friendly, and up-to-date with trends.",
      },
      {
        icon: "shield-check",
        title: "Sanitized Tools",
        description: "All equipment is sanitized before every appointment.",
      },
      {
        icon: "calendar-check",
        title: "Flexible Scheduling",
        description: "Book at your convenience, 7 days a week.",
      },
    ],
    serviceCoverage: [
      "Men's haircut",
      "Women's haircut",
      "Children's haircut",
      "Beard trim",
      "Hair styling",
    ],
    process: [
      "Book your appointment online",
      "Stylist arrives at your home",
      "Consultation and haircut/styling",
      "Enjoy your new look!",
    ],
    reviewsList: [
      {
        name: "Alex Kim",
        date: "May 14, 2024",
        rating: 5,
        text: "Super convenient and my haircut looks great!",
      },
      {
        name: "Priya Patel",
        date: "May 13, 2024",
        rating: 5,
        text: "The stylist was friendly and professional. Loved the experience.",
      },
      {
        name: "Tom Lee",
        date: "May 10, 2024",
        rating: 4,
        text: "Good value and very clean setup.",
      },
    ],
    booking: {
      pricePerSession: 40,
      discount: 0.1,
      addOns: [
        { name: "Beard Trim", price: 10 },
        { name: "Hair Wash", price: 8 },
      ],
      specialOffer: "Book for 2+ people and get 10% off!",
    },
  },
  {
    id: "3",
    name: "Laundry & Ironing Service",
    description:
      "Fresh, clean, and neatly ironed clothes delivered to your door.",
    longDescription:
      "We pick up, wash, dry, fold, and iron your clothes with care. Choose from regular or express service. Eco-friendly detergents and careful handling for all fabrics.",
    price: 25,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    category: "Laundry",
    icon: "home",
    dataAiHint: "laundry",
    rating: 4.7,
    reviews: 95,
    features: [
      {
        icon: "home",
        title: "Doorstep Pickup & Delivery",
        description: "We handle everything from start to finish.",
      },
      {
        icon: "sparkles",
        title: "Eco Detergents",
        description: "Safe for your clothes and the environment.",
      },
      {
        icon: "calendar-check",
        title: "Express Options",
        description: "Same-day or next-day delivery available.",
      },
    ],
    serviceCoverage: [
      "Washing",
      "Drying",
      "Folding",
      "Ironing",
      "Express delivery",
    ],
    process: [
      "Schedule your pickup online",
      "We collect your laundry",
      "Wash, dry, fold, and iron",
      "Delivered to your door",
    ],
    reviewsList: [
      {
        name: "Linda Brown",
        date: "May 13, 2024",
        rating: 5,
        text: "Clothes came back fresh and perfectly folded!",
      },
      {
        name: "Wei Zhang",
        date: "May 12, 2024",
        rating: 5,
        text: "Fast and reliable. Will use again.",
      },
      {
        name: "Fatima Al-Farsi",
        date: "May 11, 2024",
        rating: 4,
        text: "Affordable and convenient.",
      },
    ],
    booking: {
      pricePerSession: 25,
      discount: 0.15,
      addOns: [
        { name: "Express Delivery", price: 10 },
        { name: "Delicate Care", price: 5 },
      ],
      specialOffer: "Book weekly and get 15% off!",
    },
  },
  {
    id: "4",
    name: "Pet Grooming at Home",
    description: "Pamper your pet with a full grooming session at home.",
    longDescription:
      "Our certified groomers provide gentle and thorough grooming for dogs and cats. Includes bath, haircut, nail trim, and ear cleaning. Stress-free for your pet and convenient for you!",
    price: 60,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
    category: "Pet Grooming",
    icon: "paw-print",
    dataAiHint: "pet grooming",
    rating: 4.8,
    reviews: 110,
    features: [
      {
        icon: "paw-print",
        title: "Certified Groomers",
        description: "Experienced with all breeds and temperaments.",
      },
      {
        icon: "shield-check",
        title: "Pet-Safe Products",
        description: "Gentle, hypoallergenic shampoos and conditioners.",
      },
      {
        icon: "calendar-check",
        title: "Flexible Appointments",
        description: "Book at your convenience, weekends included.",
      },
    ],
    serviceCoverage: [
      "Bath & dry",
      "Haircut & styling",
      "Nail trim",
      "Ear cleaning",
      "De-shedding",
    ],
    process: [
      "Book your grooming session online",
      "Groomer arrives at your home",
      "Full grooming session",
      "Happy, clean pet!",
    ],
    reviewsList: [
      {
        name: "James Lee",
        date: "May 11, 2024",
        rating: 5,
        text: "My dog looks amazing and was so relaxed!",
      },
      {
        name: "Olga Ivanova",
        date: "May 10, 2024",
        rating: 4,
        text: "Very convenient and the groomer was great with my cat.",
      },
      {
        name: "Ahmed Hassan",
        date: "May 9, 2024",
        rating: 5,
        text: "Best grooming experience for my pet!",
      },
    ],
    booking: {
      pricePerSession: 60,
      discount: 0.1,
      addOns: [
        { name: "De-shedding Treatment", price: 15 },
        { name: "Flea & Tick Bath", price: 12 },
      ],
      specialOffer: "Book for 2+ pets and get 10% off!",
    },
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return mockServices.find((service) => service.id === id);
};
