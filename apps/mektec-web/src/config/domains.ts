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
    api: "http://localhost:3000/api",
    web: "http://localhost:5173",
    cdn: "http://localhost:3000/static",
    ws: "ws://localhost:3000",
  },
  staging: {
    api: "http://localhost:3001/api", // Local staging server
    web: "http://localhost:5174",
    cdn: "http://localhost:3001/static",
    ws: "ws://localhost:3001",
  },
  production: {
    api: "http://localhost:3002/api", // Local production server
    web: "http://localhost:5175",
    cdn: "http://localhost:3002/static",
    ws: "ws://localhost:3002",
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
    allowedOrigins: ["http://localhost:5173", "http://localhost:3000"],
    allowedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  },
  staging: {
    allowedOrigins: ["http://localhost:5174", "http://localhost:3001"],
    allowedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  },
  production: {
    allowedOrigins: ["http://localhost:5175", "http://localhost:3002"],
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
