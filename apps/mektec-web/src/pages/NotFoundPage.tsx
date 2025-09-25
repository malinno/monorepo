import React from "react";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { Home, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: "6rem",
              fontWeight: "bold",
              color: "primary.main",
              mb: 2,
            }}
          >
            404
          </Typography>

          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 2 }}>
            Trang không tìm thấy
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={handleGoHome}
              size="large"
            >
              Về trang chủ
            </Button>

            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handleGoBack}
              size="large"
            >
              Quay lại
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
