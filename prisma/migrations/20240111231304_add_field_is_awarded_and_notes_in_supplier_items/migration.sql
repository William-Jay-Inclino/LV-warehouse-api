-- AlterTable
ALTER TABLE "supplier_item" ADD COLUMN     "is_awarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notes" TEXT;
