import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  authApi,
  type LoginRequest,
  type User,
  type ActualLoginResponse,
} from "../api/auth";
import { storageService } from "../utils/storage";

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  getProfile: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (credentials: LoginRequest) => {
        try {
          set({ isLoading: true, error: null });

          const response = (await authApi.login(
            credentials
          )) as unknown as ActualLoginResponse;
          console.log("API Response:", response);
          console.log("Response type:", typeof response);
          console.log("Response keys:", Object.keys(response));

          // Handle response data - API returns direct format, not wrapped
          if (response && response.token) {
            // Create user object from response
            const user = {
              id: response.id || "1",
              accountName: credentials.accountName,
              name: credentials.accountName, // Use accountName as name since API doesn't provide name
              email: "", // API doesn't provide email
              role: "user", // Default role since API doesn't provide role
            };

            // Create tokens object
            const tokens = {
              accessToken: response.token,
              refreshToken: response.refreshToken,
            };

            // Save tokens to localStorage
            storageService.setTokens(tokens.accessToken, tokens.refreshToken);

            // Update state
            console.log("Setting authenticated state:", {
              user,
              isAuthenticated: true,
            });
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            console.error("Login failed - response:", response);
            throw new Error("Login failed - invalid response format");
          }
        } catch (error: any) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || "Login failed",
          });
          throw error;
        }
      },

      // Logout action
      logout: async () => {
        try {
          set({ isLoading: true });

          // Call logout API
          await authApi.logout();
        } catch (error) {
          console.error("Logout API error:", error);
        } finally {
          // Clear tokens from localStorage
          storageService.clearAuth();

          // Reset state
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // Refresh token action
      refreshToken: async () => {
        try {
          const { refreshToken } = storageService.getTokens();

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const response = await authApi.refreshToken(refreshToken);

          if (response.success && response.data) {
            const { accessToken, refreshToken: newRefreshToken } =
              response.data;

            // Save new tokens
            storageService.setTokens(accessToken, newRefreshToken);

            set({ error: null });
          } else {
            throw new Error("Token refresh failed");
          }
        } catch (error: any) {
          // If refresh fails, logout user
          get().logout();
          throw error;
        }
      },

      // Get user profile
      getProfile: async () => {
        try {
          set({ isLoading: true, error: null });

          // Get tokens from localStorage
          const { accessToken, refreshToken } = storageService.getTokens();

          if (accessToken) {
            // Create a basic user object from stored data
            // In a real app, you might want to call an API to get user details
            const user = {
              id: "1",
              accountName: "admin", // You might want to store this in localStorage too
              name: "Admin User",
              email: "admin@mektec.com",
              role: "admin",
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error("No access token found");
          }
        } catch (error: any) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || "Failed to get profile",
          });
          throw error;
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for easier access
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  return { user, isAuthenticated, isLoading, error };
};

export const useAuthActions = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const getProfile = useAuthStore((state) => state.getProfile);
  const clearError = useAuthStore((state) => state.clearError);
  const setLoading = useAuthStore((state) => state.setLoading);

  return { login, logout, refreshToken, getProfile, clearError, setLoading };
};
