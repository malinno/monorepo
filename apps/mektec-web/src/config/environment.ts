// Environment configuration
export interface EnvironmentConfig {
  // App Info
  NODE_ENV: string;
  APP_ENV: "development" | "staging" | "production";
  APP_NAME: string;
  APP_VERSION: string;

  // API Configuration
  API_BASE_URL: string;
  API_TIMEOUT: number;

  // Authentication
  JWT_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  TOKEN_EXPIRES_IN: string;
  REFRESH_TOKEN_EXPIRES_IN: string;

  // Features
  ENABLE_ANALYTICS: boolean;
  ENABLE_DEBUG: boolean;
  ENABLE_MOCK_API: boolean;

  // External Services
  GOOGLE_ANALYTICS_ID?: string;
  SENTRY_DSN?: string;
}

// Get environment variable with fallback
const getEnvVar = (key: string, defaultValue: string = ""): string => {
  return import.meta.env[key] || defaultValue;
};

// Get boolean environment variable
const getBooleanEnvVar = (
  key: string,
  defaultValue: boolean = false
): boolean => {
  const value = getEnvVar(key);
  return value === "true" || value === "1" || defaultValue;
};

// Get number environment variable
const getNumberEnvVar = (key: string, defaultValue: number = 0): number => {
  const value = getEnvVar(key);
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Environment configuration
export const config: EnvironmentConfig = {
  // App Info
  NODE_ENV: getEnvVar("NODE_ENV", "development"),
  APP_ENV: getEnvVar("VITE_APP_ENV", "development") as
    | "development"
    | "staging"
    | "production",
  APP_NAME: getEnvVar("VITE_APP_NAME", "Mektec Studio"),
  APP_VERSION: getEnvVar("VITE_APP_VERSION", "1.0.0"),

  // API Configuration
  API_BASE_URL: getEnvVar("VITE_API_BASE_URL", "http://localhost:3000/api"),
  API_TIMEOUT: getNumberEnvVar("VITE_API_TIMEOUT", 10000),

  // Authentication
  JWT_SECRET: getEnvVar("VITE_JWT_SECRET", "your-jwt-secret-key-here"),
  REFRESH_TOKEN_SECRET: getEnvVar(
    "VITE_REFRESH_TOKEN_SECRET",
    "your-refresh-token-secret-here"
  ),
  TOKEN_EXPIRES_IN: getEnvVar("VITE_TOKEN_EXPIRES_IN", "15m"),
  REFRESH_TOKEN_EXPIRES_IN: getEnvVar("VITE_REFRESH_TOKEN_EXPIRES_IN", "7d"),

  // Features
  ENABLE_ANALYTICS: getBooleanEnvVar("VITE_ENABLE_ANALYTICS", false),
  ENABLE_DEBUG: getBooleanEnvVar("VITE_ENABLE_DEBUG", true),
  ENABLE_MOCK_API: getBooleanEnvVar("VITE_ENABLE_MOCK_API", true),

  // External Services
  GOOGLE_ANALYTICS_ID: getEnvVar("VITE_GOOGLE_ANALYTICS_ID"),
  SENTRY_DSN: getEnvVar("VITE_SENTRY_DSN"),
};

// Environment-specific configurations
export const isDevelopment = config.APP_ENV === "development";
export const isStaging = config.APP_ENV === "staging";
export const isProduction = config.APP_ENV === "production";

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
    CHANGE_PASSWORD: "/auth/change-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  USERS: {
    LIST: "/users",
    CREATE: "/users",
    UPDATE: "/users",
    DELETE: "/users",
  },
  ANIMATIONS: {
    LIST: "/animations",
    CREATE: "/animations",
    UPDATE: "/animations",
    DELETE: "/animations",
    EXPORT: "/animations/export",
  },
} as const;

// Default API configuration
export const API_CONFIG = {
  BASE_URL: config.API_BASE_URL,
  TIMEOUT: config.API_TIMEOUT,
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
} as const;

export default config;
