import { config } from "../config";

export const API_BASE_URL = config.API_BASE_URL;
export const API_TIMEOUT = config.API_TIMEOUT;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "mektec_access_token",
  REFRESH_TOKEN: "mektec_refresh_token",
  USER_DATA: "mektec_user_data",
  THEME_MODE: "mektec_theme_mode",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  ANIMATION: "/animation",
} as const;

export const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiry
