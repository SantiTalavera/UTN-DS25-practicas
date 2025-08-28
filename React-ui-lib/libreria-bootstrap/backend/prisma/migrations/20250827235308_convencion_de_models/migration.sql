/*
  Warnings:

  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Comentario" DROP CONSTRAINT "Comentario_bookId_fkey";

-- DropForeignKey
ALTER TABLE "public"."book" DROP CONSTRAINT "book_autorId_fkey";

-- DropTable
DROP TABLE "public"."book";

-- CreateTable
CREATE TABLE "public"."Book" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "img" TEXT,
    "seccion" "public"."Section" NOT NULL,
    "autorId" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Comentario" ADD CONSTRAINT "Comentario_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book" ADD CONSTRAINT "Book_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "public"."Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
