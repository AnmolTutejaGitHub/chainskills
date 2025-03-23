import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  checkAuth: () => {
    const user = localStorage.getItem("user");
    if (user) {
      set({ user: JSON.parse(user), isAuthenticated: true, isCheckingAuth: false });
    } else {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    localStorage.clear();
    set({ user: null, isAuthenticated: false, error: null });
  },
}));
