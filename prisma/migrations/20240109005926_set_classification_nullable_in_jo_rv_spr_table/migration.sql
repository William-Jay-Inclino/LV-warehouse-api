-- AlterTable
ALTER TABLE "job_order" ALTER COLUMN "classification_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "request_voucher" ALTER COLUMN "classification_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "spare_parts_request" ALTER COLUMN "classification_id" DROP NOT NULL;
