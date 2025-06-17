import axios from "axios";
import { DashboardResponse } from "../types/dashboard.types";
import { useQuery } from "@tanstack/react-query";

export const getDashboardData = async (): Promise<DashboardResponse> => {
  try {
    const response = await axios.get(`/api/dashboard/stats/`, {
      withCredentials: true,
    });
    if (response.status !== 200) {
      throw new Error("couuld not fetch dashboard stats");
    }
    return response.data;
  } catch (error) {
    throw new Error("Could not fetch data");
  }
};

export const useGetDashboardStats = () =>
  useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => {
      return getDashboardData();
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
