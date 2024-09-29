-- DropForeignKey
ALTER TABLE "Part" DROP CONSTRAINT "Part_timeEntryId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_timeEntryId_fkey";

-- AlterTable
ALTER TABLE "Part" ALTER COLUMN "timeEntryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "timeEntryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_timeEntryId_fkey" FOREIGN KEY ("timeEntryId") REFERENCES "TimeEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_timeEntryId_fkey" FOREIGN KEY ("timeEntryId") REFERENCES "TimeEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
