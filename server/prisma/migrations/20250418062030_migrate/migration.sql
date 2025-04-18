/*
  Warnings:

  - You are about to drop the column `duedate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `taskcreatorid` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceid` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TaskAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `workspacecreatorid` on the `Workspace` table. All the data in the column will be lost.
  - You are about to drop the column `memberid` on the `WorkspaceMember` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceid` on the `WorkspaceMember` table. All the data in the column will be lost.
  - The `role` column on the `WorkspaceMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `dueDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskCreatorEmail` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskCreatorId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskCreatorName` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignedUserId` to the `TaskAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceCreatorId` to the `Workspace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `WorkspaceMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `WorkspaceMember` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'PENDING');

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskcreatorid_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_workspaceid_fkey";

-- DropForeignKey
ALTER TABLE "TaskAssignment" DROP CONSTRAINT "TaskAssignment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_workspacecreatorid_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_memberid_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_workspaceid_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "duedate",
DROP COLUMN "taskcreatorid",
DROP COLUMN "workspaceid",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "progress" "Progress" NOT NULL,
ADD COLUMN     "taskCreatorEmail" TEXT NOT NULL,
ADD COLUMN     "taskCreatorId" TEXT NOT NULL,
ADD COLUMN     "taskCreatorName" TEXT NOT NULL,
ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaskAssignment" DROP COLUMN "userId",
ADD COLUMN     "assignedUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "workspacecreatorid",
ADD COLUMN     "workspaceCreatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkspaceMember" DROP COLUMN "memberid",
DROP COLUMN "workspaceid",
ADD COLUMN     "memberId" TEXT NOT NULL,
ADD COLUMN     "workspaceId" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';

-- DropEnum
DROP TYPE "ROLE";

-- CreateTable
CREATE TABLE "TaskTodoCheckList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "workspaceId" TEXT NOT NULL,
    "taskId" TEXT,

    CONSTRAINT "TaskTodoCheckList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskCreatorId_fkey" FOREIGN KEY ("taskCreatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_assignedUserId_fkey" FOREIGN KEY ("assignedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskTodoCheckList" ADD CONSTRAINT "TaskTodoCheckList_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskTodoCheckList" ADD CONSTRAINT "TaskTodoCheckList_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_workspaceCreatorId_fkey" FOREIGN KEY ("workspaceCreatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
