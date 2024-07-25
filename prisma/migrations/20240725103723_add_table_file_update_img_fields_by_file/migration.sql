/*
  Warnings:

  - You are about to drop the column `image` on the `Cosplan` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Reference` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `WipPicture` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Cosplan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `Reference` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `WipPicture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `WipPicture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cosplan" DROP COLUMN "image",
ADD COLUMN     "imageId" INTEGER;

-- AlterTable
ALTER TABLE "Reference" DROP COLUMN "image",
ADD COLUMN     "imageId" INTEGER;

-- AlterTable
ALTER TABLE "WipPicture" DROP COLUMN "image",
ADD COLUMN     "imageId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "path" VARCHAR(255) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cosplan_imageId_key" ON "Cosplan"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Reference_imageId_key" ON "Reference"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "WipPicture_imageId_key" ON "WipPicture"("imageId");

-- AddForeignKey
ALTER TABLE "Cosplan" ADD CONSTRAINT "Cosplan_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WipPicture" ADD CONSTRAINT "WipPicture_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
