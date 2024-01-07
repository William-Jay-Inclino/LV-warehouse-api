-- CreateTable
CREATE TABLE "supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "division" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" TEXT NOT NULL,
    "division_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "middlename" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "department_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "classification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jo_approver_setting" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "approver_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "jo_approver_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rv_approver_setting" (
    "id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "rv_approver_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spr_approver_setting" (
    "id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "spr_approver_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meqs_approver_setting" (
    "id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "meqs_approver_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_approver_setting" (
    "id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "po_approver_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand_id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canvass" (
    "id" TEXT NOT NULL,
    "rc_number" TEXT NOT NULL,
    "date_requested" TIMESTAMP(3) NOT NULL,
    "purpose" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "requested_by_id" TEXT NOT NULL,
    "noted_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "canvass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canvass_item" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "canvass_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_item" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "supplier_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_order" (
    "id" TEXT NOT NULL,
    "jo_number" TEXT NOT NULL,
    "date_requested" TIMESTAMP(3) NOT NULL,
    "canvass_id" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "classification_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "supervisor_id" TEXT NOT NULL,
    "is_cancelled" BOOLEAN NOT NULL,
    "purpose" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "job_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jo_item" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "jo_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jo_approver" (
    "id" TEXT NOT NULL,
    "jo_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "date_approval" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "jo_approver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_voucher" (
    "id" TEXT NOT NULL,
    "rv_number" TEXT NOT NULL,
    "date_requested" TIMESTAMP(3) NOT NULL,
    "canvass_id" TEXT NOT NULL,
    "work_order_no" TEXT NOT NULL,
    "work_order_date" TIMESTAMP(3) NOT NULL,
    "classification_id" TEXT NOT NULL,
    "supervisor_id" TEXT NOT NULL,
    "is_cancelled" BOOLEAN NOT NULL,
    "purpose" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "request_voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rv_item" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "rv_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rv_approver" (
    "id" TEXT NOT NULL,
    "rv_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "date_approval" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "rv_approver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spare_parts_request" (
    "id" TEXT NOT NULL,
    "spr_number" TEXT NOT NULL,
    "date_requested" TIMESTAMP(3) NOT NULL,
    "canvass_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "classification_id" TEXT NOT NULL,
    "supervisor_id" TEXT NOT NULL,
    "is_cancelled" BOOLEAN NOT NULL,
    "purpose" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "spare_parts_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spr_item" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "spr_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spr_approver" (
    "id" TEXT NOT NULL,
    "spr_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "date_approval" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "spr_approver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_equipment_quotation_summary" (
    "id" TEXT NOT NULL,
    "canvass_id" TEXT NOT NULL,
    "meqs_number" TEXT NOT NULL,
    "reference_type" INTEGER NOT NULL,
    "meqs_date" TIMESTAMP(3) NOT NULL,
    "purpose" TEXT NOT NULL,
    "is_cancelled" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "material_equipment_quotation_summary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meqs_item" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "meqs_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meqs_approver" (
    "id" TEXT NOT NULL,
    "meqs_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "date_approval" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "meqs_approver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order" (
    "id" TEXT NOT NULL,
    "meqs_id" TEXT NOT NULL,
    "po_number" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "po_date" TIMESTAMP(3) NOT NULL,
    "payment_terms" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "purchase_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_item" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "po_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_approver" (
    "id" TEXT NOT NULL,
    "po_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "date_approval" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "po_approver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jo_approver_setting_order_key" ON "jo_approver_setting"("order");

-- CreateIndex
CREATE UNIQUE INDEX "jo_approver_setting_approver_id_key" ON "jo_approver_setting"("approver_id");

-- CreateIndex
CREATE UNIQUE INDEX "rv_approver_setting_approver_id_key" ON "rv_approver_setting"("approver_id");

-- CreateIndex
CREATE UNIQUE INDEX "rv_approver_setting_order_key" ON "rv_approver_setting"("order");

-- CreateIndex
CREATE UNIQUE INDEX "spr_approver_setting_approver_id_key" ON "spr_approver_setting"("approver_id");

-- CreateIndex
CREATE UNIQUE INDEX "spr_approver_setting_order_key" ON "spr_approver_setting"("order");

-- CreateIndex
CREATE UNIQUE INDEX "meqs_approver_setting_approver_id_key" ON "meqs_approver_setting"("approver_id");

-- CreateIndex
CREATE UNIQUE INDEX "meqs_approver_setting_order_key" ON "meqs_approver_setting"("order");

-- CreateIndex
CREATE UNIQUE INDEX "po_approver_setting_approver_id_key" ON "po_approver_setting"("approver_id");

-- CreateIndex
CREATE UNIQUE INDEX "po_approver_setting_order_key" ON "po_approver_setting"("order");

-- CreateIndex
CREATE UNIQUE INDEX "canvass_rc_number_key" ON "canvass"("rc_number");

-- CreateIndex
CREATE UNIQUE INDEX "job_order_jo_number_key" ON "job_order"("jo_number");

-- CreateIndex
CREATE UNIQUE INDEX "request_voucher_rv_number_key" ON "request_voucher"("rv_number");

-- CreateIndex
CREATE UNIQUE INDEX "spare_parts_request_spr_number_key" ON "spare_parts_request"("spr_number");

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "department_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jo_approver_setting" ADD CONSTRAINT "jo_approver_setting_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rv_approver_setting" ADD CONSTRAINT "rv_approver_setting_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spr_approver_setting" ADD CONSTRAINT "spr_approver_setting_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_approver_setting" ADD CONSTRAINT "meqs_approver_setting_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_approver_setting" ADD CONSTRAINT "po_approver_setting_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canvass" ADD CONSTRAINT "canvass_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canvass" ADD CONSTRAINT "canvass_noted_by_id_fkey" FOREIGN KEY ("noted_by_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canvass_item" ADD CONSTRAINT "canvass_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_item" ADD CONSTRAINT "supplier_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_item" ADD CONSTRAINT "supplier_item_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_order" ADD CONSTRAINT "job_order_canvass_id_fkey" FOREIGN KEY ("canvass_id") REFERENCES "canvass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_order" ADD CONSTRAINT "job_order_classification_id_fkey" FOREIGN KEY ("classification_id") REFERENCES "classification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_order" ADD CONSTRAINT "job_order_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_order" ADD CONSTRAINT "job_order_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jo_item" ADD CONSTRAINT "jo_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jo_approver" ADD CONSTRAINT "jo_approver_jo_id_fkey" FOREIGN KEY ("jo_id") REFERENCES "job_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jo_approver" ADD CONSTRAINT "jo_approver_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_voucher" ADD CONSTRAINT "request_voucher_canvass_id_fkey" FOREIGN KEY ("canvass_id") REFERENCES "canvass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_voucher" ADD CONSTRAINT "request_voucher_classification_id_fkey" FOREIGN KEY ("classification_id") REFERENCES "classification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_voucher" ADD CONSTRAINT "request_voucher_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rv_item" ADD CONSTRAINT "rv_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rv_approver" ADD CONSTRAINT "rv_approver_rv_id_fkey" FOREIGN KEY ("rv_id") REFERENCES "request_voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rv_approver" ADD CONSTRAINT "rv_approver_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spare_parts_request" ADD CONSTRAINT "spare_parts_request_canvass_id_fkey" FOREIGN KEY ("canvass_id") REFERENCES "canvass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spare_parts_request" ADD CONSTRAINT "spare_parts_request_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spare_parts_request" ADD CONSTRAINT "spare_parts_request_classification_id_fkey" FOREIGN KEY ("classification_id") REFERENCES "classification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spare_parts_request" ADD CONSTRAINT "spare_parts_request_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spr_item" ADD CONSTRAINT "spr_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spr_approver" ADD CONSTRAINT "spr_approver_spr_id_fkey" FOREIGN KEY ("spr_id") REFERENCES "spare_parts_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spr_approver" ADD CONSTRAINT "spr_approver_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_equipment_quotation_summary" ADD CONSTRAINT "material_equipment_quotation_summary_canvass_id_fkey" FOREIGN KEY ("canvass_id") REFERENCES "canvass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_item" ADD CONSTRAINT "meqs_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_approver" ADD CONSTRAINT "meqs_approver_meqs_id_fkey" FOREIGN KEY ("meqs_id") REFERENCES "material_equipment_quotation_summary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_approver" ADD CONSTRAINT "meqs_approver_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_meqs_id_fkey" FOREIGN KEY ("meqs_id") REFERENCES "material_equipment_quotation_summary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_item" ADD CONSTRAINT "po_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_approver" ADD CONSTRAINT "po_approver_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_approver" ADD CONSTRAINT "po_approver_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
