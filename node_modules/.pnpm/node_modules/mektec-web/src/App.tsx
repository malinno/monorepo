import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomThemeProvider } from "./contexts/ThemeContext";
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
        CustomThemeProvider,
        null,
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
