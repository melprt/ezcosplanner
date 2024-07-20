/*
  Warnings:

  - You are about to drop the column `title` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `WorkingTime` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkingTime" DROP CONSTRAINT "WorkingTime_partId_fkey";

-- DropForeignKey
ALTER TABLE "WorkingTime" DROP CONSTRAINT "WorkingTime_taskId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(255);

-- DropTable
DROP TABLE "WorkingTime";

-- CreateTable
CREATE TABLE "TimeEntry" (
    "id" SERIAL NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "time" BIGINT NOT NULL,
    "partId" INTEGER,
    "taskId" INTEGER,

    CONSTRAINT "TimeEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
