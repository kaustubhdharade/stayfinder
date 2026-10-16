# StayFinder 🏨

> A production-style hotel discovery and price comparison web application inspired by Trivago.

StayFinder enables travelers to discover accommodations, compare prices across room categories, filter by amenities, and seamlessly explore verified stays worldwide.

---

## 🛠 Technology Stack

### Frontend Client
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

### Backend API & Database
- **Runtime**: [Node.js](https://nodejs.org/) (v20+ / v24)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL 16](https://www.postgresql.org/)
- **ORM**: [Prisma ORM](https://www.prisma.io/)
- **Containerization**: [Docker Compose](https://docs.docker.com/compose/)
- **Testing**: [Vitest](https://vitest.dev/) + [Supertest](https://github.com/ladjs/supertest)

---

## 📁 Repository Structure

```text
stayfinder/
├── docker-compose.yml         # Local PostgreSQL 16 container definition
├── package.json               # Root workspace scripts
├── .gitignore                 # Root gitignore (protects credentials & builds)
├── README.md                  # Project documentation
├── client/                    # React + Vite Frontend
│   ├── .env.example           # Client environment template
│   ├── vite.config.js         # Vite configuration with Tailwind & proxy
│   ├── package.json           # Client scripts & dependencies
│   └── src/
│       ├── components/        # Reusable UI components (Navbar, Footer, HotelCard, etc.)
│       ├── context/           # React context providers (AppContext)
│       ├── data/              # Mock fallback dataset (mockHotels.js)
│       ├── hooks/             # Custom React hooks (useHealthCheck)
│       ├── layouts/           # Page layouts (MainLayout)
│       ├── pages/             # Page views (HomePage, SearchResultsPage, HotelDetailsPage, Auth)
│       ├── services/          # API communication layer (hotelService.js, api.js)
│       └── utils/             # Helper utilities & formatters
└── server/                    # Node.js + Express Backend
    ├── .env.example           # Server environment template
    ├── package.json           # Server scripts & dependencies
    ├── prisma.config.ts       # Prisma runtime configuration
    ├── prisma/
    │   ├── schema.prisma      # PostgreSQL relational schema
    │   ├── seed.js            # Idempotent database seed script
    │   └── migrations/        # Applied migration history
    ├── src/
    │   ├── app.js             # Express application factory & middleware
    │   ├── server.js          # HTTP server bootstrap & graceful shutdown
    │   ├── controllers/       # Route controllers (hotel.controller.js, health.controller.js)
    │   ├── middleware/        # Custom middleware (cors, notFound, errorHandler)
    │   ├── routes/            # Express routers (hotel.routes.js, destination.routes.js)
    │   ├── services/          # Business logic & DB queries (hotel.service.js, prisma.js)
    │   ├── utils/             # Config loader & system utilities
    │   └── validators/        # Request validation middleware (hotel.validator.js)
    └── tests/
        ├── health.test.js     # Health check & baseline integration tests
        └── hotels.test.js     # Hotel discovery & destination API integration tests
```

---

## 🗄️ Database Architecture & Money Representation

The relational schema implements standard primary keys, indexed foreign keys, cascade deletion rules, and unique constraints:

- **`Hotel`**: Core property attributes (`name`, unique `slug`, `city`, `country`, `propertyType`, `starRating`, `ratingScore`, `reviewCount`, `minPrice`).
- **`HotelImage`**: Ordered gallery images (`hotelId`, `imageUrl`, `altText`, `displayOrder`).
- **`Amenity`**: Global amenities (`name`, `category`).
- **`HotelAmenity`**: Many-to-many join table (`hotelId`, `amenityId`).
- **`RoomType`**: Room category inventory (`hotelId`, `name`, `capacity`, `bedConfiguration`, `basePrice`, `currency`, `totalInventory`, `isActive`).
- **`RoomAmenity`**: Room-specific amenity join table (`roomTypeId`, `amenityId`).

### Exact Money Representation
In accordance with production financial standards, all room and hotel prices are stored in **integer minor currency units (cents)** rather than floating-point values:
- E.g. `$340.00 USD` is stored in the database as `34000`.
- The API service transforms and exposes both `priceInCents` (integer minor units) and `pricePerNight` / `price` (standard currency units) for precise client calculations.

---

## 🚀 Quickstart & Database Setup

### 1. Start the PostgreSQL Container
```bash
docker compose up -d
```
Verify the container is healthy:
```bash
docker exec stayfinder-postgres pg_isready -U postgres -d stayfinder
```

### 2. Run Prisma Migrations & Seed Database
```bash
# Apply migrations to PostgreSQL
npm --prefix server run db:migrate

# Seed with sample hotels, rooms, images, and amenities
npm --prefix server run db:seed
```

### 3. Start Backend & Frontend
In Terminal 1 (Backend on port 5001):
```bash
npm run dev:server
```

In Terminal 2 (Frontend on port 5173):
```bash
npm run dev:client
```

---

## 📡 REST API Reference

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health status and PostgreSQL connection state | None |
| `GET` | `/api/hotels` | Paginated, filtered, and sorted hotel list | `destination`, `minPrice`, `maxPrice`, `starRating`, `minRating`, `propertyType`, `amenities`, `freeCancellation`, `breakfastIncluded`, `sortBy`, `page`, `limit` |
| `GET` | `/api/hotels/:id` | Hotel details by UUID or slug, including images & rooms | None |
| `GET` | `/api/destinations`| Destination suggestions with counts & average prices | None |

### Query Parameters for `GET /api/hotels`:
- `destination` (string): Keyword search against name, city, country, address.
- `minPrice` / `maxPrice` (number): Price boundary in dollars.
- `starRating` (comma-separated integers): E.g. `5` or `4,5`.
- `minRating` (number): Minimum guest review score (0-10), e.g. `9.0`.
- `propertyType` (string): `Hotel`, `Resort`, `Boutique`, or `Apartment`.
- `amenities` (comma-separated strings): E.g. `Swimming Pool,Spa & Wellness`.
- `freeCancellation` (boolean): `true` or `false`.
- `sortBy` (string): `recommended`, `price_asc`, `price_desc`, `rating_desc`, `name_asc`.
- `page` (integer): Page number (default: `1`).
- `limit` (integer): Items per page (default: `10`, max: `50`).

---

## 🧪 Automated Testing

Execute the full test suite (client unit tests + server database integration tests):
```bash
npm test
```

Or run independently:
```bash
# Frontend tests (Vitest)
npm run test:client

# Backend integration tests (Vitest + Supertest + PostgreSQL)
npm run test:server
```
