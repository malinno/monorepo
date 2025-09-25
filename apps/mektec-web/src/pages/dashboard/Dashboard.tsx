import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  Assessment,
  CheckCircle,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Tổng số máy",
      value: "156",
      change: "+12%",
      trend: "up",
      color: "#4caf50",
    },
    {
      title: "Máy hoạt động",
      value: "142",
      change: "+8%",
      trend: "up",
      color: "#2196f3",
    },
    {
      title: "Máy bảo trì",
      value: "8",
      change: "-2%",
      trend: "down",
      color: "#ff9800",
    },
    {
      title: "Máy lỗi",
      value: "6",
      change: "+1%",
      trend: "up",
      color: "#f44336",
    },
  ];

  const alerts = [
    {
      id: 1,
      message: "Máy A01 cần bảo trì định kỳ",
      severity: "warning",
      time: "2 giờ trước",
    },
    {
      id: 2,
      message: "Nhiệt độ cao tại khu vực B",
      severity: "error",
      time: "4 giờ trước",
    },
    {
      id: 3,
      message: "Hoàn thành bảo trì máy C03",
      severity: "success",
      time: "6 giờ trước",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 3, color: "text.primary" }}
      >
        Dashboard
      </Typography>

      {/* Welcome Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Chào mừng, {user?.username || "User"}!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Đây là trang tổng quan của hệ thống MEKTEC. Bạn có thể theo dõi trạng
          thái sản xuất và các cảnh báo quan trọng tại đây.
        </Typography>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Chip
                      label={stat.change}
                      color={stat.trend === "up" ? "success" : "error"}
                      size="small"
                      icon={
                        stat.trend === "up" ? <TrendingUp /> : <TrendingDown />
                      }
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Production Status */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Trạng thái sản xuất
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Line A</Typography>
                <Typography variant="body2">85%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={85} sx={{ mb: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Line B</Typography>
                <Typography variant="body2">72%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={72} sx={{ mb: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Line C</Typography>
                <Typography variant="body2">91%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={91} />
            </Box>
          </Paper>
        </Grid>

        {/* Recent Alerts */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Cảnh báo gần đây
            </Typography>
            <Box sx={{ mt: 2 }}>
              {alerts.map((alert) => (
                <Box
                  key={alert.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {alert.message}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      label={alert.severity}
                      color={alert.severity as any}
                      size="small"
                    />
                    <Typography variant="caption" color="textSecondary">
                      {alert.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* System Status */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Trạng thái hệ thống
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText
              primary="Hệ thống hoạt động bình thường"
              secondary="Tất cả các dịch vụ đang chạy ổn định"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Assessment color="info" />
            </ListItemIcon>
            <ListItemText
              primary="Dữ liệu được cập nhật"
              secondary="Lần cập nhật cuối: 2 phút trước"
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Dashboard;
