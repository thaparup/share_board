import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Member } from "../types/member.types";
import { ExistingMemberResponse } from "../types/workspace.types";
import { User } from "../types/auth.types";
import { useQueryFetchWorkspaceById } from "./workspace";

export const addMember = async (formData: Member[], workspaceId: string) => {
  try {
    const response = await axios.post(`/api/member/${workspaceId}`, formData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const useMutationAddMember = () =>

//   useMutation({
//     mutationFn: ({
//       formData,
//       workspaceId,
//     }: {
//       formData: User[];
//       workspaceId: string;
//     }) => addMember(formData, workspaceId),
//   });

// Custom mutation hook to add members
export const useMutationAddMember = (workspaceId: string) => {
  const { refetch } = useQueryFetchWorkspaceById(workspaceId); // Get the refetch method

  return useMutation({
    mutationFn: ({
      formData,
      workspaceId,
    }: {
      formData: User[];
      workspaceId: string;
    }) => addMember(formData, workspaceId),
    onSuccess: () => {
      // Refetch the workspace data when the member is successfully added
      refetch();
    },
  });
};

const fetchExistingMemberOnTheWorkpsace = async (
  workspaceId: string
): Promise<ExistingMemberResponse> => {
  try {
    const response = await axios.get(`/api/member/${workspaceId}`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("couuld not fetch the member fot the workspace");
    }
    return response.data;
  } catch (error) {
    throw new Error("Could not fetch data");
  }
};

export const useQueryFetchExsitingMemberOnTheWorkspace = (
  workspaceId: string
) =>
  useQuery({
    queryKey: ["membersByWorkspaceId", workspaceId],
    queryFn: () => fetchExistingMemberOnTheWorkpsace(workspaceId),
    enabled: !!workspaceId,
  });
