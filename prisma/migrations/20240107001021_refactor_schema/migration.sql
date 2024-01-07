/*
  Warnings:

  - You are about to drop the column `canvass_id` on the `material_equipment_quotation_summary` table. All the data in the column will be lost.
  - You are about to drop the column `is_cancelled` on the `material_equipment_quotation_summary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[item_id]` on the table `canvass_item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[canvass_id]` on the table `job_order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jo_id]` on the table `material_equipment_quotation_summary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rv_id]` on the table `material_equipment_quotation_summary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[spr_id]` on the table `material_equipment_quotation_summary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[canvassId]` on the table `material_equipment_quotation_summary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[meqs_id]` on the table `purchase_order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[canvass_id]` on the table `request_voucher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[canvass_id]` on the table `spare_parts_request` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `canvass_id` to the `canvass_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jo_id` to the `jo_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canceller_id` to the `material_equipment_quotation_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `material_equipment_quotation_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meqs_id` to the `meqs_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `po_id` to the `po_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canceller_id` to the `purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purpose` to the `purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rv_id` to the `rv_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spr_id` to the `spr_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "material_equipment_quotation_summary" DROP CONSTRAINT "material_equipment_quotation_summary_canvass_id_fkey";

-- AlterTable
ALTER TABLE "canvass_item" ADD COLUMN     "canvass_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "jo_item" ADD COLUMN     "jo_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" DROP COLUMN "canvass_id",
DROP COLUMN "is_cancelled",
ADD COLUMN     "canceller_id" TEXT NOT NULL,
ADD COLUMN     "canvassId" TEXT,
ADD COLUMN     "jo_id" TEXT,
ADD COLUMN     "rv_id" TEXT,
ADD COLUMN     "spr_id" TEXT,
ADD COLUMN     "status" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "meqs_item" ADD COLUMN     "meqs_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "po_item" ADD COLUMN     "po_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "purchase_order" ADD COLUMN     "canceller_id" TEXT NOT NULL,
ADD COLUMN     "purpose" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "rv_item" ADD COLUMN     "rv_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "spr_item" ADD COLUMN     "spr_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "canvass_item_item_id_key" ON "canvass_item"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "job_order_canvass_id_key" ON "job_order"("canvass_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_equipment_quotation_summary_jo_id_key" ON "material_equipment_quotation_summary"("jo_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_equipment_quotation_summary_rv_id_key" ON "material_equipment_quotation_summary"("rv_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_equipment_quotation_summary_spr_id_key" ON "material_equipment_quotation_summary"("spr_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_equipment_quotation_summary_canvassId_key" ON "material_equipment_quotation_summary"("canvassId");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_meqs_id_key" ON "purchase_order"("meqs_id");

-- CreateIndex
CREATE UNIQUE INDEX "request_voucher_canvass_id_key" ON "request_voucher"("canvass_id");

-- CreateIndex
CREATE UNIQUE INDEX "spare_parts_request_canvass_id_key" ON "spare_parts_request"("canvass_id");

-- AddForeignKey
ALTER TABLE "canvass_item" ADD CONSTRAINT "canvass_item_canvass_id_fkey" FOREIGN KEY ("canvass_id") REFERENCES "canvass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jo_item" ADD CONSTRAINT "jo_item_jo_id_fkey" FOREIGN KEY ("jo_id") REFERENCES "job_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rv_item" ADD CONSTRAINT "rv_item_rv_id_fkey" FOREIGN KEY ("rv_id") REFERENCES "request_voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spr_item" ADD CONSTRAINT "spr_item_spr_id_fkey" FOREIGN KEY ("spr_id") REFERENCES "spare_parts_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_equipment_quotation_summary" ADD CONSTRAINT "material_equipment_quotation_summary_jo_id_fkey" FOREIGN KEY ("jo_id") REFERENCES "job_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_equipment_quotation_summary" ADD CONSTRAINT "material_equipment_quotation_summary_rv_id_fkey" FOREIGN KEY ("rv_id") REFERENCES "request_voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_equipment_quotation_summary" ADD CONSTRAINT "material_equipment_quotation_summary_spr_id_fkey" FOREIGN KEY ("spr_id") REFERENCES "spare_parts_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_equipment_quotation_summary" ADD CONSTRAINT "material_equipment_quotation_summary_canceller_id_fkey" FOREIGN KEY ("canceller_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_equipment_quotation_summary" ADD CONSTRAINT "material_equipment_quotation_summary_canvassId_fkey" FOREIGN KEY ("canvassId") REFERENCES "canvass"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_item" ADD CONSTRAINT "meqs_item_meqs_id_fkey" FOREIGN KEY ("meqs_id") REFERENCES "material_equipment_quotation_summary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_canceller_id_fkey" FOREIGN KEY ("canceller_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_item" ADD CONSTRAINT "po_item_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
