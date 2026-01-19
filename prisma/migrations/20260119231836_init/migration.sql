-- CreateTable
CREATE TABLE "jogos" (
    "id" SERIAL NOT NULL,
    "igdb_id" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255),
    "resumo" TEXT,
    "data_lancamento" DATE,
    "capa_url" TEXT,
    "banner_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jogos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jogos_igdb_id_key" ON "jogos"("igdb_id");
