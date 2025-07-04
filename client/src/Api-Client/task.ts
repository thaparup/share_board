import axios from "axios";
import {
  AssignedTasksResponse,
  CreateTaskFormData,
  DeleteTaskResponse,
  GetTaskByIdResponse,
  TasksWhereUserIsAdmin,
  UpdateTaskTodoForm,
} from "../types/task.types";
import { useQuery } from "@tanstack/react-query";

const fetchTaskId = async (
  workspaceId: string,
  taskId: string
): Promise<GetTaskByIdResponse> => {
  try {
    const response = await axios.get(`/api/task/${workspaceId}/${taskId}`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("Could not delete the task");
    }
    return response.data;
  } catch (error) {
    throw new Error("Could not delete the task");
  }
};

export const useFetchTaskById = (workspaceId: string, taskId: string) =>
  useQuery({
    queryKey: ["taskById", workspaceId, taskId],
    queryFn: () => {
      return fetchTaskId(workspaceId, taskId);
    },
    enabled: true,
  });

export const deleteTask = async (
  taskId: string
): Promise<DeleteTaskResponse> => {
  try {
    const response = await axios.delete(`/api/task/${taskId}`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("couuld not fetch the workspace");
    }
    return response.data;
  } catch (error) {
    throw new Error("Could not fetch data");
  }
};

export const createTask = async (
  formData: CreateTaskFormData,
  workspaceId: string
) => {
  try {
    const response = await axios.post(`/api/task/${workspaceId}`, formData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error("couldn't create a workspace");
  }
};

export const updateTask = async (
  formData: CreateTaskFormData,
  workspaceId: string,
  taskId: string
) => {
  try {
    const response = await axios.patch(
      `/api/task/${workspaceId}/${taskId}`,
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("couldn't create a workspace");
  }
};

const fetchTaskWhereUserIsAdmin = async (): Promise<TasksWhereUserIsAdmin> => {
  try {
    const response = await axios.get(`/api/task`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("couuld not fetch the task ");
    }
    return response.data;
  } catch (error) {
    throw new Error("Could not fetch data");
  }
};

export const useFetchTaskWhereUserIsAdmin = () =>
  useQuery({
    queryKey: ["taskWhereUserIsAdmin"],
    queryFn: () => {
      return fetchTaskWhereUserIsAdmin();
    },
    enabled: true,
  });

const fetchAllAssignedTasks = async (): Promise<AssignedTasksResponse> => {
  try {
    const response = await axios.get(`/api/task/assigned`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("couuld not fetch the assigned tasks");
    }
    return response.data;
  } catch (error) {
    throw new Error("Could not fetch data");
  }
};

export const useFetchAssignedTasks = () =>
  useQuery({
    queryKey: ["assignedTasks"],
    queryFn: () => {
      return fetchAllAssignedTasks();
    },
    enabled: true,
  });

export const updateTaskTodo = async (formData: UpdateTaskTodoForm) => {
  try {
    const response = await axios.patch(`/api/task/todo/`, formData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error("couldn't create a workspace");
  }
};
