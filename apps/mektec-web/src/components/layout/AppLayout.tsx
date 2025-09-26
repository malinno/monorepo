import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout,
  AccountCircle,
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  ExpandLess,
  LightMode,
  DarkMode,
  AutoMode,
  AdminPanelSettings,
  Person,
} from "@mui/icons-material";

import { useTheme as useCustomTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "../../hooks/useNavigation";
import { Outlet } from "react-router-dom";
import {
  ACCENT_FORM_PRIMARY,
  WHITE,
  PRIMARY_FORM_BG,
} from "../../styles/colors";
import { menuItems, isActiveMenu } from "../../config/menu";
import { useAuth, useAuthActions } from "../../stores/authStore";

const drawerWidth = 280;
const collapsedDrawerWidth = 0; // Thu hẳn vào

interface AppLayoutProps {
  children?: React.ReactNode;
}

// Wrapper component for Outlet
const OutletWrapper = () => {
  return React.createElement(Outlet);
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuth();
  const { logout } = useAuthActions();
  const { goTo } = useNavigation();
  const { mode, toggleTheme, actualMode } = useCustomTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopDrawerToggle = () => {
    setDesktopOpen(!desktopOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleProfileMenuClose();
    await logout();
  };

  const handleSubmenuToggle = (menuId: string) => {
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  };

  const getThemeIcon = () => {
    switch (mode) {
      case "light":
        return <LightMode />;
      case "dark":
        return <DarkMode />;
      case "auto":
        return <AutoMode />;
      default:
        return <AutoMode />;
    }
  };

  const getRoleIcon = () => {
    if (user?.role === "admin") {
      return <AdminPanelSettings />;
    }
    return <Person />;
  };

  const getRoleText = () => {
    if (user?.role === "admin") {
      return "Administrator";
    }
    return "User";
  };

  const getRoleColor = () => {
    if (user?.role === "admin") {
      return "error.main";
    }
    return "primary.main";
  };

  // Get current path for active menu highlighting
  const currentPath = location.pathname;

  const drawer = (
    <Box
      sx={{
        width: isMobile
          ? drawerWidth
          : desktopOpen
          ? drawerWidth
          : collapsedDrawerWidth,
        height: "100vh",
        backgroundColor: PRIMARY_FORM_BG, // Giữ nguyên màu cũ, không thay đổi theo theme
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
        overflow: "hidden",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      {/* Logo/Header */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: desktopOpen ? "center" : "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          minHeight: 64,
        }}
      >
        {desktopOpen ? (
          <Typography
            variant="h5"
            sx={{
              color: WHITE,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            MEKTEC
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{
              color: WHITE,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            M
          </Typography>
        )}
      </Box>

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <Box key={item.id}>
            <ListItem disablePadding sx={{ px: 2, mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  if (item.children && item.children.length > 0) {
                    handleSubmenuToggle(item.id);
                  } else {
                    goTo(item.path);
                  }
                }}
                sx={{
                  borderRadius: 2,
                  justifyContent: desktopOpen ? "flex-start" : "center",
                  px: desktopOpen ? 2 : 1,
                  backgroundColor: isActiveMenu(item, currentPath)
                    ? ACCENT_FORM_PRIMARY
                    : "transparent",
                  "&:hover": {
                    backgroundColor: isActiveMenu(item, currentPath)
                      ? ACCENT_FORM_PRIMARY
                      : "rgba(255, 255, 255, 0.1)",
                  },
                }}
                title={!desktopOpen ? item.text : ""}
              >
                <ListItemIcon
                  sx={{
                    color: WHITE,
                    minWidth: desktopOpen ? 40 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon as any}
                </ListItemIcon>
                {desktopOpen && (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: WHITE,
                        fontSize: "0.9rem",
                        fontWeight: 500,
                      },
                    }}
                  />
                )}
                {desktopOpen && item.badge && (
                  <Box
                    sx={{
                      backgroundColor: ACCENT_FORM_PRIMARY,
                      color: WHITE,
                      borderRadius: "50%",
                      minWidth: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      ml: 1,
                    }}
                  >
                    {item.badge}
                  </Box>
                )}
                {desktopOpen && item.children && item.children.length > 0 && (
                  <Box sx={{ ml: 1 }}>
                    {expandedMenus.has(item.id) ? (
                      <ExpandLess sx={{ color: WHITE }} />
                    ) : (
                      <ExpandMore sx={{ color: WHITE }} />
                    )}
                  </Box>
                )}
              </ListItemButton>
            </ListItem>

            {/* Submenu */}
            {desktopOpen &&
              item.children &&
              item.children.length > 0 &&
              expandedMenus.has(item.id) && (
                <List sx={{ pl: 2 }}>
                  {item.children.map((subItem) => (
                    <ListItem
                      key={subItem.id}
                      disablePadding
                      sx={{ px: 2, mb: 0.5 }}
                    >
                      <ListItemButton
                        onClick={() => goTo(subItem.path)}
                        sx={{
                          borderRadius: 1,
                          pl: 3,
                          backgroundColor: isActiveMenu(subItem, currentPath)
                            ? ACCENT_FORM_PRIMARY
                            : "transparent",
                          "&:hover": {
                            backgroundColor: isActiveMenu(subItem, currentPath)
                              ? ACCENT_FORM_PRIMARY
                              : "rgba(255, 255, 255, 0.1)",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: WHITE,
                            minWidth: 30,
                            justifyContent: "center",
                          }}
                        >
                          {subItem.icon as any}
                        </ListItemIcon>
                        <ListItemText
                          primary={subItem.text}
                          sx={{
                            "& .MuiListItemText-primary": {
                              color: WHITE,
                              fontSize: "0.8rem",
                              fontWeight: 400,
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: {
            md: desktopOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
          },
          ml: {
            md: desktopOpen ? `${drawerWidth}px` : 0,
          },
          backgroundColor: "background.paper", // Sử dụng theme color
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          transition: "width 0.3s ease, margin 0.3s ease",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: "none" },
              color: actualMode === "dark" ? "#ffffff" : "#000000",
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Toggle Button */}
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDesktopDrawerToggle}
            sx={{
              mr: 2,
              display: { xs: "none", md: "block" },
              color: actualMode === "dark" ? "#ffffff" : "#000000",
            }}
          >
            {desktopOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              color: actualMode === "dark" ? "#ffffff" : "#000000", // Màu chữ theo theme
              fontWeight: 600,
            }}
          >
            Phần mềm giám sát sản xuất SEEACT - SCADA
          </Typography>

          {/* Profile Menu */}
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{
              color: actualMode === "dark" ? "#ffffff" : "#000000",
              "&:hover": {
                backgroundColor:
                  actualMode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 280,
            backgroundColor: actualMode === "dark" ? "#2e364d" : "#ffffff",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        {/* User Info Header */}
        <Box
          sx={{
            p: 2,
            borderBottom:
              actualMode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            {getRoleIcon()}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: actualMode === "dark" ? "#ffffff" : "#000000",
              }}
            >
              {user?.name || "User"}
            </Typography>
            <Box
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 1,
                backgroundColor:
                  getRoleColor() === "error.main" ? "#ffebee" : "#e3f2fd",
                border: `1px solid ${getRoleColor()}`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: getRoleColor(),
                  fontWeight: 600,
                  fontSize: "0.7rem",
                }}
              >
                {getRoleText()}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: actualMode === "dark" ? "#cccccc" : "#666666" }}
          >
            {user?.email || "user@mektec.com"}
          </Typography>
        </Box>

        {/* Theme Toggle */}
        <MenuItem
          onClick={toggleTheme}
          sx={{ color: actualMode === "dark" ? "#ffffff" : "#000000" }}
        >
          <ListItemIcon
            sx={{ color: actualMode === "dark" ? "#ffffff" : "#000000" }}
          >
            {getThemeIcon()}
          </ListItemIcon>
          <ListItemText
            primary="Theme"
            secondary={`${mode} (${actualMode})`}
            primaryTypographyProps={{
              color: actualMode === "dark" ? "#ffffff" : "#000000",
            }}
            secondaryTypographyProps={{
              color: actualMode === "dark" ? "#cccccc" : "#666666",
            }}
          />
        </MenuItem>

        <Divider />

        {/* Logout */}
        <MenuItem
          onClick={handleLogout}
          sx={{ color: actualMode === "dark" ? "#ffffff" : "#000000" }}
        >
          <ListItemIcon
            sx={{ color: actualMode === "dark" ? "#ffffff" : "#000000" }}
          >
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              color: actualMode === "dark" ? "#ffffff" : "#000000",
            }}
          />
        </MenuItem>
      </Menu>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{
          width: { md: desktopOpen ? drawerWidth : 0 },
          flexShrink: { md: 0 },
          transition: "width 0.3s ease",
          overflow: "hidden",
          height: "100vh",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "100vh",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: desktopOpen ? "block" : "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            },
          }}
          open={desktopOpen}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            md: desktopOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
          },
          height: "100vh",
          overflow: "auto",
          backgroundColor: "background.default", // Sử dụng theme color
          transition: "width 0.3s ease",
        }}
      >
        <Toolbar />
        <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
          {children ? children : <OutletWrapper />}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
