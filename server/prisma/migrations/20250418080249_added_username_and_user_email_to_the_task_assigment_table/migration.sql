/*
  Warnings:

  - Added the required column `assignedUserEmail` to the `TaskAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignedUserName` to the `TaskAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskAssignment" ADD COLUMN     "assignedUserEmail" TEXT NOT NULL,
ADD COLUMN     "assignedUserName" TEXT NOT NULL;
