interface ImageInfo {
  url: string;
  alt: string;
}

interface CategoryImages {
  [key: string]: ImageInfo;
}

export const images: {
  hero: ImageInfo;
  categories: CategoryImages;
  cta: ImageInfo;
} = {
  hero: {
    url: '/images/hero-background.jpg',
    alt: 'Aerial view of airport with airplanes and runway'
  },
  categories: {
    'airport-transfers': {
      url: '/images/airport-transfer.jpg',
      alt: 'Passengers boarding a shuttle at airport'
    },
    'activity-tickets': {
      url: '/images/tour-guide.jpg',
      alt: 'Group of tourists on city walking tour'
    },
    'car-rentals': {
      url: '/images/car-rental.jpg',
      alt: 'Modern rental car in parking lot'
    },
    'tour-guides': {
      url: '/images/tour-guide.jpg',
      alt: 'Tour guide explaining historical site'
    },
    'sim-cards': {
      url: '/images/sim-card.jpg',
      alt: 'Mobile SIM card on white background'
    },
    'travel-insurance': {
      url: '/images/travel-insurance.jpg',
      alt: 'Travel insurance policy document'
    }
  },
  cta: {
    url: '/images/happy-travelers.jpg',
    alt: 'Happy travelers enjoying vacation'
  }
};
