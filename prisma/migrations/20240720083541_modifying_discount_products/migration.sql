/*
  Warnings:

  - The primary key for the `DiscountProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DiscountProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DiscountProduct" DROP CONSTRAINT "DiscountProduct_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "DiscountProduct_pkey" PRIMARY KEY ("discountId", "productId");
