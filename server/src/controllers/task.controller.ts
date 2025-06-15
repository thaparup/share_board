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

    res.status(200).json({
      message: "All tasks for the workspace",
      data: tasksOfAWorkspace,
    });
    return;
  } catch (error) {}
}

export async function createTask(req: Request, res: Response) {
  try {
    const user = req.user as { id: string; name: string; email: string };
    const workspaceId = req.params.workspaceId;
    console.log(req.body);
    const parsed = createTaskSchema.safeParse(req.body);

    if (!workspaceId) {
      res
        .status(400)
        .json({ message: "Missing workspaceId in URL parameters." });
      return;
    }

    const findWorkspace = await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });

    if (!findWorkspace) {
      res.status(400).json({ message: "Workspace not found" });
      return;
    }
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
      checklist,
      assignedTo,
      startDate,
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
          startDate,
          workspaceName: findWorkspace.name,
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
            assignedUserId: item.memberId,
            assignedUserName: item.memberName,
            assignedUserEmail: item.memberEmail,
            assignedUserAvatar: item.memberAvatarImage || "",
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
    console.log(req.body);
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
      checklist,
      assignedTo,
      startDate,
    } = parsed.data;

    const result = await prisma.$transaction(async (tx) => {
      const updatedTask = await tx.task.update({
        where: { id: existingTask.id },
        data: {
          name,
          description,
          priority,
          dueDate,
          startDate,
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
            assignedUserId: item.memberId!,
            assignedUserName: item.memberName!,
            assignedUserEmail: item.memberEmail!,
            assignedUserAvatar: item.memberAvatarImage!,
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

export async function getTaskById(req: Request, res: Response) {
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
    const taskAssignedUser = await prisma.taskAssignment.findMany({
      where: {
        taskId: taskId,
      },
    });
    type Member = {
      memberId: string;
      memberName: string;
      memberEmail: string;
      memeberAvatarImage?: string;
    };
    const taskMember: Member[] = taskAssignedUser.map((user) => ({
      memberId: user.assignedUserId,
      memberName: user.assignedUserName,
      memberEmail: user.assignedUserEmail,
      memberAvatarImage: "",
    }));

    const tastTodo = await prisma.taskTodoCheckList.findMany({
      where: {
        taskId: taskId,
      },
    });
    res.status(200).json({
      message: "task fetched",
      data: {
        task: existingTask,
        assignedUser: taskMember,
        taskTodo: tastTodo,
      },
    });
    console.log(taskMember);
    return;
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getAllTaskWhereTheUserIsAdmin(
  req: Request,
  res: Response
) {
  try {
    const userId = req.user?.id;

    const workspace = await prisma.workspace.findMany({
      where: {
        workspaceCreatorId: userId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const allTheTasksOfTheWorkspace = await Promise.all(
      workspace.map(async (w) => {
        const tasks = await prisma.task.findMany({
          where: {
            workspaceId: w.id,
            taskCreatorId: userId,
          },
        });

        return {
          workspace: w.name,
          tasks: tasks,
        };
      })
    );

    const tasksInOtherWorkspaces = await prisma.task.findMany({
      where: {
        taskCreatorId: userId,
        workspaceId: {
          notIn: workspace.map((w) => w.id),
        },
      },
    });

    res.status(200);
    res.json({
      message: "tasks where the user is the admin",
      data: {
        taskWhereUserIsAdmin: allTheTasksOfTheWorkspace,
        taskWhereUserIsNotAdmin: tasksInOtherWorkspaces,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllAssignedTask(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const allTasksId = await prisma.taskAssignment.findMany({
      where: {
        assignedUserId: userId,
      },
      select: {
        taskId: true,
      },
    });

    const taskIds = allTasksId.map((item) => item.taskId);
    const allTasks = await prisma.task.findMany({
      where: {
        id: {
          in: taskIds,
        },
      },
    });
    res.json({
      message: "tasks where the user is the admin",
      data: {
        tasks: allTasks,
      },
    });

    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve assigned tasks" });
    return;
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const taskId = req.params.taskId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (!taskId) {
      res.status(400).json({ message: "No task id found" });
      return;
    }

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      res.status(400).json({ message: "No task found" });
      return;
    }

    await prisma.taskAssignment.deleteMany({ where: { taskId: task.id } });
    await prisma.task.delete({ where: { id: task.id } });
    await prisma.taskTodoCheckList.deleteMany({ where: { taskId: task.id } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
