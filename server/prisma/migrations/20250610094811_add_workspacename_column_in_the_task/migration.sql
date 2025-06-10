/*
  Warnings:

  - You are about to drop the column `progress` on the `Task` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceName` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignedUserAvatar` to the `TaskAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Progress" ADD VALUE 'OVERDUE';

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "progress",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "workspaceName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaskAssignment" ADD COLUMN     "assignedUserAvatar" TEXT NOT NULL;
