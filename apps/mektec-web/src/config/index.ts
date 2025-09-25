// Export all configuration modules
export * from "./environment";
export * from "./domains";
export * from "./mockApi";

// Re-export commonly used configurations
export { config as envConfig } from "./environment";
export { getDomainConfig, getApiDomain, getWebDomain } from "./domains";
export { mockApiService, MOCK_API_CONFIG } from "./mockApi";
