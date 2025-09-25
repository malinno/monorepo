import React from "react";
import { Box, Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { PRIMARY_FORM_BG } from "../styles/colors";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PRIMARY_FORM_BG,
        py: 3,
      }}
    >
      <Container maxWidth="sm">
        <LoginForm onSuccess={handleSuccess} />
      </Container>
    </Box>
  );
};

export default LoginPage;
