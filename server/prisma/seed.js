import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const AMENITIES_DATA = [
  { name: 'Free High-Speed WiFi', category: 'General' },
  { name: 'Swimming Pool', category: 'Wellness' },
  { name: 'Spa & Wellness', category: 'Wellness' },
  { name: 'Fitness Center', category: 'Wellness' },
  { name: 'Restaurant & Bar', category: 'Dining' },
  { name: 'Room Service', category: 'Dining' },
  { name: 'Airport Shuttle', category: 'General' },
  { name: 'Valet Parking', category: 'General' },
  { name: 'Pet Friendly', category: 'General' },
  { name: 'Air Conditioning', category: 'Room' },
  { name: 'Concierge Service', category: 'General' },
  { name: '24/7 Front Desk', category: 'General' },
  { name: 'Elevator', category: 'General' },
];

const SEED_HOTELS = [
  {
    slug: 'the-grand-elysee-palace',
    name: 'The Grand Élysée Palace & Spa',
    description:
      'Immerse yourself in Parisian sophistication at The Grand Élysée Palace. Featuring Haussmann-style architecture, bespoke marble baths, an internationally acclaimed Guerlain spa, and panoramic views of the Eiffel Tower from private suite balconies.',
    address: '14 Avenue Montaigne, 8th Arrondissement',
    city: 'Paris',
    state: 'Île-de-France',
    country: 'France',
    latitude: 48.8662,
    longitude: 2.3082,
    starRating: 5,
    propertyType: 'Hotel',
    ratingScore: 9.5,
    ratingWord: 'Exceptional',
    reviewCount: 1480,
    contactPhone: '+33 1 42 68 00 00',
    contactEmail: 'concierge@grandelysee.paris',
    featured: true,
    freeCancellation: true,
    breakfastIncluded: true,
    minPrice: 34000, // $340.00
    images: [
      { imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', altText: 'Facade and exterior entrance', displayOrder: 0 },
      { imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80', altText: 'Grand lobby interior with chandelier', displayOrder: 1 },
      { imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80', altText: 'Deluxe bedroom suite with balcony', displayOrder: 2 },
      { imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80', altText: 'Marble bathroom with soaking tub', displayOrder: 3 },
      { imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80', altText: 'Heated indoor swimming pool', displayOrder: 4 },
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
    roomTypes: [
      {
        name: 'Deluxe King Courtyard View',
        description: 'Spacious 420 sq ft king room overlooking the serene courtyard garden.',
        capacity: 2,
        bedConfiguration: '1 King Bed',
        basePrice: 34000, // $340.00
        totalInventory: 12,
        isActive: true,
      },
      {
        name: 'Prestige Eiffel Suite',
        description: 'Exquisite 680 sq ft suite featuring direct views of the Eiffel Tower.',
        capacity: 3,
        bedConfiguration: '1 King Bed + 1 Sofa Bed',
        basePrice: 52000, // $520.00
        totalInventory: 6,
        isActive: true,
      },
      {
        name: 'Royal Signature Suite',
        description: 'Palatial 980 sq ft suite with private sauna, dining room, and terrace.',
        capacity: 4,
        bedConfiguration: '2 King Beds',
        basePrice: 89000, // $890.00
        totalInventory: 2,
        isActive: true,
      },
    ],
  },
  {
    slug: 'lamiral-boutique-hotel',
    name: 'L’Amiral Boutique Hotel & Terraces',
    description:
      'Charming and intimate, L’Amiral sits nestled among the cobblestones of bohemian Montmartre. Boasting artistic interiors, sun-drenched private terraces, and artisanal breakfast pastries sourced from local boulangeries.',
    address: '22 Rue des Abbesses, 18th Arrondissement',
    city: 'Paris',
    state: 'Île-de-France',
    country: 'France',
    latitude: 48.8845,
    longitude: 2.3387,
    starRating: 4,
    propertyType: 'Boutique',
    ratingScore: 9.1,
    ratingWord: 'Wonderful',
    reviewCount: 920,
    contactPhone: '+33 1 46 06 12 34',
    contactEmail: 'contact@lamiral-hotel.fr',
    featured: false,
    freeCancellation: true,
    breakfastIncluded: false,
    minPrice: 17500, // $175.00
    images: [
      { imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80', altText: 'Boutique hotel front terrace', displayOrder: 0 },
      { imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80', altText: 'Artistic Parisian guest room', displayOrder: 1 },
      { imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80', altText: 'Sun terrace overlooking rooftops', displayOrder: 2 },
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Restaurant & Bar',
      'Air Conditioning',
      'Concierge Service',
      'Pet Friendly',
      'Elevator',
    ],
    roomTypes: [
      {
        name: 'Cozy Bohemian Double',
        description: 'Charming 260 sq ft room with custom artistic wallpaper and rain shower.',
        capacity: 2,
        bedConfiguration: '1 Queen Bed',
        basePrice: 17500,
        totalInventory: 10,
        isActive: true,
      },
      {
        name: 'Artisan Rooftop Terrace Queen',
        description: '340 sq ft room with private walkout rooftop terrace looking over Montmartre.',
        capacity: 2,
        bedConfiguration: '1 King Bed',
        basePrice: 24500,
        totalInventory: 4,
        isActive: true,
      },
    ],
  },
  {
    slug: 'tokyo-imperial-garden-suites',
    name: 'Tokyo Imperial Garden Suites',
    description:
      'Harmonizing Japanese omotenashi hospitality with sleek modern luxury. Tokyo Imperial Garden Suites overlooks the verdant Imperial Palace moat and the vibrant Marunouchi district with tranquil onsen-inspired baths and tea ceremonies.',
    address: '1-1 Marunouchi, Chiyoda-ku',
    city: 'Tokyo',
    state: 'Kanto',
    country: 'Japan',
    latitude: 35.6852,
    longitude: 139.7528,
    starRating: 5,
    propertyType: 'Hotel',
    ratingScore: 9.6,
    ratingWord: 'Exceptional',
    reviewCount: 2150,
    contactPhone: '+81 3 3211 5555',
    contactEmail: 'stay@tokyoimperialgarden.jp',
    featured: true,
    freeCancellation: true,
    breakfastIncluded: true,
    minPrice: 29500, // $295.00
    images: [
      { imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80', altText: 'Imperial gardens and modern skyline', displayOrder: 0 },
      { imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', altText: 'Japanese minimalist luxury suite', displayOrder: 1 },
      { imageUrl: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=800&q=80', altText: 'Hinoki wood soaking bath', displayOrder: 2 },
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
    roomTypes: [
      {
        name: 'Zen King Garden View',
        description: 'Serene 460 sq ft room with Hinoki soaking tub and panoramic garden views.',
        capacity: 2,
        bedConfiguration: '1 King Bed',
        basePrice: 29500,
        totalInventory: 15,
        isActive: true,
      },
      {
        name: 'Executive Skyline Suite',
        description: '750 sq ft corner suite with Tokyo Tower views and Club Lounge access.',
        capacity: 4,
        bedConfiguration: '2 Queen Beds',
        basePrice: 49000,
        totalInventory: 8,
        isActive: true,
      },
    ],
  },
  {
    slug: 'the-manhattan-horizon-suites',
    name: 'The Manhattan Horizon Suites',
    description:
      'Perched directly on Central Park South, The Manhattan Horizon offers timeless Art Deco grandeur infused with state-of-the-art residential luxury. Soak in the park canopy colors while enjoying premier Manhattan dining.',
    address: '768 5th Avenue, Central Park South',
    city: 'New York',
    state: 'New York',
    country: 'United States',
    latitude: 40.7648,
    longitude: -73.9745,
    starRating: 5,
    propertyType: 'Hotel',
    ratingScore: 9.4,
    ratingWord: 'Wonderful',
    reviewCount: 3100,
    contactPhone: '+1 212 555 0199',
    contactEmail: 'reservations@manhattanhorizon.com',
    featured: true,
    freeCancellation: true,
    breakfastIncluded: false,
    minPrice: 39500, // $395.00
    images: [
      { imageUrl: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80', altText: 'Central Park South facade', displayOrder: 0 },
      { imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', altText: 'Park view corner bedroom', displayOrder: 1 },
      { imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80', altText: 'Rooftop cocktail lounge', displayOrder: 2 },
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
    roomTypes: [
      {
        name: 'Central Park View King',
        description: '440 sq ft room with oversized bay windows overlooking Central Park.',
        capacity: 2,
        bedConfiguration: '1 King Bed',
        basePrice: 39500,
        totalInventory: 18,
        isActive: true,
      },
      {
        name: 'Manhattan Skyline Penthouse',
        description: '880 sq ft penthouse with wrap-around glass terrace and wet bar.',
        capacity: 4,
        bedConfiguration: '2 King Beds',
        basePrice: 78000,
        totalInventory: 3,
        isActive: true,
      },
    ],
  },
  {
    slug: 'the-mercer-loft-courtyard',
    name: 'The Mercer Loft & Courtyard',
    description:
      'Industrial chic meets SoHo charm. Featuring authentic exposed brick, cast-iron accents, high ceilings, and an ivy-covered private atrium for morning espresso.',
    address: '99 Prince Street, SoHo',
    city: 'New York',
    state: 'New York',
    country: 'United States',
    latitude: 40.7247,
    longitude: -73.9982,
    starRating: 4,
    propertyType: 'Boutique',
    ratingScore: 9.2,
    ratingWord: 'Wonderful',
    reviewCount: 1180,
    contactPhone: '+1 212 555 0142',
    contactEmail: 'stay@mercerloft.com',
    featured: false,
    freeCancellation: true,
    breakfastIncluded: true,
    minPrice: 26000, // $260.00
    images: [
      { imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80', altText: 'Loft lounge with exposed brick', displayOrder: 0 },
      { imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80', altText: 'Courtyard garden atrium', displayOrder: 1 },
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Restaurant & Bar',
      'Pet Friendly',
      'Air Conditioning',
      'Concierge Service',
    ],
    roomTypes: [
      {
        name: 'SoHo Brick Loft Queen',
        description: '360 sq ft room with authentic 12ft high ceilings and custom rain shower.',
        capacity: 2,
        bedConfiguration: '1 Queen Bed',
        basePrice: 26000,
        totalInventory: 14,
        isActive: true,
      },
    ],
  },
  {
    slug: 'the-kensington-crown-hotel',
    name: 'The Kensington Crown Hotel & Gardens',
    description:
      'A refined Victorian townhouse residence overlooking serene private garden squares. Combining quintessential British elegance, afternoon tea in the glass conservatory, and plush contemporary suites.',
    address: '35 Queens Gate, South Kensington',
    city: 'London',
    state: 'Greater London',
    country: 'United Kingdom',
    latitude: 51.4988,
    longitude: -0.1795,
    starRating: 5,
    propertyType: 'Hotel',
    ratingScore: 9.3,
    ratingWord: 'Wonderful',
    reviewCount: 2240,
    contactPhone: '+44 20 7589 1234',
    contactEmail: 'reservations@kensingtoncrown.co.uk',
    featured: true,
    freeCancellation: true,
    breakfastIncluded: true,
    minPrice: 28500, // $285.00
    images: [
      { imageUrl: 'https://images.unsplash.com/photo-1529290130-4ca3753253ae?auto=format&fit=crop&w=1200&q=80', altText: 'Victorian facade and garden square', displayOrder: 0 },
      { imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80', altText: 'Conservatory afternoon tea room', displayOrder: 1 },
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
    roomTypes: [
      {
        name: 'Victorian Garden King Room',
        description: '380 sq ft room with garden views and Italian marble en-suite bathroom.',
        capacity: 2,
        bedConfiguration: '1 King Bed',
        basePrice: 28500,
        totalInventory: 12,
        isActive: true,
      },
    ],
  },
  {
    slug: 'azure-bay-oceanfront-sanctuary',
    name: 'Azure Bay Oceanfront Sanctuary & Villas',
    description:
      'An idyllic coastal haven carved into cliffside panoramas. Private infinity plunge pools, open-air teak pavilions, holistic Balinese massages, and breathtaking Indian Ocean sunsets.',
    address: 'Jl. Pantai Balangan No. 88, Jimbaran',
    city: 'Bali',
    state: 'Bali',
    country: 'Indonesia',
    latitude: -8.7942,
    longitude: 115.1278,
    starRating: 5,
    propertyType: 'Resort',
    ratingScore: 9.7,
    ratingWord: 'Exceptional',
    reviewCount: 1890,
    contactPhone: '+62 361 895 8888',
    contactEmail: 'villas@azurebaybali.com',
    featured: true,
    freeCancellation: true,
    breakfastIncluded: true,
    minPrice: 21000, // $210.00
    images: [
      { imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80', altText: 'Oceanfront infinity pool and sunset', displayOrder: 0 },
      { imageUrl: 'https://images.unsplash.com/photo-1580977276076-ae4b7c933242?auto=format&fit=crop&w=800&q=80', altText: 'Private villa bedroom pavilion', displayOrder: 1 },
      { imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', altText: 'Balinese open-air lounge', displayOrder: 2 },
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
    roomTypes: [
      {
        name: 'Ocean Pool Pavilion Villa',
        description: '850 sq ft private standalone villa with cliffside plunge pool and ocean views.',
        capacity: 2,
        bedConfiguration: '1 King Bed',
        basePrice: 21000,
        totalInventory: 16,
        isActive: true,
      },
      {
        name: 'Two-Bedroom Sunset Cliff Estate',
        description: '1600 sq ft two-bedroom villa with full kitchen and dedicated butler service.',
        capacity: 4,
        bedConfiguration: '2 King Beds',
        basePrice: 43000,
        totalInventory: 4,
        isActive: true,
      },
    ],
  },
  {
    slug: 'palazzo-navona-heritage-hotel',
    name: 'Palazzo Navona Heritage Hotel',
    description:
      'Immerse in ancient Rome without sacrificing modern comfort. A restored 17th-century palazzo with travertine stone archways, tranquil courtyard fountains, and a rooftop bar overlooking the domes of Rome.',
    address: 'Via dei Sediari 8, Centro Storico',
    city: 'Rome',
    state: 'Lazio',
    country: 'Italy',
    latitude: 41.8979,
    longitude: 12.4735,
    starRating: 4,
    propertyType: 'Hotel',
    ratingScore: 9.2,
    ratingWord: 'Wonderful',
    reviewCount: 1530,
    contactPhone: '+39 06 6889 1234',
    contactEmail: 'info@palazzonavona.it',
    featured: false,
    freeCancellation: true,
    breakfastIncluded: true,
    minPrice: 19000, // $190.00
    images: [
      { imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80', altText: 'Historical Roman courtyard', displayOrder: 0 },
      { imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80', altText: 'Classic Italian double suite', displayOrder: 1 },
    ],
    amenities: [
      'Free High-Speed WiFi',
      'Restaurant & Bar',
      'Air Conditioning',
      'Room Service',
      'Concierge Service',
      '24/7 Front Desk',
    ],
    roomTypes: [
      {
        name: 'Superior Navona Double',
        description: '310 sq ft room with travertine bath and soundproof windows.',
        capacity: 2,
        bedConfiguration: '1 Queen Bed',
        basePrice: 19000,
        totalInventory: 14,
        isActive: true,
      },
    ],
  },
  {
    slug: 'the-palm-horizon-beach-resort',
    name: 'The Palm Horizon Beach Resort',
    description:
      'Palatial Arabian architecture set against the turquoise Persian Gulf. Experience multiple lagoon pools, private beach cabanas, world-renowned dining by international master chefs, and an ultra-exclusive wellness sanctuary.',
    address: 'Crescent West, Palm Jumeirah',
    city: 'Dubai',
    state: 'Dubai',
    country: 'United Arab Emirates',
    latitude: 25.1124,
    longitude: 55.1390,
    starRating: 5,
    propertyType: 'Resort',
    ratingScore: 9.5,
    ratingWord: 'Exceptional',
    reviewCount: 2800,
    contactPhone: '+971 4 456 7890',
    contactEmail: 'luxury@palmhorizon.ae',
    featured: true,
    freeCancellation: true,
    breakfastIncluded: true,
    minPrice: 36000, // $360.00
    images: [
      { imageUrl: 'https://images.unsplash.com/photo-1512958789358-4dacac722146?auto=format&fit=crop&w=1200&q=80', altText: 'Palm Jumeirah beachfront infinity pool', displayOrder: 0 },
      { imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80', altText: 'Palatial resort lobby with marble archways', displayOrder: 1 },
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
    roomTypes: [
      {
        name: 'Deluxe Gulf View King',
        description: '550 sq ft room with expansive Gulf panorama balcony and marble bath.',
        capacity: 2,
        bedConfiguration: '1 King Bed',
        basePrice: 36000,
        totalInventory: 20,
        isActive: true,
      },
    ],
  },
];

export async function main() {
  console.log('[Seed] Starting database seed...');

  // 1. Upsert Amenities
  console.log('[Seed] Upserting amenities...');
  const amenityMap = new Map();
  for (const item of AMENITIES_DATA) {
    const record = await prisma.amenity.upsert({
      where: { name: item.name },
      update: { category: item.category },
      create: { name: item.name, category: item.category },
    });
    amenityMap.set(item.name, record.id);
  }
  console.log(`[Seed] ${amenityMap.size} amenities verified.`);

  // 2. Upsert Hotels, Images, Amenities, and Room Types
  console.log('[Seed] Upserting hotels, images, and room types...');
  for (const hotelData of SEED_HOTELS) {
    const { images, amenities, roomTypes, ...hotelFields } = hotelData;

    // Upsert Hotel
    const hotel = await prisma.hotel.upsert({
      where: { slug: hotelFields.slug },
      update: { ...hotelFields },
      create: { ...hotelFields },
    });

    // Sync Images: clear existing images for this hotel and insert fresh ordered list
    await prisma.hotelImage.deleteMany({ where: { hotelId: hotel.id } });
    if (images && images.length > 0) {
      await prisma.hotelImage.createMany({
        data: images.map((img) => ({
          hotelId: hotel.id,
          imageUrl: img.imageUrl,
          altText: img.altText || `${hotel.name} photo`,
          displayOrder: img.displayOrder || 0,
        })),
      });
    }

    // Sync Amenities
    await prisma.hotelAmenity.deleteMany({ where: { hotelId: hotel.id } });
    if (amenities && amenities.length > 0) {
      for (const amenityName of amenities) {
        const amenityId = amenityMap.get(amenityName);
        if (amenityId) {
          await prisma.hotelAmenity.upsert({
            where: {
              hotelId_amenityId: {
                hotelId: hotel.id,
                amenityId,
              },
            },
            update: {},
            create: {
              hotelId: hotel.id,
              amenityId,
            },
          });
        }
      }
    }

    // Sync Room Types
    if (roomTypes && roomTypes.length > 0) {
      for (const room of roomTypes) {
        const existingRoom = await prisma.roomType.findFirst({
          where: { hotelId: hotel.id, name: room.name },
        });

        if (existingRoom) {
          await prisma.roomType.update({
            where: { id: existingRoom.id },
            data: { ...room },
          });
        } else {
          await prisma.roomType.create({
            data: {
              hotelId: hotel.id,
              ...room,
            },
          });
        }
      }
    }

    console.log(`[Seed] Seeded hotel: ${hotel.name} (${hotel.city}, ${hotel.country})`);
  }

  const hotelCount = await prisma.hotel.count();
  const roomCount = await prisma.roomType.count();
  console.log(`[Seed] Finished successfully! ${hotelCount} hotels and ${roomCount} room types active.`);
}

main()
  .catch((e) => {
    console.error('[Seed] Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
