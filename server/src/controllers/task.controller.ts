import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createTaskSchema } from "../schema/task.schema";

const prisma = new PrismaClient();
export async function getAllTasks(req: Request, res: Response) {
  try {
    const workspaceId = req.params.id;
    const tasksOfAWorkspace = await prisma.task.findMany({
      where: { workspaceId: workspaceId },
    });
    if (tasksOfAWorkspace.length === 0) {
      res
        .status(200)
        .json({ message: "There is no task from this workspace yet!" });
      return;
    }

    res.status(200).json({
      message: "All tasks for the workspace",
      data: tasksOfAWorkspace,
    });
    return;
  } catch (error) {}
}

export async function createTask(req: Request, res: Response) {
  try {
    const user = req.user;
    const workspaceId = req.params.workspaceId;
    const parsed = createTaskSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Make sure required fields are not empty",
        errors: parsed.error.errors,
      });
      return;
    }

    const {
      name,
      description,
      priority,
      dueDate,
      progress,
      checklist,
      assignedTo,
    } = parsed.data;

    const result = await prisma.$transaction(async (tx) => {
      const createdTask = await tx.task.create({
        data: {
          name,
          description,
          priority,
          workspaceId: workspaceId!,
          taskCreatorId: user?.id!,
          taskCreatorName: user?.name!,
          taskCreatorEmail: user?.email!,
          dueDate,
          progress,
        },
      });

      if (Array.isArray(checklist) && checklist.length > 0) {
        await tx.taskTodoCheckList.createMany({
          data: checklist.map((item) => ({
            name: item.name,
            checked: item.checked ?? false,
            workspaceId: workspaceId!,
            taskId: createdTask.id,
          })),
        });
      }

      const createdTodoList = await tx.taskTodoCheckList.findMany({
        where: { taskId: createdTask.id },
      });

      if (Array.isArray(assignedTo) && assignedTo.length > 0) {
        await tx.taskAssignment.createMany({
          data: assignedTo.map((item) => ({
            taskId: createdTask.id,
            assignedUserId: item.id,
            assignedUserName: item.name,
            assignedUserEmail: item.email,
          })),
        });
      }
      const assignedUserList = await tx.taskAssignment.findMany({
        where: { taskId: createdTask.id },
      });

      return { createdTask, createdTodoList, assignedUserList };
    });

    res.status(201).json({
      message: "Task created successfully",
      data: {
        task: result.createdTask,
        taskTodo: result.createdTodoList,
        assignedUser: result.assignedUserList,
      },
    });
    return;
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      message: "Something went wrong while creating the task.",
    });
    return;
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const user = req.user;
    const taskId = req.params.taskId;
    const workspaceId = req.params.workspaceId;

    if (!taskId) {
      res.status(400).json({ message: "No task found" });
      return;
    }
    if (!workspaceId) {
      res.status(400).json({ message: "No workspace found" });
      return;
    }

    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        workspaceId: workspaceId,
      },
    });

    if (!existingTask) {
      res.status(400).json({ message: "No task found for the workspace" });
      return;
    }
    const parsed = createTaskSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Make sure required fields are not empty",
        errors: parsed.error.errors,
      });
      return;
    }

    const {
      name,
      description,
      priority,
      dueDate,
      progress,
      checklist,
      assignedTo,
    } = parsed.data;

    const result = await prisma.$transaction(async (tx) => {
      const updatedTask = await tx.task.update({
        where: { id: existingTask.id },
        data: {
          name,
          description,
          priority,
          dueDate,
          progress,
        },
      });

      await tx.taskTodoCheckList.deleteMany({
        where: { taskId: existingTask.id },
      });

      if (Array.isArray(checklist) && checklist.length > 0) {
        await tx.taskTodoCheckList.createMany({
          data: checklist.map((item) => ({
            name: item.name,
            checked: item.checked ?? false,
            workspaceId: existingTask.workspaceId,
            taskId,
          })),
        });
      }

      const updatedChecklist = await tx.taskTodoCheckList.findMany({
        where: { taskId: existingTask.id },
      });

      await tx.taskAssignment.deleteMany({
        where: { taskId: existingTask.id },
      });

      if (Array.isArray(assignedTo) && assignedTo.length > 0) {
        await tx.taskAssignment.createMany({
          data: assignedTo.map((item) => ({
            taskId: existingTask.id,
            assignedUserId: item.id!,
            assignedUserName: item.name!,
            assignedUserEmail: item.email!,
          })),
        });
      }

      const updatedAssignedUsers = await tx.taskAssignment.findMany({
        where: { taskId: existingTask.id },
      });

      return { updatedTask, updatedChecklist, updatedAssignedUsers };
    });

    res.status(200).json({
      message: "Task updated successfully",
      data: {
        task: result.updatedTask,
        taskTodo: result.updatedChecklist,
        assignedUser: result.updatedAssignedUsers,
      },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      message: "Something went wrong while updating the task.",
    });
  }
}
