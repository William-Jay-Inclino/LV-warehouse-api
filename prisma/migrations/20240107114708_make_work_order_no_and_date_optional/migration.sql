-- AlterTable
ALTER TABLE "jo_approver" ALTER COLUMN "date_approval" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "meqs_approver" ALTER COLUMN "date_approval" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "po_approver" ALTER COLUMN "date_approval" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "request_voucher" ALTER COLUMN "work_order_no" DROP NOT NULL,
ALTER COLUMN "work_order_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "rv_approver" ALTER COLUMN "date_approval" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "spr_approver" ALTER COLUMN "date_approval" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;
