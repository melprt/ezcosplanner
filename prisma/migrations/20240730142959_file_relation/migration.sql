/*
  Warnings:

  - You are about to drop the column `imageId` on the `Cosplan` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Reference` table. All the data in the column will be lost.
  - You are about to drop the column `partId` on the `TimeEntry` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `TimeEntry` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `WipPicture` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fileId` to the `Reference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileId` to the `WipPicture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cosplan" DROP CONSTRAINT "Cosplan_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Reference" DROP CONSTRAINT "Reference_imageId_fkey";

-- DropForeignKey
ALTER TABLE "TimeEntry" DROP CONSTRAINT "TimeEntry_partId_fkey";

-- DropForeignKey
ALTER TABLE "TimeEntry" DROP CONSTRAINT "TimeEntry_taskId_fkey";

-- DropForeignKey
ALTER TABLE "WipPicture" DROP CONSTRAINT "WipPicture_imageId_fkey";

-- DropIndex
DROP INDEX "Cosplan_imageId_key";

-- DropIndex
DROP INDEX "Reference_imageId_key";

-- DropIndex
DROP INDEX "WipPicture_imageId_key";

-- AlterTable
ALTER TABLE "Cosplan" DROP COLUMN "imageId",
ADD COLUMN     "fileId" INTEGER;

-- AlterTable
ALTER TABLE "Reference" DROP COLUMN "imageId",
ADD COLUMN     "fileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TimeEntry" DROP COLUMN "partId",
DROP COLUMN "taskId";

-- AlterTable
ALTER TABLE "WipPicture" DROP COLUMN "imageId",
ADD COLUMN     "fileId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "File";

-- CreateTable
CREATE TABLE "TimeEntryObject" (
    "id" SERIAL NOT NULL,
    "objectId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "timeEntryId" INTEGER NOT NULL,

    CONSTRAINT "TimeEntryObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedFile" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "mimeType" VARCHAR(255) NOT NULL,

    CONSTRAINT "UploadedFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeEntryObject_timeEntryId_key" ON "TimeEntryObject"("timeEntryId");

-- AddForeignKey
ALTER TABLE "Cosplan" ADD CONSTRAINT "Cosplan_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "UploadedFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "UploadedFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntryObject" ADD CONSTRAINT "TimeEntryObject_timeEntryId_fkey" FOREIGN KEY ("timeEntryId") REFERENCES "TimeEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WipPicture" ADD CONSTRAINT "WipPicture_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "UploadedFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
