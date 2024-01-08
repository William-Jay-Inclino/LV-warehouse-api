/*
  Warnings:

  - You are about to drop the column `status` on the `canvass` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "canvass" DROP COLUMN "status",
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "job_order" ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "purchase_order" ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "request_voucher" ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "spare_parts_request" ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false;
