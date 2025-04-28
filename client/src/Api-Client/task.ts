import axios from "axios";
import { GetTaskByIdResponse } from "../types/task.types";
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
