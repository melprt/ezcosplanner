-- DropForeignKey
ALTER TABLE "Reference" DROP CONSTRAINT "Reference_fileId_fkey";

-- DropForeignKey
ALTER TABLE "WipPicture" DROP CONSTRAINT "WipPicture_fileId_fkey";

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "UploadedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WipPicture" ADD CONSTRAINT "WipPicture_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "UploadedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
