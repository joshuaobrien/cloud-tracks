/*
  Warnings:

  - Added the required column `end_time_seconds` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time_seconds` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "end_time_seconds" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "start_time_seconds" INTEGER NOT NULL;
