-- DropForeignKey
ALTER TABLE "Cosplan" DROP CONSTRAINT "Cosplan_fileId_fkey";

-- AddForeignKey
ALTER TABLE "Cosplan" ADD CONSTRAINT "Cosplan_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "UploadedFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
