import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import {
  LoginPage,
  Dashboard,
  AnimationPage,
  SettingsPage,
  NotFoundPage,
} from "../pages";
import { DieuKienCanhBao, CaiDatCanhBaoChung } from "../pages/canh-bao";
import LayoutPage from "../pages/LayoutPage";
import { PublicRoute, ProtectedRoute } from "./";
import { AppLayout } from "../components/layout";
import { FlippingLoader } from "../components/common";

// Loading component
const LoadingScreen = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    sx={{
      backgroundColor: "rgba(31, 42, 64, 1)",
    }}
  >
    <FlippingLoader size={80} message="Đang tải ứng dụng..." color="#3b499b" />
  </Box>
);

// Admin Route - chỉ cho phép admin
const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>
);

// Unauthorized page
const UnauthorizedPage = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
    textAlign="center"
  >
    <h1>403 - Không có quyền truy cập</h1>
    <p>Bạn không có quyền truy cập trang này.</p>
  </Box>
);

const AppRouter = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return React.createElement(
    Routes as any,
    null,
    // Public Routes
    React.createElement(Route as any, {
      path: "/login",
      element: React.createElement(
        PublicRoute,
        null,
        React.createElement(LoginPage)
      ),
    }),
    // Protected Routes with Layout
    React.createElement(Route as any, {
      path: "/",
      element: React.createElement(
        ProtectedRoute,
        null,
        React.createElement(AppLayout)
      ),
      children: [
        React.createElement(Route as any, {
          path: "dashboard",
          element: React.createElement(Dashboard),
        }),
        React.createElement(Route as any, {
          path: "animation",
          element: React.createElement(AnimationPage),
        }),
        React.createElement(Route as any, {
          path: "settings",
          element: React.createElement(SettingsPage),
        }),
        React.createElement(Route as any, {
          path: "layout",
          element: React.createElement(LayoutPage),
        }),
        // Cảnh báo routes
        React.createElement(Route as any, {
          path: "canh-bao/dieu-kien",
          element: React.createElement(DieuKienCanhBao),
        }),
        React.createElement(Route as any, {
          path: "canh-bao/cai-dat",
          element: React.createElement(CaiDatCanhBaoChung),
        }),
        React.createElement(Route as any, {
          path: "",
          element: React.createElement(Navigate, {
            to: "dashboard",
            replace: true,
          }),
        }),
      ],
    }),
    // Admin Routes
    React.createElement(Route as any, {
      path: "/admin",
      element: React.createElement(
        AdminRoute,
        null,
        React.createElement(
          AppLayout,
          null,
          React.createElement("div", null, "Admin Panel (Coming Soon)")
        )
      ),
    }),
    // Error Pages
    React.createElement(Route as any, {
      path: "/unauthorized",
      element: React.createElement(UnauthorizedPage),
    }),
    React.createElement(Route as any, {
      path: "/404",
      element: React.createElement(NotFoundPage),
    }),
    // Default Redirects
    React.createElement(Route as any, {
      path: "*",
      element: React.createElement(NotFoundPage),
    })
  );
};

export default AppRouter;
