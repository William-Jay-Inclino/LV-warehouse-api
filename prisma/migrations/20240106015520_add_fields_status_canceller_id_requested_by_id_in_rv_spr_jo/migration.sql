/*
  Warnings:

  - You are about to drop the column `is_cancelled` on the `job_order` table. All the data in the column will be lost.
  - You are about to drop the column `is_cancelled` on the `request_voucher` table. All the data in the column will be lost.
  - You are about to drop the column `is_cancelled` on the `spare_parts_request` table. All the data in the column will be lost.
  - Added the required column `canceller_id` to the `job_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requested_by_id` to the `job_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `job_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canceller_id` to the `request_voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requested_by_id` to the `request_voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `request_voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canceller_id` to the `spare_parts_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requested_by_id` to the `spare_parts_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `spare_parts_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job_order" DROP COLUMN "is_cancelled",
ADD COLUMN     "canceller_id" TEXT NOT NULL,
ADD COLUMN     "requested_by_id" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "request_voucher" DROP COLUMN "is_cancelled",
ADD COLUMN     "canceller_id" TEXT NOT NULL,
ADD COLUMN     "requested_by_id" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "spare_parts_request" DROP COLUMN "is_cancelled",
ADD COLUMN     "canceller_id" TEXT NOT NULL,
ADD COLUMN     "requested_by_id" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "job_order" ADD CONSTRAINT "job_order_canceller_id_fkey" FOREIGN KEY ("canceller_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_order" ADD CONSTRAINT "job_order_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_voucher" ADD CONSTRAINT "request_voucher_canceller_id_fkey" FOREIGN KEY ("canceller_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_voucher" ADD CONSTRAINT "request_voucher_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spare_parts_request" ADD CONSTRAINT "spare_parts_request_canceller_id_fkey" FOREIGN KEY ("canceller_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spare_parts_request" ADD CONSTRAINT "spare_parts_request_requested_by_id_fkey" FOREIGN KEY ("requested_by_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
