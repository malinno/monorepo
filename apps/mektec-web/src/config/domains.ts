// Domain configuration for different environments
export interface DomainConfig {
  api: string;
  web: string;
  cdn?: string;
  ws?: string;
}

// Environment-specific domain configurations
export const DOMAINS: Record<string, DomainConfig> = {
  development: {
    api: "http://192.168.2.31:5000/api/v1",
    web: "http://localhost:5173",
    cdn: "http://192.168.2.31:5000/static",
    ws: "ws://192.168.2.31:5000",
  },
  staging: {
    api: "http://192.168.2.31:5000/api/v1",
    web: "http://localhost:5174",
    cdn: "http://192.168.2.31:5000/static",
    ws: "ws://192.168.2.31:5000",
  },
  production: {
    api: "http://192.168.2.31:5000/api/v1",
    web: "http://localhost:5175",
    cdn: "http://192.168.2.31:5000/static",
    ws: "ws://192.168.2.31:5000",
  },
};

// Get current environment
const getCurrentEnvironment = (): string => {
  const env = import.meta.env.VITE_APP_ENV || "development";
  return env;
};

// Get domain configuration for current environment
export const getDomainConfig = (): DomainConfig => {
  const env = getCurrentEnvironment();
  return DOMAINS[env] || DOMAINS.development;
};

// Get specific domain
export const getApiDomain = (): string => {
  return getDomainConfig().api;
};

export const getWebDomain = (): string => {
  return getDomainConfig().web;
};

export const getCdnDomain = (): string => {
  return getDomainConfig().cdn || "";
};

export const getWsDomain = (): string => {
  return getDomainConfig().ws || "";
};

// CORS configuration
export const CORS_CONFIG = {
  development: {
    allowedOrigins: ["http://localhost:5173", "http://192.168.2.31:5000"],
    allowedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  },
  staging: {
    allowedOrigins: ["http://localhost:5174", "http://192.168.2.31:5000"],
    allowedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  },
  production: {
    allowedOrigins: ["http://localhost:5175", "http://192.168.2.31:5000"],
    allowedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  },
};

// Get CORS configuration for current environment
export const getCorsConfig = () => {
  const env = getCurrentEnvironment();
  return CORS_CONFIG[env] || CORS_CONFIG.development;
};

export default getDomainConfig;
