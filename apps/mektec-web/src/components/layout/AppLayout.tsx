import React, { useState } from "react";
import { Outlet } from "react-router-dom";
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
  Settings,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "../../hooks/useNavigation";
import {
  ACCENT_FORM_PRIMARY,
  WHITE,
  PRIMARY_FORM_BG,
} from "../../styles/colors";
import { menuItems, isActiveMenu } from "../../config/menu";

const drawerWidth = 280;
const collapsedDrawerWidth = 0; // Thu hẳn vào

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { logout } = useAuth();
  const { goTo } = useNavigation();
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
        backgroundColor: PRIMARY_FORM_BG,
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
          backgroundColor: "rgba(255, 255, 255, 0.95)",
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
            sx={{ mr: 2, display: { md: "none" }, color: "text.primary" }}
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
              color: "text.primary",
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
              color: "text.primary",
              fontWeight: 600,
            }}
          >
            Phần mềm giám sát sản xuất SEEACT - SCADA
          </Typography>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{ color: "text.primary" }}
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
            minWidth: 200,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
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
          backgroundColor: "#f5f5f5",
          transition: "width 0.3s ease",
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3, minHeight: "calc(100vh - 64px)" }}>
          {children || (React.createElement(Outlet) as any)}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
