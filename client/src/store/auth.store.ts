import { create } from "zustand";
import { fetchCurrentUser } from "../Api-Client/auth";
import { AuthStoreType, User } from "../types/auth.types";

export const useAuthStore = create<AuthStoreType>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user: User) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
  fetchUser: async () => {
    try {
      const user = await fetchCurrentUser();
      set({ isAuthenticated: true, user: user.data });
    } catch {
      set({ isAuthenticated: false, user: null });
    }
  },
}));
