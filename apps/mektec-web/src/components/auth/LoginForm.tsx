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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { type LoginCredentials } from "../../types/auth";
import {
  PRIMARY_FORM_BG,
  ACCENT_FORM_PRIMARY,
  WHITE,
  GRAY_600,
} from "../../styles/colors";
import { CustomButton, FlippingLoader } from "../common";

const schema = yup.object({
  username: yup.string().required("Tên đăng nhập là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  rememberMe: yup.boolean().optional(),
});

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(schema) as any,
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    try {
      clearError();
      await login(data);
      onSuccess?.();
    } catch (error) {
      // Error is handled by the auth context
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

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("username")}
              fullWidth
              type="text"
              error={!!errors.username}
              helperText={errors.username?.message}
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
              {...register("password")}
              fullWidth
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
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
                  {...register("rememberMe")}
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
                disabled={!isValid}
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
