import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios";

// Extend AxiosRequestConfig to include custom properties
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  extra?: {
    startTime: Date;
  };
}
import { storageService } from "../utils/storage";
import { JwtService } from "../utils/jwt";
import { API_BASE_URL, API_TIMEOUT, HTTP_STATUS } from "../utils/constants";
import { type ApiResponse, type ApiError } from "../types/api";

class ApiService {
  private api: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
  }> = [];

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const { accessToken } = storageService.getTokens();

        if (accessToken && !JwtService.isTokenExpired(accessToken)) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Add request timestamp for debugging
        (config as CustomAxiosRequestConfig).extra = { startTime: new Date() };

        return config;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response time
        const config = response.config as CustomAxiosRequestConfig;
        if (config.extra?.startTime) {
          const endTime = new Date();
          const duration = endTime.getTime() - config.extra.startTime.getTime();
          console.log(
            `API Request to ${response.config.url} took ${duration}ms`
          );
        }

        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle 401 Unauthorized
        if (
          error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
          !originalRequest._retry
        ) {
          if (this.isRefreshing) {
            // If already refreshing, queue the request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return this.api(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const { refreshToken } = storageService.getTokens();

            if (!refreshToken || JwtService.isTokenExpired(refreshToken)) {
              throw new Error("Refresh token expired");
            }

            const response = await this.refreshToken(refreshToken);
            const { accessToken, refreshToken: newRefreshToken } =
              response.data;

            storageService.setTokens(accessToken, newRefreshToken);

            // Process failed queue
            this.processQueue(null);

            // Retry original request
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${accessToken}`,
            };

            return this.api(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError);
            this.handleAuthFailure();
            return Promise.reject(this.handleError(refreshError as AxiosError));
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private processQueue(error: any): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    this.failedQueue = [];
  }

  private handleAuthFailure(): void {
    storageService.clearAuth();
    // Redirect to login page
    window.location.href = "/login";
  }

  private handleError(error: AxiosError): ApiError {
    const apiError: ApiError = {
      message: "An unexpected error occurred",
      status: error.response?.status || 500,
      code: error.code,
      details: error.response?.data,
    };

    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data as any;

      switch (status) {
        case HTTP_STATUS.BAD_REQUEST:
          apiError.message = data?.message || "Bad Request";
          break;
        case HTTP_STATUS.UNAUTHORIZED:
          apiError.message = "Unauthorized access";
          break;
        case HTTP_STATUS.FORBIDDEN:
          apiError.message = "Access forbidden";
          break;
        case HTTP_STATUS.NOT_FOUND:
          apiError.message = "Resource not found";
          break;
        case HTTP_STATUS.CONFLICT:
          apiError.message = data?.message || "Conflict occurred";
          break;
        case HTTP_STATUS.UNPROCESSABLE_ENTITY:
          apiError.message = data?.message || "Validation failed";
          break;
        case HTTP_STATUS.TOO_MANY_REQUESTS:
          apiError.message = "Too many requests. Please try again later.";
          break;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          apiError.message = "Internal server error";
          break;
        case HTTP_STATUS.BAD_GATEWAY:
          apiError.message = "Bad gateway";
          break;
        case HTTP_STATUS.SERVICE_UNAVAILABLE:
          apiError.message = "Service temporarily unavailable";
          break;
        case HTTP_STATUS.GATEWAY_TIMEOUT:
          apiError.message = "Request timeout";
          break;
        default:
          apiError.message = data?.message || `HTTP Error ${status}`;
      }
    } else if (error.request) {
      // Network error
      apiError.message = "Network error. Please check your connection.";
      apiError.status = 0;
    } else {
      // Other error
      apiError.message = error.message || "An unexpected error occurred";
    }

    return apiError;
  }

  // Public methods
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    console.log("API GET:", url, config);
    const response = await this.api.get<ApiResponse<T>>(url, config);
    console.log("API GET Response:", response.data);
    return response.data;
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    console.log("API POST:", url, data, config);
    const response = await this.api.post<ApiResponse<T>>(url, data, config);
    console.log("API POST Response:", response.data);
    return response.data;
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.api.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.api.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.api.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // Auth specific methods
  private async refreshToken(
    refreshToken: string
  ): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken,
    });
    return response.data;
  }

  // Utility methods
  setAuthToken(token: string): void {
    this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  clearAuthToken(): void {
    delete this.api.defaults.headers.common["Authorization"];
  }

  getInstance(): AxiosInstance {
    return this.api;
  }
}

export const apiService = new ApiService();
