// Mock API configuration for development when backend is not available
import { config } from "./environment";

export interface MockApiConfig {
  enabled: boolean;
  delay: number;
  baseUrl: string;
}

export const MOCK_API_CONFIG: MockApiConfig = {
  enabled: config.ENABLE_MOCK_API && config.APP_ENV === "development",
  delay: 500, // Simulate network delay
  baseUrl: "/api/mock",
};

// Mock API responses
export const MOCK_RESPONSES = {
  // Auth endpoints
  "/auth/login": {
    success: true,
    data: {
      user: {
        id: "1",
        name: "Test User",
        username: "testuser",
        email: "test@mektec.com",
        role: "admin",
        avatar: null,
      },
      tokens: {
        accessToken: "mock-access-token-12345",
        refreshToken: "mock-refresh-token-67890",
      },
    },
    message: "Login successful",
  },

  "/auth/refresh": {
    success: true,
    data: {
      accessToken: "new-mock-access-token-12345",
      refreshToken: "new-mock-refresh-token-67890",
    },
    message: "Token refreshed successfully",
  },

  "/auth/profile": {
    success: true,
    data: {
      id: "1",
      name: "Test User",
      username: "testuser",
      email: "test@mektec.com",
      role: "admin",
      avatar: null,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    message: "Profile retrieved successfully",
  },

  // Animation endpoints
  "/animations": {
    success: true,
    data: [
      {
        id: "1",
        name: "Sample Animation 1",
        description: "A sample animation flow",
        status: "active",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "2",
        name: "Sample Animation 2",
        description: "Another sample animation flow",
        status: "draft",
        createdAt: "2024-01-02T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      },
    ],
    message: "Animations retrieved successfully",
  },

  "/animations/1": {
    success: true,
    data: {
      id: "1",
      name: "Sample Animation 1",
      description: "A sample animation flow",
      status: "active",
      nodes: [],
      edges: [],
      settings: {
        width: 800,
        height: 600,
        backgroundColor: "#ffffff",
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    message: "Animation retrieved successfully",
  },
};

// Mock API service
export class MockApiService {
  private static instance: MockApiService;

  static getInstance(): MockApiService {
    if (!MockApiService.instance) {
      MockApiService.instance = new MockApiService();
    }
    return MockApiService.instance;
  }

  async request<T>(url: string, options: any = {}): Promise<T> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_CONFIG.delay));

    // Find matching mock response
    const mockResponse = this.findMockResponse(url, options.method || "GET");

    if (mockResponse) {
      return mockResponse as T;
    }

    // Default 404 response
    return {
      success: false,
      data: null,
      message: "Not found",
      status: 404,
    } as T;
  }

  private findMockResponse(url: string, method: string) {
    // Remove query parameters and base URL
    const cleanUrl = url.replace(/^.*\/api/, "").split("?")[0];

    // Direct match
    if (MOCK_RESPONSES[cleanUrl]) {
      return MOCK_RESPONSES[cleanUrl];
    }

    // Pattern matching for dynamic routes
    for (const [pattern, response] of Object.entries(MOCK_RESPONSES)) {
      if (pattern.includes("{id}") || pattern.includes(":")) {
        const regex = new RegExp(
          pattern.replace(/\{[^}]+\}/g, "[^/]+").replace(/:/g, "[^/]+")
        );
        if (regex.test(cleanUrl)) {
          return response;
        }
      }
    }

    return null;
  }
}

export const mockApiService = MockApiService.getInstance();
