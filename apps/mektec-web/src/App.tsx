import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lightTheme } from "./theme/theme";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/common/ErrorBoundary";

import { AppRouter } from "./router";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return React.createElement(
    ErrorBoundary,
    null,
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(
        ThemeProvider,
        { theme: lightTheme },
        React.createElement(CssBaseline),
        React.createElement(
          AuthProvider,
          null,
          React.createElement(Router, null, React.createElement(AppRouter))
        )
      )
    )
  );
}

export default App;
