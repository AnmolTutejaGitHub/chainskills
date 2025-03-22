import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  connect: async () => {},
  logout: async () => {
    localStorage.clear();
    set({ user: null, isAuthenticated: false, error: null });
  },
}));
