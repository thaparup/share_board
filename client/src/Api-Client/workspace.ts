import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  WorkspaceById,
  WorkspaceFormData,
  Workspaces,
  WorkspacesResponse,
} from "../types/workspace.types";

const createWorkspace = async (formData: WorkspaceFormData) => {
  try {
    console.log("from create workadpsf");
    const response = await axios.post("/api/workspace", formData, {
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

export const useMutationCreateWorkspace = () =>
  useMutation({ mutationFn: createWorkspace });

const fetchAllWorkspace = async (): Promise<WorkspacesResponse> => {
  try {
    const response = await axios.get("/api/workspace", {
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

export const useQueryAllWorkspace = () =>
  useQuery({
    queryKey: ["workspaces"],
    queryFn: fetchAllWorkspace,
  });

const fetchWorkspaceById = async (
  workspaceId: string
): Promise<WorkspaceById> => {
  try {
    console.log("workspace id", workspaceId);
    const response = await axios.get("/api/workspace/" + workspaceId, {
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

export const useQueryFetchWorkspaceById = (workspaceId: string) =>
  useQuery({
    queryKey: ["workspacesById", workspaceId],
    queryFn: () => fetchWorkspaceById(workspaceId),
    enabled: !!workspaceId,
  });

const fetchAllTasksRelatedToWorkspaceId = async (workspaceId: string) => {
  try {
    console.log("workspace id", workspaceId);
    const response = await axios.get("/api/task/" + workspaceId, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("couuld not fetch the task");
    }
    return response.data;
  } catch (error) {
    throw new Error("Could not fetch data");
  }
};

export const useQueryFetchAllTasksRelatedToWorkspaceId = (
  workspaceId: string
) =>
  useQuery({
    queryKey: ["tasksOfWorkspaceId", workspaceId],
    queryFn: () => fetchAllTasksRelatedToWorkspaceId(workspaceId),
    enabled: !!workspaceId,
  });
