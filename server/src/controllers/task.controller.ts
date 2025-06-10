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
        },
      });

      if (Array.isArray(checklist) && checklist.length > 0) {
        console.log(Array.isArray(checklist));
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
        const assignedUserList = await tx.taskAssignment.createMany({
          data: assignedTo.map((item) => ({
            taskId: createdTask.id,
            assignedUserId: item.memberId,
            assignedUserName: item.memberName,
            assignedUserEmail: item.memberEmail,
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
    console.log(existingTask);
    if (!existingTask) {
      res.status(400).json({ message: "No task found for the workspace" });
      return;
    }
    const taskAssignedUser = await prisma.taskAssignment.findMany({
      where: {
        taskId: taskId,
      },
    });

    const taskMember: any = [];
    taskAssignedUser.map((user) =>
      taskMember.push({
        //  id: user.id,
        // taskId: taskId,
        memberId: user.assignedUserId,
        memberName: user.assignedUserName,
        memberEmail: user.assignedUserEmail,

        // assingedAt: user.assignedAt,
      })
    );
    const tastTodo = await prisma.taskTodoCheckList.findMany({
      where: {
        taskId: taskId,
      },
    });
    console.log("task member", taskMember);
    res.status(200).json({
      message: "task fetched",
      data: {
        task: existingTask,
        assignedUser: taskMember,
        taskTodo: tastTodo,
      },
    });
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
    const allTheTask = await prisma.task.findMany({
      where: { taskCreatorId: userId },
    });

    const groupedArray = Object.values(
      allTheTask.reduce(
        (acc: { [key: string]: { workspaceId: string; tasks: any } }, task) => {
          const key = task.workspaceId;
          if (!acc[key]) {
            acc[key] = {
              workspaceId: key,
              tasks: [],
            };
          }
          acc[key].tasks.push(task);
          return acc;
        },
        {}
      )
    );

    res.status(200);
    res.json({
      message: "tasks where the user is the admin",
      data: groupedArray,
    });
  } catch (error) {
    console.error(error); // You might want to log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
}
