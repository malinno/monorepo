import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import { useAuthContext } from "../../contexts/AuthContext";
import { type LoginRequest } from "../../api/auth";
import {
  PRIMARY_FORM_BG,
  ACCENT_FORM_PRIMARY,
  WHITE,
  GRAY_600,
} from "../../styles/colors";
import { CustomButton, FlippingLoader } from "../common";

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { isLoading, error, login, clearError } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginRequest>({
    accountName: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<LoginRequest>>({});

  const handleInputChange =
    (field: keyof LoginRequest) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (formErrors[field]) {
        setFormErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (error) {
        clearError();
      }
    };

  const validateForm = (): boolean => {
    const errors: Partial<LoginRequest> = {};

    if (!formData.accountName.trim()) {
      errors.accountName = "Tên đăng nhập là bắt buộc";
    }

    if (!formData.password.trim()) {
      errors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 5) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      clearError();
      console.log("Starting login...");
      await login(formData);
      console.log("Login successful, calling onSuccess");
      onSuccess?.();
    } catch (error) {
      console.error("Login error:", error);
      // Error is handled by the auth store
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 550,
          width: "100%",
          mx: "auto",
          backgroundColor: PRIMARY_FORM_BG,
          borderRadius: 2,
          boxShadow: "none",
          border: "1px solid #D3D3D3",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={3}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              ĐĂNG NHẬP
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                fontSize: "0.9rem",
                opacity: 0.9,
              }}
            >
              Phần mềm giám sát sản xuất SEEACT - SCADA
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="text"
              value={formData.accountName}
              onChange={handleInputChange("accountName")}
              error={!!formErrors.accountName}
              helperText={formErrors.accountName}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      backgroundColor: ACCENT_FORM_PRIMARY,
                      borderRadius: 1,
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1,
                    }}
                  >
                    <Person sx={{ color: WHITE }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: 2,
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(0, 0, 0, 0.6)",
                  fontSize: "0.9rem",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "rgba(0, 0, 0, 0.6)",
                },
                "& .MuiInputBase-input": {
                  color: "rgba(0, 0, 0, 0.8)",
                  fontSize: "0.9rem",
                },
              }}
            />

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange("password")}
              error={!!formErrors.password}
              helperText={formErrors.password}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      backgroundColor: ACCENT_FORM_PRIMARY,
                      borderRadius: 1,
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1,
                    }}
                  >
                    <Lock sx={{ color: WHITE }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      disabled={isLoading}
                      sx={{ color: GRAY_600 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: 2,
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(0, 0, 0, 0.6)",
                  fontSize: "0.9rem",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "rgba(0, 0, 0, 0.6)",
                },
                "& .MuiInputBase-input": {
                  color: "rgba(0, 0, 0, 0.8)",
                  fontSize: "0.9rem",
                },
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  disabled={isLoading}
                  sx={{
                    color: WHITE,
                    "&.Mui-checked": {
                      color: ACCENT_FORM_PRIMARY,
                    },
                  }}
                />
              }
              label="Ghi nhớ mật khẩu"
              sx={{
                mb: 2,
                "& .MuiFormControlLabel-label": {
                  color: WHITE,
                  fontSize: "0.9rem",
                },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <CustomButton
                type="submit"
                variant="primary"
                size="large"
                disabled={isLoading}
                loading={isLoading}
                loadingText="Đang đăng nhập..."
              >
                ĐĂNG NHẬP
              </CustomButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Full screen loading khi đang đăng nhập */}
      {isLoading && (
        <FlippingLoader size={80} message="Đang đăng nhập..." color="#3b499b" />
      )}
    </>
  );
};

export default LoginForm;
