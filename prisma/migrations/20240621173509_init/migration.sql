-- CreateEnum
CREATE TYPE "CosplanCategory" AS ENUM ('VIDEO_GAME', 'ANIME', 'OC', 'SERIE', 'MOVIE', 'OTHER');

-- CreateEnum
CREATE TYPE "CosplanStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETE');

-- CreateEnum
CREATE TYPE "MaterialCategory" AS ENUM ('FOAM', 'PAINT', 'FABRIC', 'TOOL', 'HABERDASHERY', 'STATIONERY');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "firstname" VARCHAR(255),
    "lastname" VARCHAR(255),
    "avatar" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cosplan" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "fandom" VARCHAR(255) NOT NULL,
    "category" "CosplanCategory" NOT NULL,
    "status" "CosplanStatus" NOT NULL,
    "complexity" INTEGER,
    "deadline" TIMESTAMP(3),
    "image" VARCHAR(255),
    "cosmakerId" INTEGER NOT NULL,

    CONSTRAINT "Cosplan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cosplanId" INTEGER NOT NULL,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reference" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255),
    "image" VARCHAR(255),
    "cosplanId" INTEGER NOT NULL,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingTime" (
    "id" SERIAL NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "time" BIGINT NOT NULL,
    "partId" INTEGER,
    "taskId" INTEGER,

    CONSTRAINT "WorkingTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WipPicture" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255),
    "smallDesc" VARCHAR(255),
    "partId" INTEGER NOT NULL,

    CONSTRAINT "WipPicture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "bought" BOOLEAN NOT NULL DEFAULT false,
    "price" DOUBLE PRECISION NOT NULL,
    "category" "MaterialCategory" NOT NULL,
    "url" VARCHAR(255),
    "partId" INTEGER NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255),
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "description" VARCHAR(255),
    "partId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Cosplan" ADD CONSTRAINT "Cosplan_cosmakerId_fkey" FOREIGN KEY ("cosmakerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_cosplanId_fkey" FOREIGN KEY ("cosplanId") REFERENCES "Cosplan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_cosplanId_fkey" FOREIGN KEY ("cosplanId") REFERENCES "Cosplan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingTime" ADD CONSTRAINT "WorkingTime_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingTime" ADD CONSTRAINT "WorkingTime_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WipPicture" ADD CONSTRAINT "WipPicture_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
