-- AlterTable
ALTER TABLE "canvass" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "job_order" ALTER COLUMN "status" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" ALTER COLUMN "status" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "purchase_order" ALTER COLUMN "status" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "request_voucher" ALTER COLUMN "status" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "spare_parts_request" ALTER COLUMN "status" SET DEFAULT 1;
