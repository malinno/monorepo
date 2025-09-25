import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from "@mui/material";
import {
  ViewModule,
  Dashboard,
  Widgets,
  GridView,
  ViewList,
  ViewComfy,
} from "@mui/icons-material";
import { CustomButton, Breadcrumbs } from "../components/common";

const LayoutPage: React.FC = () => {
  const layoutTemplates = [
    {
      id: 1,
      name: "Dashboard Layout",
      description: "Bố cục mặc định cho dashboard chính",
      icon: <Dashboard />,
      status: "active",
      widgets: 8,
    },
    {
      id: 2,
      name: "Production Layout",
      description: "Bố cục tối ưu cho theo dõi sản xuất",
      icon: <ViewModule />,
      status: "draft",
      widgets: 12,
    },
    {
      id: 3,
      name: "Analytics Layout",
      description: "Bố cục tập trung vào phân tích dữ liệu",
      icon: <GridView />,
      status: "active",
      widgets: 6,
    },
    {
      id: 4,
      name: "Monitoring Layout",
      description: "Bố cục giám sát thời gian thực",
      icon: <ViewComfy />,
      status: "draft",
      widgets: 10,
    },
  ];

  const availableWidgets = [
    { name: "Production Chart", type: "chart", category: "Analytics" },
    { name: "Machine Status", type: "status", category: "Monitoring" },
    { name: "Alert Panel", type: "alert", category: "Alerts" },
    { name: "Performance Metrics", type: "metric", category: "Analytics" },
    { name: "Temperature Gauge", type: "gauge", category: "Monitoring" },
    { name: "Recent Activities", type: "list", category: "Activity" },
  ];

  const breadcrumbItems = [
    {
      label: "Layout",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs items={breadcrumbItems} />

      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 3, color: "text.primary" }}
      >
        Quản lý Layout
      </Typography>

      <Grid container spacing={3}>
        {/* Layout Templates */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <ViewModule />
              Layout Templates
            </Typography>
            <Grid container spacing={2}>
              {layoutTemplates.map((template) => (
                <Grid item xs={12} sm={6} md={4} key={template.id}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        {template.icon}
                        <Typography variant="h6" sx={{ ml: 1 }}>
                          {template.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mb: 2 }}
                      >
                        {template.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Chip
                          label={template.status}
                          color={
                            template.status === "active" ? "success" : "default"
                          }
                          size="small"
                        />
                        <Typography variant="caption" color="textSecondary">
                          {template.widgets} widgets
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <CustomButton size="small" variant="outline">
                        Chỉnh sửa
                      </CustomButton>
                      <CustomButton size="small" variant="primary">
                        Sử dụng
                      </CustomButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Layout Builder */}
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Widgets />
              Layout Builder
            </Typography>
            <Box
              sx={{
                border: "2px dashed #ccc",
                borderRadius: 2,
                p: 4,
                textAlign: "center",
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ViewList sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Kéo thả widgets vào đây để tạo layout
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Sử dụng các widgets bên dưới để xây dựng layout tùy chỉnh
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Available Widgets */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "fit-content" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Widgets />
              Widgets có sẵn
            </Typography>
            <List>
              {availableWidgets.map((widget, index) => (
                <ListItem
                  key={index}
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    mb: 1,
                    cursor: "grab",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon>
                    <ViewModule />
                  </ListItemIcon>
                  <ListItemText
                    primary={widget.name}
                    secondary={`${widget.type} • ${widget.category}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LayoutPage;
