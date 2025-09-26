import React, {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
  type FC,
  type ComponentType,
} from "react";
import { useAuth as useAuthStore, useAuthActions } from "../stores/authStore";
import { type LoginRequest } from "../api/auth";
import { storageService } from "../utils/storage";

// AuthContextType interface for backward compatibility
export interface AuthContextType {
  user: any;
  tokens: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  clearError: () => void;
}

// Context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading, error } = useAuthStore();
  const { login, logout, refreshToken, getProfile, clearError } =
    useAuthActions();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user is already authenticated from localStorage
        if (isAuthenticated && user) {
          console.log("User already authenticated from localStorage:", user);
          return;
        }

        // Check if tokens exist in localStorage
        const { accessToken } = storageService.getTokens();
        if (accessToken && !isAuthenticated) {
          console.log("Found tokens in localStorage, getting profile...");
          await getProfile();
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // If there's an error, clear auth state
        logout();
      }
    };

    initializeAuth();
  }, []); // Run only once on mount

  // Refresh auth function (alias for refreshToken)
  const refreshAuth = async (): Promise<void> => {
    await refreshToken();
  };

  const contextValue: AuthContextType = {
    user,
    tokens: null, // Tokens are managed internally by the store
    isAuthenticated,
    isLoading,
    error,
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
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// Alias for backward compatibility
export const useAuth = useAuthContext;

// HOC for components that need auth
export const withAuth = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  return (props: P) => {
    const auth = useAuthContext();
    return React.createElement(Component, { ...props, auth });
  };
};
