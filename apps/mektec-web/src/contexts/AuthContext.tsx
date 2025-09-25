import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  type FC,
  type ComponentType,
} from "react";
import { authService } from "../services/authService";
import {
  type AuthContextType,
  type AuthState,
  type LoginCredentials,
  type User,
} from "../types/auth";

// Initial state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { user: User; tokens: any } }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "AUTH_CLEAR_ERROR" }
  | { type: "AUTH_UPDATE_USER"; payload: User };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "AUTH_CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "AUTH_UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: "AUTH_START" });

        // Check if user is already authenticated
        if (authService.isAuthenticated()) {
          const storedUser = authService.getStoredUser();
          const storedTokens = authService.getStoredTokens();

          if (storedUser && storedTokens) {
            // Try to refresh the token to ensure it's still valid
            try {
              const refreshed = await authService.refreshAuth();
              if (refreshed) {
                dispatch({
                  type: "AUTH_SUCCESS",
                  payload: refreshed,
                });
              } else {
                throw new Error("Token refresh failed");
              }
            } catch (error) {
              // If refresh fails, try to get current user
              const currentUser = await authService.getCurrentUser();
              if (currentUser) {
                dispatch({
                  type: "AUTH_SUCCESS",
                  payload: { user: currentUser, tokens: storedTokens },
                });
              } else {
                throw new Error("Authentication failed");
              }
            }
          } else {
            throw new Error("No stored auth data");
          }
        } else {
          dispatch({ type: "AUTH_LOGOUT" });
        }
      } catch (error: any) {
        console.error("Auth initialization error:", error);
        dispatch({
          type: "AUTH_FAILURE",
          payload: error.message || "Authentication failed",
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: "AUTH_START" });

      const result = await authService.login(credentials);

      dispatch({
        type: "AUTH_SUCCESS",
        payload: result,
      });
    } catch (error: any) {
      dispatch({
        type: "AUTH_FAILURE",
        payload: error.message || "Login failed",
      });
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch({ type: "AUTH_LOGOUT" });
    }
  };

  // Refresh auth function
  const refreshAuth = async (): Promise<void> => {
    try {
      const result = await authService.refreshAuth();
      if (result) {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: result,
        });
      } else {
        throw new Error("Token refresh failed");
      }
    } catch (error: any) {
      dispatch({
        type: "AUTH_FAILURE",
        payload: error.message || "Token refresh failed",
      });
      throw error;
    }
  };

  // Clear error function
  const clearError = (): void => {
    dispatch({ type: "AUTH_CLEAR_ERROR" });
  };
  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    refreshAuth,
    clearError,
  };

  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// HOC for components that need auth
export const withAuth = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  return (props: P) => {
    const auth = useAuth();
    return React.createElement(Component, { ...props, auth });
  };
};
