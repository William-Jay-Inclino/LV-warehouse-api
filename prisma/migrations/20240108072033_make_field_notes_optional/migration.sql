-- AlterTable
ALTER TABLE "canvass" ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "job_order" ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "purchase_order" ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "request_voucher" ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "spare_parts_request" ALTER COLUMN "notes" DROP NOT NULL;
