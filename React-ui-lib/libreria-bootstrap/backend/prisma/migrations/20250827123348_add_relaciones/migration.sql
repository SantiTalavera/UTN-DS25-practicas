/*
  Warnings:

  - You are about to drop the column `author` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `book` table. All the data in the column will be lost.
  - Added the required column `autorId` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seccion` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."book" DROP COLUMN "author",
DROP COLUMN "section",
DROP COLUMN "title",
DROP COLUMN "url",
ADD COLUMN     "autorId" INTEGER NOT NULL,
ADD COLUMN     "img" TEXT,
ADD COLUMN     "seccion" "public"."Section" NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Autor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "epoca" TEXT NOT NULL,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comentario" (
    "id" SERIAL NOT NULL,
    "texto" TEXT,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- AddForeignKey
ALTER TABLE "public"."Comentario" ADD CONSTRAINT "Comentario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comentario" ADD CONSTRAINT "Comentario_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."book" ADD CONSTRAINT "book_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "public"."Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
