/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeText` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercentage` on the `ProductVariation` table. All the data in the column will be lost.
  - You are about to drop the column `validFrom` on the `ProductVariation` table. All the data in the column will be lost.
  - You are about to drop the column `roleName` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `wishlist` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Offer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Refund` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Return` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialMediaLink` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shippingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_variationId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Refund" DROP CONSTRAINT "Refund_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "Return" DROP CONSTRAINT "Return_orderItemId_fkey";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "createdAt",
DROP COLUMN "location",
DROP COLUMN "updatedAt",
DROP COLUMN "welcomeText",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "customText" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "discountPercentage",
DROP COLUMN "validFrom",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "roleName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "wishlist",
ADD COLUMN     "stripeCustomerId" TEXT;

-- DropTable
DROP TABLE "Offer";

-- DropTable
DROP TABLE "Refund";

-- DropTable
DROP TABLE "Return";

-- DropTable
DROP TABLE "SocialMediaLink";

-- CreateTable
CREATE TABLE "Discount" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "discountPercent" DOUBLE PRECISION NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "imagePublicId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" SERIAL NOT NULL,
    "businessId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserWishlist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserWishlist_AB_unique" ON "_UserWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_UserWishlist_B_index" ON "_UserWishlist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "ProductVariation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserWishlist" ADD CONSTRAINT "_UserWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserWishlist" ADD CONSTRAINT "_UserWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
