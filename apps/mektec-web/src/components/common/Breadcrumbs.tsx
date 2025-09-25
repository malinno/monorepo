import React from "react";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Box,
} from "@mui/material";
import { NavigateNext, Home } from "@mui/icons-material";
import { useNavigation } from "../../hooks/useNavigation";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

const Breadcrumbs = ({ items, showHome = true }: BreadcrumbsProps) => {
  const { goTo } = useNavigation();

  const handleClick = (href: string) => {
    goTo(href);
  };

  const breadcrumbItems = showHome
    ? [
        {
          label: "Trang chủ",
          href: "/dashboard",
          icon: <Home fontSize="small" />,
        },
        ...items,
      ]
    : items;

  return (
    <Box sx={{ mb: 2 }}>
      <MuiBreadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: "text.secondary",
          },
        }}
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          if (isLast) {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {item.icon as any}
                <Typography
                  color="text.primary"
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            );
          }

          return (
            <Link
              key={index}
              component="button"
              variant="body2"
              onClick={() => item.href && handleClick(item.href)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": {
                  textDecoration: "underline",
                  color: "primary.main",
                },
                cursor: "pointer",
                border: "none",
                background: "none",
                padding: 0,
                font: "inherit",
              }}
            >
              {item.icon as any}
              {item.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
