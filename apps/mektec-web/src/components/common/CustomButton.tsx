import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material/Button";
import {
  ACCENT_FORM_PRIMARY,
  ACCENT_FORM_PRIMARY_HOVER,
  WHITE,
  ACCENT_SECONDARY,
  ACCENT_WARNING,
  ACCENT_ERROR,
  ACCENT_INFO,
} from "../../styles/colors";

// Button variants
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "ghost";

// Button sizes
export type ButtonSize = "small" | "medium" | "large";

// Custom button props
export interface CustomButtonProps
  extends Omit<ButtonProps, "variant" | "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const CustomButton = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  loadingText = "Đang xử lý...",
  children,
  disabled,
  sx,
  ...props
}: CustomButtonProps) => {
  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: ACCENT_FORM_PRIMARY,
          color: WHITE,
          "&:hover": {
            backgroundColor: ACCENT_FORM_PRIMARY_HOVER,
          },
          "&:disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            color: "rgba(255, 255, 255, 0.5)",
          },
        };
      case "secondary":
        return {
          backgroundColor: ACCENT_SECONDARY,
          color: WHITE,
          "&:hover": {
            backgroundColor: "rgba(76, 175, 80, 0.8)",
          },
          "&:disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            color: "rgba(255, 255, 255, 0.5)",
          },
        };
      case "success":
        return {
          backgroundColor: ACCENT_SECONDARY,
          color: WHITE,
          "&:hover": {
            backgroundColor: "rgba(76, 175, 80, 0.8)",
          },
          "&:disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            color: "rgba(255, 255, 255, 0.5)",
          },
        };
      case "warning":
        return {
          backgroundColor: ACCENT_WARNING,
          color: WHITE,
          "&:hover": {
            backgroundColor: "rgba(255, 152, 0, 0.8)",
          },
          "&:disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            color: "rgba(255, 255, 255, 0.5)",
          },
        };
      case "error":
        return {
          backgroundColor: ACCENT_ERROR,
          color: WHITE,
          "&:hover": {
            backgroundColor: "rgba(244, 67, 54, 0.8)",
          },
          "&:disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            color: "rgba(255, 255, 255, 0.5)",
          },
        };
      case "info":
        return {
          backgroundColor: ACCENT_INFO,
          color: WHITE,
          "&:hover": {
            backgroundColor: "rgba(0, 188, 212, 0.8)",
          },
          "&:disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            color: "rgba(255, 255, 255, 0.5)",
          },
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: ACCENT_FORM_PRIMARY,
          border: `2px solid ${ACCENT_FORM_PRIMARY}`,
          "&:hover": {
            backgroundColor: ACCENT_FORM_PRIMARY,
            color: WHITE,
          },
          "&:disabled": {
            backgroundColor: "transparent",
            color: "rgba(0, 0, 0, 0.3)",
            borderColor: "rgba(0, 0, 0, 0.3)",
          },
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: ACCENT_FORM_PRIMARY,
          "&:hover": {
            backgroundColor: "rgba(59, 73, 155, 0.1)",
          },
          "&:disabled": {
            backgroundColor: "transparent",
            color: "rgba(0, 0, 0, 0.3)",
          },
        };
      default:
        return {};
    }
  };

  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          fontSize: "0.75rem",
          py: 0.5,
          px: 2,
          minHeight: 32,
        };
      case "medium":
        return {
          fontSize: "0.875rem",
          py: 1,
          px: 3,
          minHeight: 40,
        };
      case "large":
        return {
          fontSize: "0.9rem",
          py: 1.5,
          px: 4,
          minHeight: 48,
        };
      default:
        return {};
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <Button
      {...props}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      sx={{
        fontWeight: "bold",
        borderRadius: 2,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        ...variantStyles,
        ...sizeStyles,
        ...sx,
      }}
    >
      {loading ? loadingText : children}
    </Button>
  );
};

export default CustomButton;
