import { apiService } from "./api";
import { mockAuthService } from "./mockService";
import { storageService } from "../utils/storage";
import { config } from "../config";
import {
  type LoginCredentials,
  type User,
  type AuthTokens,
} from "../types/auth";
class AuthService {
  async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      // Use mock service if enabled and in development
      if (config.ENABLE_MOCK_API && config.APP_ENV === "development") {
        const response = await mockAuthService.login(credentials);

        if (response.success && response.data) {
          const { user, tokens } = response.data;

          // Store tokens and user data
          storageService.setTokens(tokens.accessToken, tokens.refreshToken);
          storageService.setUser(user);

          // Set auth header for future requests
          apiService.setAuthToken(tokens.accessToken);

          return { user, tokens };
        }

        throw new Error(response.message || "Login failed");
      }

      // Use real API service
      const response = await apiService.post<{
        user: User;
        tokens: AuthTokens;
      }>("/auth/login", credentials);

      if (response.success && response.data) {
        const { user, tokens } = response.data;

        // Store tokens and user data
        storageService.setTokens(tokens.accessToken, tokens.refreshToken);
        storageService.setUser(user);

        // Set auth header for future requests
        apiService.setAuthToken(tokens.accessToken);

        return { user, tokens };
      }

      throw new Error(response.message || "Login failed");
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  }

  async logout(): Promise<void> {
    try {
      const { refreshToken } = storageService.getTokens();

      if (refreshToken) {
        await apiService.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage regardless of API call success
      storageService.clearAuth();
      apiService.clearAuthToken();
    }
  }

  async refreshAuth(): Promise<{ user: User; tokens: AuthTokens } | null> {
    try {
      const { refreshToken } = storageService.getTokens();

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiService.post<{
        user: User;
        tokens: AuthTokens;
      }>("/auth/refresh", {
        refreshToken,
      });

      if (response.success && response.data) {
        const { user, tokens } = response.data;

        // Update stored tokens and user data
        storageService.setTokens(tokens.accessToken, tokens.refreshToken);
        storageService.setUser(user);

        // Update auth header
        apiService.setAuthToken(tokens.accessToken);

        return { user, tokens };
      }

      throw new Error(response.message || "Token refresh failed");
    } catch (error: any) {
      // If refresh fails, clear auth data
      storageService.clearAuth();
      apiService.clearAuthToken();
      throw new Error(error.message || "Token refresh failed");
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiService.get<User>("/auth/me");

      if (response.success && response.data) {
        const user = response.data;
        storageService.setUser(user);
        return user;
      }

      return null;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await apiService.put<User>("/auth/profile", data);

      if (response.success && response.data) {
        const user = response.data;
        storageService.setUser(user);
        return user;
      }

      throw new Error(response.message || "Profile update failed");
    } catch (error: any) {
      throw new Error(error.message || "Profile update failed");
    }
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const response = await apiService.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (!response.success) {
        throw new Error(response.message || "Password change failed");
      }
    } catch (error: any) {
      throw new Error(error.message || "Password change failed");
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      const response = await apiService.post("/auth/forgot-password", {
        email,
      });

      if (!response.success) {
        throw new Error(response.message || "Password reset request failed");
      }
    } catch (error: any) {
      throw new Error(error.message || "Password reset request failed");
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const response = await apiService.post("/auth/reset-password", {
        token,
        newPassword,
      });

      if (!response.success) {
        throw new Error(response.message || "Password reset failed");
      }
    } catch (error: any) {
      throw new Error(error.message || "Password reset failed");
    }
  }

  // Utility methods
  isAuthenticated(): boolean {
    const { accessToken } = storageService.getTokens();
    return !!accessToken;
  }

  getStoredUser(): User | null {
    return storageService.getUser();
  }

  getStoredTokens(): AuthTokens | null {
    const { accessToken, refreshToken } = storageService.getTokens();
    return accessToken && refreshToken ? { accessToken, refreshToken } : null;
  }
}

export const authService = new AuthService();
