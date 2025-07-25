import axios from "axios";
import { SigninFormData, SignupFormData, User } from "../types/auth.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const userSignup = async (data: SignupFormData) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);

  if (data.avatarImageFile instanceof File) {
    formData.append("avatarImageFile", data.avatarImageFile);
  }
  try {
    const response = await axios.post("/api/user", formData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message || "Signup failed";
  }
};

export const useMutationUserSignup = () => {
  return useMutation({ mutationFn: userSignup });
};

export const userSignin = async (formData: SigninFormData) => {
  try {
    const response = await axios.post("/api/user/auth/login", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useMutationSignin = () => useMutation({ mutationFn: userSignin });

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.post(
      "/api/user/auth/validate_token",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      "/api/user/auth/logout",
      {},
      { withCredentials: true }
    );

    if (response.status !== 200) {
      throw new Error("couldn't logout user");
    }
    return response.data;
  } catch (error) {
    throw new Error(error + "couldn't logout user");
  }
};

export const useMutationLogout = () => useMutation({ mutationFn: logoutUser });

export const fetchAllUsers = async (): Promise<UsersResponse> => {
  try {
    const response = await axios.get(
      "/api/user/",

      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

interface UsersResponse {
  message: string;
  data: User[];
}

export const searchUsersApi = async (query: string): Promise<UsersResponse> => {
  try {
    const response = await axios.get(
      `/api/user/search?query=${encodeURIComponent(query)}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const useQuerySearchUsers = (workspaceId: string, query: string) => {
  // return useQuery<UsersResponse, Error>({
  //   queryKey: ["users", "search", searchQuery],
  //   queryFn: () => searchUsersApi(searchQuery),
  //   enabled: !!searchQuery,
  // });
  return useQuery({
    queryKey: ["search-users", workspaceId, query],
    queryFn: async () => {
      const res = await axios.get("/api/users/search", {
        params: {
          query,
          workspaceId,
        },
      });
      return res.data;
    },
    enabled: query.length > 0,
  });
};

// export const useSearchUsers = (workspaceId: string, query: string) => {
//   return useQuery({
//     queryKey: ["search-users", workspaceId, query],
//     queryFn: async () => {
//       const res = await axios.get("/api/users/search", {
//         params: {
//           query,
//           workspaceId,
//         },
//       });
//       return res.data;
//     },
//     enabled: query.length > 0,
//   });
// };

export const useQueryFetchAllUsers = () =>
  useQuery({ queryKey: ["users"], queryFn: fetchAllUsers });
