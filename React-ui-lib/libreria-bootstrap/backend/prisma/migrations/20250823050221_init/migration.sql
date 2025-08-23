-- CreateEnum
CREATE TYPE "public"."Section" AS ENUM ('Filosofos_de_la_antiguedad', 'Renovadores_Del_Renacimiento', 'Difusores_contemporaneos', 'Populares_de_la_actualidad');

-- CreateTable
CREATE TABLE "public"."book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "url" TEXT,
    "section" "public"."Section" NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);
