import axios from "axios";
import { SigninFormData, SignupFormData } from "../types/auth.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const userSignup = async (formData: SignupFormData) => {
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
      "/api/user/auth/current_user",
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
