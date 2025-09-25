import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import { Refresh, Home } from "@mui/icons-material";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = "/dashboard";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4" color="error" gutterBottom>
              Đã xảy ra lỗi
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Xin lỗi, đã có lỗi không mong muốn xảy ra. Vui lòng thử lại sau.
            </Typography>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "grey.100",
                  borderRadius: 1,
                  textAlign: "left",
                }}
              >
                <Typography variant="body2" color="error">
                  <strong>Error:</strong> {this.state.error.message}
                </Typography>
                {this.state.errorInfo && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    <strong>Stack:</strong>{" "}
                    {this.state.errorInfo.componentStack}
                  </Typography>
                )}
              </Box>
            )}

            <Box
              sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}
            >
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={this.handleRetry}
              >
                Thử lại
              </Button>

              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={this.handleGoHome}
              >
                Về trang chủ
              </Button>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
