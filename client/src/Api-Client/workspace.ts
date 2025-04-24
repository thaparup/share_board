import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
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
  useQuery({ queryFn: fetchAllWorkspace, queryKey: ["workspaces"] });
