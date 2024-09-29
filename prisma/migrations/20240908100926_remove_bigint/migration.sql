/*
  Warnings:

  - You are about to alter the column `time` on the `TimeEntry` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "TimeEntry" ALTER COLUMN "time" SET DATA TYPE INTEGER;
