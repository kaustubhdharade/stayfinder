/**
 * StayFinder Realistic Mock Hotel Data
 * Separated cleanly from presentation components.
 */

export const POPULAR_DESTINATIONS = [
  {
    id: 'dest-paris',
    name: 'Paris',
    country: 'France',
    tagline: 'The City of Light & Romantic Stays',
    hotelCount: 384,
    averagePrice: 195,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dest-tokyo',
    name: 'Tokyo',
    country: 'Japan',
    tagline: 'Futuristic Skyline & Serene Ryokans',
    hotelCount: 420,
    averagePrice: 165,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dest-newyork',
    name: 'New York',
    country: 'United States',
    tagline: 'Iconic Manhattan Views & Luxury Suites',
    hotelCount: 512,
    averagePrice: 280,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dest-london',
    name: 'London',
    country: 'United Kingdom',
    tagline: 'Historic Charm along the River Thames',
    hotelCount: 395,
    averagePrice: 220,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dest-rome',
    name: 'Rome',
    country: 'Italy',
    tagline: 'Ancient Wonders & Classical Elegance',
    hotelCount: 310,
    averagePrice: 175,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dest-bali',
    name: 'Bali',
    country: 'Indonesia',
    tagline: 'Tropical Villas & Oceanfront Resorts',
    hotelCount: 290,
    averagePrice: 140,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
  },
];

export const MOCK_HOTELS = [
  {
    id: 'hotel-paris-elysee',
    name: 'The Grand Élysée Palace & Spa',
    destination: 'Paris, France',
    city: 'Paris',
    country: 'France',
    address: '14 Avenue Montaigne, 8th Arrondissement, 75008 Paris',
    distanceFromCenter: '0.4 miles from Champs-Élysées',
    starRating: 5,
    ratingScore: 9.5,
    ratingWord: 'Exceptional',
    reviewCount: 1480,
    propertyType: 'Hotel',
    pricePerNight: 340,
    originalPrice: 420,
    dealProvider: 'Booking.com',
    alternativeDeals: [
      { provider: 'Expedia', price: 355 },
      { provider: 'Agoda', price: 360 },
      { provider: 'Direct Hotel', price: 380 },
    ],
    freeCancellation: true,
    breakfastIncluded: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Immerse yourself in Parisian sophistication at The Grand Élysée Palace. Featuring Haussmann-style architecture, bespoke marble baths, an internationally acclaimed Guerlain spa, and panoramic views of the Eiffel Tower from private suite balconies.',
    highlights: [
      'Steps from Haute Couture fashion houses on Avenue Montaigne',
      'Michelin-starred dining on site by Chef Laurent',
      'Complimentary airport luxury limousine shuttle',
      'Full-service luxury spa and heated indoor pool',
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Swimming Pool',
      'Spa & Wellness',
      'Fitness Center',
      'Restaurant & Bar',
      'Room Service',
      'Airport Shuttle',
      'Valet Parking',
      'Air Conditioning',
      'Concierge Service',
    ],
    ratingBreakdown: {
      cleanliness: 9.8,
      location: 9.7,
      service: 9.6,
      comfort: 9.5,
      valueForMoney: 9.0,
    },
    rooms: [
      {
        id: 'room-elysee-deluxe',
        name: 'Deluxe King Courtyard View',
        bedType: '1 King Bed',
        maxGuests: 2,
        sizeSqFt: 420,
        price: 340,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 48h before check-in',
        features: ['Italian Marble Bathroom', 'Nespresso Coffee Machine', 'High-Speed WiFi', 'Balcony'],
      },
      {
        id: 'room-elysee-prestige',
        name: 'Prestige Eiffel Suite',
        bedType: '1 King Bed + 1 Sofa Bed',
        maxGuests: 3,
        sizeSqFt: 680,
        price: 520,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 24h before check-in',
        features: ['Direct Eiffel Tower View', 'Separate Living Room', 'Deep Soaking Tub', 'Butler Service'],
      },
      {
        id: 'room-elysee-royal',
        name: 'Royal Signature Suite',
        bedType: '2 King Beds',
        maxGuests: 4,
        sizeSqFt: 980,
        price: 890,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 72h before check-in',
        features: ['Private Terrace', 'Private Sauna & Jacuzzi', 'Dining Room', 'VIP Airport Transfer'],
      },
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Elena Rostova',
        country: 'Switzerland',
        rating: 9.8,
        date: 'October 2026',
        title: 'Breathtaking views and impeccable hospitality',
        comment:
          'From the moment we arrived, the concierge team took care of our every need. Watching the Eiffel Tower sparkle from our room balcony was unforgettable!',
      },
      {
        id: 'rev-2',
        author: 'Marcus Vance',
        country: 'United States',
        rating: 9.2,
        date: 'September 2026',
        title: 'Best hotel stay in Paris by far',
        comment:
          'The spa treatment was world-class, and the breakfast buffet in the garden courtyard had the freshest viennoiseries.',
      },
    ],
  },
  {
    id: 'hotel-paris-montmartre',
    name: 'L’Amiral Boutique Hotel & Terraces',
    destination: 'Paris, France',
    city: 'Paris',
    country: 'France',
    address: '22 Rue des Abbesses, 18th Arrondissement, 75018 Paris',
    distanceFromCenter: '0.2 miles from Sacré-Cœur',
    starRating: 4,
    ratingScore: 9.1,
    ratingWord: 'Wonderful',
    reviewCount: 920,
    propertyType: 'Boutique',
    pricePerNight: 175,
    originalPrice: 220,
    dealProvider: 'Agoda',
    alternativeDeals: [
      { provider: 'Booking.com', price: 185 },
      { provider: 'Expedia', price: 189 },
    ],
    freeCancellation: true,
    breakfastIncluded: false,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Charming and intimate, L’Amiral sits nestled among the cobblestones of bohemian Montmartre. Boasting artistic interiors, sun-drenched private terraces, and artisanal breakfast pastries sourced from local boulangeries.',
    highlights: [
      'Quaint bohemian location steps from Sacré-Cœur and Abbesses metro',
      'Rooftop cocktail bar overlooking the Paris skyline',
      'Locally roasted artisan coffee bar on the ground floor',
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Restaurant & Bar',
      'Air Conditioning',
      'Concierge Service',
      'Pet Friendly',
      'Elevator',
    ],
    ratingBreakdown: {
      cleanliness: 9.4,
      location: 9.5,
      service: 9.2,
      comfort: 9.0,
      valueForMoney: 9.3,
    },
    rooms: [
      {
        id: 'room-amiral-cozy',
        name: 'Cozy Bohemian Double',
        bedType: '1 Queen Bed',
        maxGuests: 2,
        sizeSqFt: 260,
        price: 175,
        breakfastIncluded: false,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 48h before arrival',
        features: ['Designer Decor', 'Rain Shower', 'Espresso Machine', 'City Views'],
      },
      {
        id: 'room-amiral-terrace',
        name: 'Artisan Rooftop Terrace Queen',
        bedType: '1 King Bed',
        maxGuests: 2,
        sizeSqFt: 340,
        price: 245,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 24h before arrival',
        features: ['Private Rooftop Deck', 'Panoramic Paris Vista', 'Complimentary Wine Hour'],
      },
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Chloe Dupont',
        country: 'Belgium',
        rating: 9.0,
        date: 'October 2026',
        title: 'Authentic Montmartre vibe',
        comment: 'Loved the room styling and the staff recommendations for hidden neighborhood bistros.',
      },
    ],
  },
  {
    id: 'hotel-tokyo-imperial',
    name: 'Tokyo Imperial Garden Suites',
    destination: 'Tokyo, Japan',
    city: 'Tokyo',
    country: 'Japan',
    address: '1-1 Marunouchi, Chiyoda-ku, Tokyo 100-0005',
    distanceFromCenter: '0.1 miles from Tokyo Station',
    starRating: 5,
    ratingScore: 9.6,
    ratingWord: 'Exceptional',
    reviewCount: 2150,
    propertyType: 'Hotel',
    pricePerNight: 295,
    originalPrice: 380,
    dealProvider: 'Booking.com',
    alternativeDeals: [
      { provider: 'Agoda', price: 305 },
      { provider: 'Hotels.com', price: 312 },
    ],
    freeCancellation: true,
    breakfastIncluded: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Harmonizing Japanese omotenashi hospitality with sleek modern luxury. Tokyo Imperial Garden Suites overlooks the verdant Imperial Palace moat and the vibrant Marunouchi district with tranquil onsen-inspired baths and tea ceremonies.',
    highlights: [
      'Direct indoor access to Tokyo Station bullet train platforms',
      'Traditional Hinoki wood soaking onsen baths',
      'Award-winning Japanese Kaiseki restaurant',
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Spa & Wellness',
      'Swimming Pool',
      'Fitness Center',
      'Restaurant & Bar',
      'Airport Shuttle',
      'Valet Parking',
      'Air Conditioning',
      '24/7 Front Desk',
    ],
    ratingBreakdown: {
      cleanliness: 9.9,
      location: 9.8,
      service: 9.8,
      comfort: 9.6,
      valueForMoney: 9.2,
    },
    rooms: [
      {
        id: 'room-tokyo-zen',
        name: 'Zen King Garden View',
        bedType: '1 King Bed',
        maxGuests: 2,
        sizeSqFt: 460,
        price: 295,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 48h before check-in',
        features: ['Hinoki Wood Bath', 'Imperial Garden Panorama', 'Yukata Robes', 'Matcha Tea Set'],
      },
      {
        id: 'room-tokyo-grand',
        name: 'Executive Skyline Suite',
        bedType: '2 Queen Beds',
        maxGuests: 4,
        sizeSqFt: 750,
        price: 490,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 24h before check-in',
        features: ['Tokyo Tower Vista', 'Club Lounge Access', 'Complimentary Evening Cocktails'],
      },
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Kenji Takahashi',
        country: 'Japan',
        rating: 9.9,
        date: 'October 2026',
        title: 'The pinnacle of Tokyo hospitality',
        comment: 'Unmatched silence and serenity in the center of Tokyo. The garden views are sublime.',
      },
    ],
  },
  {
    id: 'hotel-tokyo-shinjuku',
    name: 'Neon Sky Tower Residence',
    destination: 'Tokyo, Japan',
    city: 'Tokyo',
    country: 'Japan',
    address: '2-8-1 Nishi-Shinjuku, Shinjuku-ku, Tokyo 163-8001',
    distanceFromCenter: '0.3 miles from Shinjuku Gyoen',
    starRating: 4,
    ratingScore: 8.9,
    ratingWord: 'Fabulous',
    reviewCount: 1640,
    propertyType: 'Apartment',
    pricePerNight: 155,
    originalPrice: 190,
    dealProvider: 'Expedia',
    alternativeDeals: [
      { provider: 'Booking.com', price: 162 },
      { provider: 'Agoda', price: 165 },
    ],
    freeCancellation: true,
    breakfastIncluded: false,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'High-altitude serviced apartments towering above the electric energy of Shinjuku. Equipped with full kitchenettes, smart-home automation, and floor-to-ceiling glass looking out towards Mt. Fuji on clear mornings.',
    highlights: [
      'Private kitchenettes and in-unit washer/dryers',
      'Minutes from Shinjuku nightlife and world-class ramen alleyways',
      'High-speed fiber optic WiFi ideal for remote work',
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Fitness Center',
      'Air Conditioning',
      'Elevator',
      '24/7 Front Desk',
    ],
    ratingBreakdown: {
      cleanliness: 9.3,
      location: 9.4,
      service: 8.8,
      comfort: 9.0,
      valueForMoney: 9.2,
    },
    rooms: [
      {
        id: 'room-neon-studio',
        name: 'Skyline Studio Apartment',
        bedType: '1 Queen Bed',
        maxGuests: 2,
        sizeSqFt: 380,
        price: 155,
        breakfastIncluded: false,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 48h before arrival',
        features: ['Full Kitchenette', 'Washing Machine', 'Smart TV with Streaming'],
      },
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Sarah Jenkins',
        country: 'Australia',
        rating: 9.0,
        date: 'September 2026',
        title: 'Perfect for extended stays in Tokyo',
        comment: 'Super clean, great laundry in the room, and very close to the subway.',
      },
    ],
  },
  {
    id: 'hotel-ny-manhattan',
    name: 'The Manhattan Horizon Suites',
    destination: 'New York, United States',
    city: 'New York',
    country: 'United States',
    address: '768 5th Avenue, Central Park South, New York, NY 10019',
    distanceFromCenter: 'Steps from Central Park & 5th Ave',
    starRating: 5,
    ratingScore: 9.4,
    ratingWord: 'Wonderful',
    reviewCount: 3100,
    propertyType: 'Hotel',
    pricePerNight: 395,
    originalPrice: 480,
    dealProvider: 'Booking.com',
    alternativeDeals: [
      { provider: 'Expedia', price: 410 },
      { provider: 'Hotels.com', price: 415 },
      { provider: 'Direct Hotel', price: 430 },
    ],
    freeCancellation: true,
    breakfastIncluded: false,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Perched directly on Central Park South, The Manhattan Horizon offers timeless Art Deco grandeur infused with state-of-the-art residential luxury. Soak in the park canopy colors while enjoying premier Manhattan dining.',
    highlights: [
      'Unobstructed front-row Central Park views',
      'Rooftop jazz club & signature cocktail lounge',
      'Personal chauffeur car service within Midtown Manhattan',
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Fitness Center',
      'Spa & Wellness',
      'Restaurant & Bar',
      'Valet Parking',
      'Pet Friendly',
      'Room Service',
      'Air Conditioning',
      '24/7 Front Desk',
    ],
    ratingBreakdown: {
      cleanliness: 9.6,
      location: 9.9,
      service: 9.5,
      comfort: 9.4,
      valueForMoney: 8.8,
    },
    rooms: [
      {
        id: 'room-ny-park',
        name: 'Central Park View King',
        bedType: '1 King Bed',
        maxGuests: 2,
        sizeSqFt: 440,
        price: 395,
        breakfastIncluded: false,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 48h before arrival',
        features: ['Park Vista Bay Windows', 'Custom Frette Linens', 'Espresso Bar'],
      },
      {
        id: 'room-ny-penthouse',
        name: 'Manhattan Skyline Penthouse',
        bedType: '2 King Beds',
        maxGuests: 4,
        sizeSqFt: 880,
        price: 780,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 72h before arrival',
        features: ['Wrap-around Glass Terrace', 'Wet Bar', 'Fireplace', 'Limousine Airport Pickup'],
      },
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'David Sterling',
        country: 'United Kingdom',
        rating: 9.7,
        date: 'October 2026',
        title: 'New York at its absolute finest',
        comment: 'Looking out over Central Park with morning coffee was priceless. Worth every penny.',
      },
    ],
  },
  {
    id: 'hotel-ny-soho',
    name: 'The Mercer Loft & Courtyard',
    destination: 'New York, United States',
    city: 'New York',
    country: 'United States',
    address: '99 Prince Street, SoHo, New York, NY 10012',
    distanceFromCenter: 'Center of SoHo Designer District',
    starRating: 4,
    ratingScore: 9.2,
    ratingWord: 'Wonderful',
    reviewCount: 1180,
    propertyType: 'Boutique',
    pricePerNight: 260,
    originalPrice: 320,
    dealProvider: 'Agoda',
    alternativeDeals: [
      { provider: 'Booking.com', price: 275 },
      { provider: 'Expedia', price: 280 },
    ],
    freeCancellation: true,
    breakfastIncluded: true,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Industrial chic meets SoHo charm. Featuring authentic exposed brick, cast-iron accents, high ceilings, and an ivy-covered private atrium for morning espresso.',
    highlights: [
      'Prime Prince & Mercer Street cobblestone address',
      'Complimentary artisanal bakery breakfast daily',
      'Curated contemporary art collection throughout',
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Restaurant & Bar',
      'Pet Friendly',
      'Air Conditioning',
      'Concierge Service',
    ],
    ratingBreakdown: {
      cleanliness: 9.5,
      location: 9.8,
      service: 9.3,
      comfort: 9.1,
      valueForMoney: 8.9,
    },
    rooms: [
      {
        id: 'room-mercer-queen',
        name: 'SoHo Brick Loft Queen',
        bedType: '1 Queen Bed',
        maxGuests: 2,
        sizeSqFt: 360,
        price: 260,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 48h before arrival',
        features: ['Exposed Brick Wall', 'Oversized Windows', 'Rain Shower'],
      },
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Mia Karlsson',
        country: 'Sweden',
        rating: 9.3,
        date: 'September 2026',
        title: 'Super stylish SoHo boutique',
        comment: 'Great atmosphere, walk out right into incredible boutiques and cozy cafes.',
      },
    ],
  },
  {
    id: 'hotel-london-kensington',
    name: 'The Kensington Crown Hotel & Gardens',
    destination: 'London, United Kingdom',
    city: 'London',
    country: 'United Kingdom',
    address: '35 Queens Gate, South Kensington, London SW7 5JA',
    distanceFromCenter: '0.3 miles from Hyde Park & Royal Albert Hall',
    starRating: 5,
    ratingScore: 9.3,
    ratingWord: 'Wonderful',
    reviewCount: 2240,
    propertyType: 'Hotel',
    pricePerNight: 285,
    originalPrice: 350,
    dealProvider: 'Booking.com',
    alternativeDeals: [
      { provider: 'Expedia', price: 295 },
      { provider: 'Hotels.com', price: 300 },
    ],
    freeCancellation: true,
    breakfastIncluded: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1529290130-4ca3753253ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'A refined Victorian townhouse residence overlooking serene private garden squares. Combining quintessential British elegance, afternoon tea in the glass conservatory, and plush contemporary suites.',
    highlights: [
      'Adjacent to Hyde Park, Victoria and Albert Museum, and Harrods',
      'Traditional English Afternoon Tea served daily',
      'Private garden access for hotel guests',
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Restaurant & Bar',
      'Fitness Center',
      'Room Service',
      'Air Conditioning',
      'Concierge Service',
      '24/7 Front Desk',
    ],
    ratingBreakdown: {
      cleanliness: 9.6,
      location: 9.7,
      service: 9.4,
      comfort: 9.3,
      valueForMoney: 8.9,
    },
    rooms: [
      {
        id: 'room-kensington-king',
        name: 'Victorian Garden King Room',
        bedType: '1 King Bed',
        maxGuests: 2,
        sizeSqFt: 380,
        price: 285,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 48h before arrival',
        features: ['Garden Square View', 'Marble Bath', 'Afternoon Tea Inclusions'],
      },
    ],
    reviews: [
      {
        id: 'rev-8',
        author: 'George Campbell',
        country: 'Canada',
        rating: 9.5,
        date: 'October 2026',
        title: 'Splendid stay in Kensington',
        comment: 'Quiet, beautifully furnished, and an easy walk to Hyde Park for morning runs.',
      },
    ],
  },
  {
    id: 'hotel-bali-azure',
    name: 'Azure Bay Oceanfront Sanctuary & Villas',
    destination: 'Bali, Indonesia',
    city: 'Bali',
    country: 'Indonesia',
    address: 'Jl. Pantai Balangan No. 88, Jimbaran, Bali 80361',
    distanceFromCenter: 'Beachfront directly on Balangan Bay',
    starRating: 5,
    ratingScore: 9.7,
    ratingWord: 'Exceptional',
    reviewCount: 1890,
    propertyType: 'Resort',
    pricePerNight: 210,
    originalPrice: 280,
    dealProvider: 'Agoda',
    alternativeDeals: [
      { provider: 'Booking.com', price: 220 },
      { provider: 'Expedia', price: 235 },
    ],
    freeCancellation: true,
    breakfastIncluded: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580977276076-ae4b7c933242?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'An idyllic coastal haven carved into cliffside panoramas. Private infinity plunge pools, open-air teak pavilions, holistic Balinese massages, and breathtaking Indian Ocean sunsets.',
    highlights: [
      'Private infinity pool in every standalone villa',
      'Direct private cliff-path access to white sand beach',
      'Complimentary morning yoga and daily floating breakfast option',
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Swimming Pool',
      'Spa & Wellness',
      'Restaurant & Bar',
      'Airport Shuttle',
      'Room Service',
      'Valet Parking',
      'Air Conditioning',
      '24/7 Front Desk',
    ],
    ratingBreakdown: {
      cleanliness: 9.8,
      location: 9.9,
      service: 9.8,
      comfort: 9.7,
      valueForMoney: 9.6,
    },
    rooms: [
      {
        id: 'room-bali-villa',
        name: 'Ocean Pool Pavilion Villa',
        bedType: '1 King Bed',
        maxGuests: 2,
        sizeSqFt: 850,
        price: 210,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 72h before arrival',
        features: ['Private Plunge Pool', 'Outdoor Rain Shower', 'Daybed Gazebo', 'Oceanfront Views'],
      },
      {
        id: 'room-bali-family',
        name: 'Two-Bedroom Sunset Cliff Estate',
        bedType: '2 King Beds',
        maxGuests: 4,
        sizeSqFt: 1600,
        price: 430,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 72h before arrival',
        features: ['Large Infinity Pool', 'Full Kitchen', 'Private Chef Experience', 'Butler Service'],
      },
    ],
    reviews: [
      {
        id: 'rev-9',
        author: 'Camilla Thorne',
        country: 'New Zealand',
        rating: 10.0,
        date: 'October 2026',
        title: 'Paradise found on earth',
        comment: 'The villas are magical. Watching the sunset while floating in our pool was pure bliss.',
      },
    ],
  },
  {
    id: 'hotel-rome-colosseum',
    name: 'Palazzo Navona Heritage Hotel',
    destination: 'Rome, Italy',
    city: 'Rome',
    country: 'Italy',
    address: 'Via dei Sediari 8, Centro Storico, 00186 Rome',
    distanceFromCenter: '0.1 miles from Piazza Navona & Pantheon',
    starRating: 4,
    ratingScore: 9.2,
    ratingWord: 'Wonderful',
    reviewCount: 1530,
    propertyType: 'Hotel',
    pricePerNight: 190,
    originalPrice: 240,
    dealProvider: 'Booking.com',
    alternativeDeals: [
      { provider: 'Agoda', price: 198 },
      { provider: 'Expedia', price: 205 },
    ],
    freeCancellation: true,
    breakfastIncluded: true,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Immerse in ancient Rome without sacrificing modern comfort. A restored 17th-century palazzo with travertine stone archways, tranquil courtyard fountains, and a rooftop bar overlooking the domes of Rome.',
    highlights: [
      'Walk to Pantheon, Trevi Fountain, and Piazza Navona in 5 minutes',
      'Rooftop lounge overlooking historic Roman cupolas',
      'Authentic Italian breakfast with freshly baked cornetti',
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Restaurant & Bar',
      'Air Conditioning',
      'Room Service',
      'Concierge Service',
      '24/7 Front Desk',
    ],
    ratingBreakdown: {
      cleanliness: 9.5,
      location: 9.9,
      service: 9.3,
      comfort: 9.1,
      valueForMoney: 9.0,
    },
    rooms: [
      {
        id: 'room-rome-classic',
        name: 'Superior Navona Double',
        bedType: '1 Queen Bed',
        maxGuests: 2,
        sizeSqFt: 310,
        price: 190,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 48h before arrival',
        features: ['Travertine Bath', 'Soundproof Windows', 'Complimentary Minibar Drinks'],
      },
    ],
    reviews: [
      {
        id: 'rev-10',
        author: 'Matteo Rossi',
        country: 'Italy',
        rating: 9.4,
        date: 'September 2026',
        title: 'Posizione fantastica',
        comment: 'Everything in the historical center is within walking distance. Highly recommended.',
      },
    ],
  },
  {
    id: 'hotel-dubai-marina',
    name: 'The Palm Horizon Beach Resort',
    destination: 'Dubai, UAE',
    city: 'Dubai',
    country: 'United Arab Emirates',
    address: 'Crescent West, Palm Jumeirah, Dubai',
    distanceFromCenter: 'Beachfront on the Palm Jumeirah crescent',
    starRating: 5,
    ratingScore: 9.5,
    ratingWord: 'Exceptional',
    reviewCount: 2800,
    pricePerNight: 360,
    originalPrice: 470,
    dealProvider: 'Booking.com',
    alternativeDeals: [
      { provider: 'Agoda', price: 375 },
      { provider: 'Expedia', price: 385 },
      { provider: 'Hotels.com', price: 390 },
    ],
    freeCancellation: true,
    breakfastIncluded: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1512958789358-4dacac722146?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'Palatial Arabian architecture set against the turquoise Persian Gulf. Experience multiple lagoon pools, private beach cabanas, world-renowned dining by international master chefs, and an ultra-exclusive wellness sanctuary.',
    highlights: [
      'Private 800m white sand beachfront with luxury cabanas',
      'Multiple temperature-controlled swimming pools and water sports',
      'Award-winning Talise Ottoman-inspired Spa',
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Swimming Pool',
      'Spa & Wellness',
      'Fitness Center',
      'Restaurant & Bar',
      'Valet Parking',
      'Airport Shuttle',
      'Room Service',
      'Air Conditioning',
      '24/7 Front Desk',
    ],
    ratingBreakdown: {
      cleanliness: 9.8,
      location: 9.6,
      service: 9.7,
      comfort: 9.6,
      valueForMoney: 9.1,
    },
    rooms: [
      {
        id: 'room-dubai-gulf',
        name: 'Deluxe Gulf View King',
        bedType: '1 King Bed',
        maxGuests: 2,
        sizeSqFt: 550,
        price: 360,
        breakfastIncluded: true,
        freeCancellation: true,
        cancellationPolicy: 'Free cancellation until 48h before arrival',
        features: ['Balcony with Gulf Views', 'Marble Bathroom with Tub', 'Luxury Hermès Amenities'],
      },
    ],
    reviews: [
      {
        id: 'rev-11',
        author: 'Fatima Al-Mansoor',
        country: 'UAE',
        rating: 9.8,
        date: 'October 2026',
        title: 'Outstanding resort experience',
        comment: 'Every detail from beach service to the breakfast buffet was pure perfection.',
      },
    ],
  },
];

/**
 * Filter and sort mock hotel data
 * @param {Object} [filters]
 * @param {string} [sortBy]
 * @returns {Array}
 */
export function getHotels(filters = {}, sortBy = 'recommended') {
  let results = [...MOCK_HOTELS];

  // 1. Destination / keyword search
  if (filters.destination && filters.destination.trim()) {
    const q = filters.destination.toLowerCase().trim();
    results = results.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.destination.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.country.toLowerCase().includes(q) ||
        h.address.toLowerCase().includes(q)
    );
  }

  // 2. Price range
  if (filters.minPrice !== undefined && filters.minPrice !== null && filters.minPrice !== '') {
    results = results.filter((h) => h.pricePerNight >= Number(filters.minPrice));
  }
  if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice !== '') {
    results = results.filter((h) => h.pricePerNight <= Number(filters.maxPrice));
  }

  // 3. Star ratings (array of numbers, e.g. [4, 5])
  if (filters.starRatings && filters.starRatings.length > 0) {
    results = results.filter((h) => filters.starRatings.includes(h.starRating));
  }

  // 4. Minimum guest rating score (e.g. 9.0)
  if (filters.minRating && Number(filters.minRating) > 0) {
    results = results.filter((h) => h.ratingScore >= Number(filters.minRating));
  }

  // 5. Property types (array, e.g. ['Hotel', 'Resort'])
  if (filters.propertyTypes && filters.propertyTypes.length > 0) {
    results = results.filter((h) => filters.propertyTypes.includes(h.propertyType));
  }

  // 6. Selected amenities (must match all selected)
  if (filters.amenities && filters.amenities.length > 0) {
    results = results.filter((h) =>
      filters.amenities.every((amenity) =>
        h.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
      )
    );
  }

  // 7. Free cancellation toggle
  if (filters.freeCancellation) {
    results = results.filter((h) => h.freeCancellation === true);
  }

  // 8. Breakfast included toggle
  if (filters.breakfastIncluded) {
    results = results.filter((h) => h.breakfastIncluded === true);
  }

  // Sorting
  switch (sortBy) {
    case 'price-asc':
      results.sort((a, b) => a.pricePerNight - b.pricePerNight);
      break;
    case 'price-desc':
      results.sort((a, b) => b.pricePerNight - a.pricePerNight);
      break;
    case 'rating-desc':
      results.sort((a, b) => b.ratingScore - a.ratingScore);
      break;
    case 'reviews-desc':
      results.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'recommended':
    default:
      // Sort by weighted rating & popularity
      results.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.ratingScore - a.ratingScore;
      });
      break;
  }

  return results;
}

/**
 * Get hotel by ID
 */
export function getHotelById(id) {
  if (!id) return null;
  return MOCK_HOTELS.find((h) => h.id.toLowerCase() === id.toLowerCase()) || null;
}

/**
 * Get featured hotels for home page
 */
export function getFeaturedHotels() {
  return MOCK_HOTELS.filter((h) => h.featured);
}
