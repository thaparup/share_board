import axios from "axios";
import { CreateTaskFormData, GetTaskByIdResponse } from "../types/task.types";
import { useMutation, useQuery } from "@tanstack/react-query";

const fetchTaskId = async (
  workspaceId: string,
  taskId: string
): Promise<GetTaskByIdResponse> => {
  try {
    const response = await axios.get(`/api/task/${workspaceId}/${taskId}`, {
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

export const useFetchTaskById = (workspaceId: string, taskId: string) =>
  useQuery({
    queryKey: ["taskById", workspaceId, taskId],
    queryFn: () => {
      return fetchTaskId(workspaceId, taskId);
    },
    enabled: true,
  });

const createTask = async (
  formData: CreateTaskFormData,
  workspaceId: string
) => {
  try {
    console.log(formData);
    const response = await axios.post(`/api/task/${workspaceId}`, formData, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("couldn't create a workspace");
    }

    return response.data;
  } catch (error) {
    throw new Error("couldn't create a workspace");
  }
};

export const useMutationCreateTask = () => {
  return useMutation({
    mutationFn: ({
      formData,
      workspaceId,
    }: {
      formData: CreateTaskFormData;
      workspaceId: string;
    }) => createTask(formData, workspaceId),
  });
};
