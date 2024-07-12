/*
  Warnings:

  - You are about to drop the column `price` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ProductVariation` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `ProductVariation` table. All the data in the column will be lost.
  - Added the required column `discountPercentage` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validUntil` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountPercentage` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "price",
ADD COLUMN     "discountPercentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "validUntil" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "price",
DROP COLUMN "stock",
ADD COLUMN     "discountPercentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
