import axios from "axios";
import { SignupFormData } from "../types/auth.types";
import { useMutation } from "@tanstack/react-query";

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
