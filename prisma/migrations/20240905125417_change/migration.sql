/*
  Warnings:

  - You are about to drop the `TimeEntryObject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `timeEntryId` to the `Part` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeEntryId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TimeEntryObject" DROP CONSTRAINT "TimeEntryObject_timeEntryId_fkey";

-- AlterTable
ALTER TABLE "Part" ADD COLUMN     "timeEntryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "timeEntryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TimeEntryObject";

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_timeEntryId_fkey" FOREIGN KEY ("timeEntryId") REFERENCES "TimeEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_timeEntryId_fkey" FOREIGN KEY ("timeEntryId") REFERENCES "TimeEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
