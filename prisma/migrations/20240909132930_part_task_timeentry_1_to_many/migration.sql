/*
  Warnings:

  - You are about to drop the column `timeEntryId` on the `Part` table. All the data in the column will be lost.
  - You are about to drop the column `timeEntryId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `partId` to the `TimeEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `TimeEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Part" DROP CONSTRAINT "Part_timeEntryId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_timeEntryId_fkey";

-- DropIndex
DROP INDEX "Part_timeEntryId_key";

-- DropIndex
DROP INDEX "Task_timeEntryId_key";

-- AlterTable
ALTER TABLE "Part" DROP COLUMN "timeEntryId";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "timeEntryId";

-- AlterTable
ALTER TABLE "TimeEntry" ADD COLUMN     "partId" INTEGER NOT NULL,
ADD COLUMN     "taskId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
