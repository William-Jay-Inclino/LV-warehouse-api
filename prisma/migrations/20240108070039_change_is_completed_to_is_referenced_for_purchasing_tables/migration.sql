/*
  Warnings:

  - You are about to drop the column `is_completed` on the `canvass` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `job_order` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `material_equipment_quotation_summary` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `request_voucher` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `spare_parts_request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "canvass" DROP COLUMN "is_completed",
ADD COLUMN     "is_referenced" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "job_order" DROP COLUMN "is_completed",
ADD COLUMN     "is_referenced" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" DROP COLUMN "is_completed",
ADD COLUMN     "is_referenced" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "purchase_order" DROP COLUMN "is_completed",
ADD COLUMN     "is_referenced" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "request_voucher" DROP COLUMN "is_completed",
ADD COLUMN     "is_referenced" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "spare_parts_request" DROP COLUMN "is_completed",
ADD COLUMN     "is_referenced" BOOLEAN NOT NULL DEFAULT false;
