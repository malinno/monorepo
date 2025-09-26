import { apiService } from "../services/api";
import { type ApiResponse } from "../types/api";

// Auth API types
export interface LoginRequest {
  accountName: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    accountName: string;
    name?: string;
    email?: string;
    role?: string;
    avatar?: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// Actual API response format
export interface ActualLoginResponse {
  issuedDate: string;
  token: string;
  tokenExpirationTime: number;
  id: string;
  refreshToken: string;
}

export interface User {
  id: string;
  accountName: string;
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Auth API functions
export const authApi = {
  // Login
  login: async (
    credentials: LoginRequest
  ): Promise<ApiResponse<LoginResponse>> => {
    return apiService.post<LoginResponse>("/Auth/login", credentials);
  },

  // Logout
  logout: async (): Promise<ApiResponse<void>> => {
    return apiService.post<void>("/Auth/logout");
  },

  // Refresh token
  refreshToken: async (
    refreshToken: string
  ): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> => {
    return apiService.post<{ accessToken: string; refreshToken: string }>(
      "/Auth/refresh",
      { refreshToken }
    );
  },
};
