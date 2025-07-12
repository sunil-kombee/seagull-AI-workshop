export interface Product {
    id: string;
    name: string;
    description: string;
    features: string[];
    price: number;
    priceDescription?: string; // Added to handle cases like /mo or /trip
    rating: number;
    image: string;
  }
  
  export const simProducts: Product[] = [
    {
      id: "sim1",
      name: "Premium 5G SIM",
      description: "Unlimited 5G data, international roaming, and a 30-day money-back guarantee.",
      features: [
        "Unlimited 5G data",
        "International roaming",
        "Free SMS to 100+ countries",
        "30-day money back guarantee",
      ],
      price: 49.99,
      priceDescription: "$49.99",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80", // SIM card
    },
    {
      id: "sim2",
      name: "Standard 4G SIM",
      description: "10GB monthly data with unlimited local calls and no contract.",
      features: ["10GB monthly data", "Unlimited local calls", "Free SMS", "No contract"],
      price: 29.99,
      priceDescription: "$29.99",
      rating: 5,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", // SIM card
    },
    {
      id: "sim3",
      name: "Travel SIM Card",
      description: "Coverage in 150+ countries with 24/7 customer support.",
      features: [
        "Works in 150+ countries",
        "Pay-as-you-go data",
        "24/7 customer support",
        "eSIM option available",
      ],
      price: 39.99,
      priceDescription: "$39.99",
      rating: 5,
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80", // Travel
    },
  ];
  
  export const insuranceProducts: Product[] = [
    {
      id: "ins1",
      name: "Device Protection",
      description: "Covers accidental damage with 24-hour replacement.",
      features: [
        "Covers accidental damage",
        "Worldwide coverage",
        "24-hour replacement",
        "No-deductible",
      ],
      price: 12.99,
      priceDescription: "$12.99/mo",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", // Device protection
    },
    {
      id: "ins2",
      name: "Travel Insurance",
      description: "Medical coverage up to $1M with trip cancellation protection.",
      features: [
        "Medical coverage up to $1M",
        "Trip cancellation protection",
        "Lost luggage compensation",
        "24/7 emergency assistance",
      ],
      price: 19.99,
      priceDescription: "$19.99/trip",
      rating: 5,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // Travel insurance
    },
  ];
