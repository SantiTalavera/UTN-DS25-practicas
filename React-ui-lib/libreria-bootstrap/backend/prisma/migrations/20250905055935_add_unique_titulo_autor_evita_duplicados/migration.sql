/*
  Warnings:

  - A unique constraint covering the columns `[titulo,autorId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Book_titulo_autorId_key" ON "public"."Book"("titulo", "autorId");
