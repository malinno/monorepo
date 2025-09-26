import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Paper,
  Container,
} from "@mui/material";
import { Lock, Home } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallback,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(
    "ProtectedRoute - isAuthenticated:",
    isAuthenticated,
    "isLoading:",
    isLoading,
    "user:",
    user
  );

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress size={60} />
        <Typography variant="body2" color="text.secondary">
          Đang kiểm tra quyền truy cập...
        </Typography>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && user?.role !== requiredRole) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Lock sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
          <Typography variant="h4" color="error" gutterBottom>
            Không có quyền truy cập
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Bạn cần quyền <strong>{requiredRole}</strong> để truy cập trang này.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={() => navigate("/dashboard")}
            >
              Về trang chủ
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Quay lại
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
