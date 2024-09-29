/*
  Warnings:

  - A unique constraint covering the columns `[timeEntryId]` on the table `Part` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[timeEntryId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Part_timeEntryId_key" ON "Part"("timeEntryId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_timeEntryId_key" ON "Task"("timeEntryId");
