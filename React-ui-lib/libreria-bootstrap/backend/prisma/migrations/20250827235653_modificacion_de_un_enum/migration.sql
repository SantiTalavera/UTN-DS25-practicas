/*
  Warnings:

  - The values [Renovadores_Del_Renacimiento] on the enum `Section` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Section_new" AS ENUM ('Filosofos_de_la_antiguedad', 'Renovadores_del_renacimiento', 'Difusores_contemporaneos', 'Populares_de_la_actualidad');
ALTER TABLE "public"."Book" ALTER COLUMN "seccion" TYPE "public"."Section_new" USING ("seccion"::text::"public"."Section_new");
ALTER TYPE "public"."Section" RENAME TO "Section_old";
ALTER TYPE "public"."Section_new" RENAME TO "Section";
DROP TYPE "public"."Section_old";
COMMIT;
