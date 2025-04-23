import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { WorkspaceFormData } from "../types/workspace.types";
import toast from "react-hot-toast";

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
