-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "starRating" INTEGER NOT NULL DEFAULT 4,
    "propertyType" TEXT NOT NULL DEFAULT 'Hotel',
    "ratingScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "ratingWord" TEXT DEFAULT 'Good',
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "contactPhone" TEXT,
    "contactEmail" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "freeCancellation" BOOLEAN NOT NULL DEFAULT true,
    "breakfastIncluded" BOOLEAN NOT NULL DEFAULT false,
    "minPrice" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelImage" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HotelImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT DEFAULT 'General',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelAmenity" (
    "hotelId" TEXT NOT NULL,
    "amenityId" TEXT NOT NULL,

    CONSTRAINT "HotelAmenity_pkey" PRIMARY KEY ("hotelId","amenityId")
);

-- CreateTable
CREATE TABLE "RoomType" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "capacity" INTEGER NOT NULL DEFAULT 2,
    "bedConfiguration" TEXT NOT NULL DEFAULT '1 King Bed',
    "basePrice" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "totalInventory" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomAmenity" (
    "roomTypeId" TEXT NOT NULL,
    "amenityId" TEXT NOT NULL,

    CONSTRAINT "RoomAmenity_pkey" PRIMARY KEY ("roomTypeId","amenityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_slug_key" ON "Hotel"("slug");

-- CreateIndex
CREATE INDEX "Hotel_city_idx" ON "Hotel"("city");

-- CreateIndex
CREATE INDEX "Hotel_country_idx" ON "Hotel"("country");

-- CreateIndex
CREATE INDEX "Hotel_propertyType_idx" ON "Hotel"("propertyType");

-- CreateIndex
CREATE INDEX "Hotel_starRating_idx" ON "Hotel"("starRating");

-- CreateIndex
CREATE INDEX "Hotel_ratingScore_idx" ON "Hotel"("ratingScore");

-- CreateIndex
CREATE INDEX "Hotel_minPrice_idx" ON "Hotel"("minPrice");

-- CreateIndex
CREATE INDEX "HotelImage_hotelId_idx" ON "HotelImage"("hotelId");

-- CreateIndex
CREATE INDEX "HotelImage_displayOrder_idx" ON "HotelImage"("displayOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Amenity_name_key" ON "Amenity"("name");

-- CreateIndex
CREATE INDEX "HotelAmenity_amenityId_idx" ON "HotelAmenity"("amenityId");

-- CreateIndex
CREATE INDEX "RoomType_hotelId_idx" ON "RoomType"("hotelId");

-- CreateIndex
CREATE INDEX "RoomType_basePrice_idx" ON "RoomType"("basePrice");

-- CreateIndex
CREATE INDEX "RoomType_isActive_idx" ON "RoomType"("isActive");

-- CreateIndex
CREATE INDEX "RoomAmenity_amenityId_idx" ON "RoomAmenity"("amenityId");

-- AddForeignKey
ALTER TABLE "HotelImage" ADD CONSTRAINT "HotelImage_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelAmenity" ADD CONSTRAINT "HotelAmenity_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelAmenity" ADD CONSTRAINT "HotelAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomType" ADD CONSTRAINT "RoomType_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAmenity" ADD CONSTRAINT "RoomAmenity_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "RoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAmenity" ADD CONSTRAINT "RoomAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
