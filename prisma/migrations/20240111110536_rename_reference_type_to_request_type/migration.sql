/*
  Warnings:

  - You are about to drop the column `reference_type` on the `material_equipment_quotation_summary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" DROP COLUMN "reference_type",
ADD COLUMN     "request_type" INTEGER NOT NULL DEFAULT 1;
