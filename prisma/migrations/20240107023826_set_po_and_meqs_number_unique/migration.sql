/*
  Warnings:

  - A unique constraint covering the columns `[meqs_number]` on the table `material_equipment_quotation_summary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[po_number]` on the table `purchase_order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "material_equipment_quotation_summary_meqs_number_key" ON "material_equipment_quotation_summary"("meqs_number");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_po_number_key" ON "purchase_order"("po_number");
