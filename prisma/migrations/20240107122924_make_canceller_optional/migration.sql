-- AlterTable
ALTER TABLE "job_order" ALTER COLUMN "canceller_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" ALTER COLUMN "canceller_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "purchase_order" ALTER COLUMN "canceller_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "request_voucher" ALTER COLUMN "canceller_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "spare_parts_request" ALTER COLUMN "canceller_id" DROP NOT NULL;
