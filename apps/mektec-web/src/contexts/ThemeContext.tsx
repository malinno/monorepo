import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ACCENT_FORM_SECONDARY, PRIMARY_FORM_BG } from "../styles/colors";

export type ThemeMode = "light" | "dark" | "auto";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  actualMode: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme-mode");
    return (saved as ThemeMode) || "auto";
  });

  const [actualMode, setActualMode] = useState<"light" | "dark">("light");

  // Check if it's dark time (6 PM to 6 AM)
  const isDarkTime = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  };

  // Update actual mode based on current mode setting
  useEffect(() => {
    if (mode === "auto") {
      setActualMode(isDarkTime() ? "dark" : "light");
    } else {
      setActualMode(mode);
    }
  }, [mode]);

  // Check for time changes when in auto mode
  useEffect(() => {
    if (mode === "auto") {
      const interval = setInterval(() => {
        setActualMode(isDarkTime() ? "dark" : "light");
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [mode]);

  // Save mode to localStorage
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const toggleTheme = () => {
    if (mode === "light") {
      setMode("dark");
    } else if (mode === "dark") {
      setMode("auto");
    } else {
      setMode("light");
    }
  };

  const theme = createTheme({
    palette: {
      mode: actualMode,
      primary: {
        main: actualMode === "dark" ? "#90caf9" : "#1976d2",
      },
      secondary: {
        main: actualMode === "dark" ? "#f48fb1" : "#dc004e",
      },
      background: {
        default: actualMode === "dark" ? ACCENT_FORM_SECONDARY : "#f5f5f5", // accent-form-secondary for dark mode
        paper: actualMode === "dark" ? ACCENT_FORM_SECONDARY : "#ffffff", // accent-form-secondary for dark mode
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor:
              actualMode === "dark" ? ACCENT_FORM_SECONDARY : "#ffffff", // accent-form-secondary for dark mode
            color: actualMode === "dark" ? "#ffffff" : "#000000",
            boxShadow:
              actualMode === "dark"
                ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                : "0 2px 8px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            // Sidebar giữ nguyên màu cũ (không thay đổi theo theme)
            backgroundColor: PRIMARY_FORM_BG, // primary-form-bg
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          },
        },
      },
    },
  });

  const value = {
    mode,
    setMode,
    actualMode,
    toggleTheme,
  };

  return React.createElement(
    ThemeContext.Provider,
    { value },
    React.createElement(
      ThemeProvider,
      { theme },
      React.createElement(CssBaseline),
      children
    )
  );
};
