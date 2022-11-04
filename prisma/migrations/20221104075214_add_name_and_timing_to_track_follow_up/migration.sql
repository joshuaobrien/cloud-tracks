/*
  Warnings:

  - You are about to drop the column `end_time_seconds` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `start_time_seconds` on the `Track` table. All the data in the column will be lost.
  - Added the required column `endTimeSeconds` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTimeSeconds` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "end_time_seconds",
DROP COLUMN "start_time_seconds",
ADD COLUMN     "endTimeSeconds" INTEGER NOT NULL,
ADD COLUMN     "startTimeSeconds" INTEGER NOT NULL;
