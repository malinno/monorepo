// Mock service for development when backend is not available
import { mockApiService, MOCK_API_CONFIG } from "../config";
import { type ApiResponse } from "../types/api";
import {
  type User,
  type LoginCredentials,
  type AuthTokens,
} from "../types/auth";

export class MockAuthService {
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> {
    if (!MOCK_API_CONFIG.enabled) {
      throw new Error("Mock API is disabled");
    }

    // Simulate validation
    if (
      credentials.username === "testuser" &&
      credentials.password === "password"
    ) {
      return await mockApiService.request("/auth/login");
    } else {
      return {
        success: false,
        data: null,
        message: "Invalid credentials",
        status: 401,
      };
    }
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthTokens>> {
    if (!MOCK_API_CONFIG.enabled) {
      throw new Error("Mock API is disabled");
    }

    return await mockApiService.request("/auth/refresh");
  }

  async getProfile(): Promise<ApiResponse<User>> {
    if (!MOCK_API_CONFIG.enabled) {
      throw new Error("Mock API is disabled");
    }

    return await mockApiService.request("/auth/profile");
  }

  async logout(): Promise<ApiResponse<null>> {
    if (!MOCK_API_CONFIG.enabled) {
      throw new Error("Mock API is disabled");
    }

    return {
      success: true,
      data: null,
      message: "Logout successful",
      status: 200,
    };
  }
}

export class MockAnimationService {
  async getAnimations(): Promise<ApiResponse<any[]>> {
    if (!MOCK_API_CONFIG.enabled) {
      throw new Error("Mock API is disabled");
    }

    return await mockApiService.request("/animations");
  }

  async getAnimation(id: string): Promise<ApiResponse<any>> {
    if (!MOCK_API_CONFIG.enabled) {
      throw new Error("Mock API is disabled");
    }

    return await mockApiService.request(`/animations/${id}`);
  }

  async createAnimation(data: any): Promise<ApiResponse<any>> {
    if (!MOCK_API_CONFIG.enabled) {
      throw new Error("Mock API is disabled");
    }

    return {
      success: true,
      data: {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: "Animation created successfully",
      status: 201,
    };
  }

  async updateAnimation(id: string, data: any): Promise<ApiResponse<any>> {
    if (!MOCK_API_CONFIG.enabled) {
      throw new Error("Mock API is disabled");
    }

    return {
      success: true,
      data: {
        id,
        ...data,
        updatedAt: new Date().toISOString(),
      },
      message: "Animation updated successfully",
      status: 200,
    };
  }

  async deleteAnimation(id: string): Promise<ApiResponse<null>> {
    if (!MOCK_API_CONFIG.enabled) {
      throw new Error("Mock API is disabled");
    }

    return {
      success: true,
      data: null,
      message: "Animation deleted successfully",
      status: 200,
    };
  }
}

export const mockAuthService = new MockAuthService();
export const mockAnimationService = new MockAnimationService();
