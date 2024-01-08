/*
  Warnings:

  - You are about to drop the column `is_referenced` on the `material_equipment_quotation_summary` table. All the data in the column will be lost.
  - You are about to drop the column `is_referenced` on the `purchase_order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" DROP COLUMN "is_referenced";

-- AlterTable
ALTER TABLE "purchase_order" DROP COLUMN "is_referenced";
