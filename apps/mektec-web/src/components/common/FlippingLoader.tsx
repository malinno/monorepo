import { Box, Typography } from "@mui/material";
import { ACCENT_FORM_PRIMARY } from "../../styles/colors";

interface FlippingLoaderProps {
  size?: number;
  message?: string;
  fullScreen?: boolean;
  color?: string;
}

const FlippingLoader = ({
  size = 67.2,
  message = "Đang tải...",
  fullScreen = true, // Mặc định là full screen
  color = ACCENT_FORM_PRIMARY,
}: FlippingLoaderProps) => {
  const content = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <Box
        className="flipping-loaders-alt-10"
        sx={{
          width: `${size}px`,
          height: `${size}px`,
          color: color,
          background: `linear-gradient(${color} 0 0), linear-gradient(${color} 0 0), linear-gradient(${color} 0 0)`,
          backgroundSize: "50.1% 50.1%",
          backgroundRepeat: "no-repeat",
          animation:
            "flipping-i616avmd 1.5s infinite linear alternate, flipping-25dc7zmd 3.0s infinite linear",
          "&::before": {
            content: '""',
            display: "block",
            width: "50%",
            height: "50%",
            background: "currentColor",
            transform: "perspective(168px) rotateY(0deg) rotateX(0deg)",
            transformOrigin: "bottom right",
            animation: "flipping-6h64qpmd 1.5s infinite linear alternate",
          },
          "@keyframes flipping-i616avmd": {
            "0%, 32.99%": {
              backgroundPosition: "0 100%, 100% 100%, 100% 0",
            },
            "33%, 65.99%": {
              backgroundPosition: "100% 100%, 100% 100%, 100% 0",
            },
            "66%, 100%": {
              backgroundPosition: "100% 0, 100% 0, 100% 0",
            },
          },
          "@keyframes flipping-25dc7zmd": {
            "0%, 49.99%": {
              transform: "scaleX(1) rotate(0deg)",
            },
            "50%, 100%": {
              transform: "scaleX(-1) rotate(-90deg)",
            },
          },
          "@keyframes flipping-6h64qpmd": {
            "16.5%": {
              transform:
                "perspective(168px) rotateX(-90deg) rotateY(0deg) rotateX(0deg)",
              filter: "grayscale(0.6)",
            },
            "33%": {
              transform:
                "perspective(168px) rotateX(-180deg) rotateY(0deg) rotateX(0deg)",
            },
            "66%": {
              transform:
                "perspective(168px) rotateX(-180deg) rotateY(-180deg) rotateX(0deg)",
            },
            "100%": {
              transform:
                "perspective(168px) rotateX(-180deg) rotateY(-180deg) rotateX(-180deg)",
              filter: "grayscale(0.6)",
            },
          },
        }}
      />
      {message && (
        <Typography
          variant="body2"
          sx={{
            color: "white",
            fontSize: "0.9rem",
            opacity: 0.9,
            textAlign: "center",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="rgba(31, 42, 64, 0.9)"
        zIndex={9999}
        sx={{
          backdropFilter: "blur(4px)",
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
};

export default FlippingLoader;
