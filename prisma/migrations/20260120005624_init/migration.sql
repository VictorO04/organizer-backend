-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "igdb_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255),
    "summary" TEXT,
    "release_date" DATE,
    "cover_url" TEXT,
    "artwork_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_igdb_id_key" ON "games"("igdb_id");
