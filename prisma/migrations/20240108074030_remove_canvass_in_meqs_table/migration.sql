/*
  Warnings:

  - You are about to drop the column `canvassId` on the `material_equipment_quotation_summary` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "material_equipment_quotation_summary" DROP CONSTRAINT "material_equipment_quotation_summary_canvassId_fkey";

-- DropIndex
DROP INDEX "material_equipment_quotation_summary_canvassId_key";

-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" DROP COLUMN "canvassId";
