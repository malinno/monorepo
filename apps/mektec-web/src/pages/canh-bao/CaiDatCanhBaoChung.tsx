import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  Settings,
  Notifications,
  Email,
  Sms,
  VolumeUp,
  VolumeOff,
  Schedule,
  Security,
} from "@mui/icons-material";
import { CustomButton, Breadcrumbs } from "../../components/common";

const CaiDatCanhBaoChung: React.FC = () => {
  const [settings, setSettings] = useState({
    globalAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    soundAlerts: true,
    autoEscalation: true,
    alertTimeout: 30,
    maxRetries: 3,
    escalationLevel: "manager",
    quietHours: false,
    quietStart: "22:00",
    quietEnd: "06:00",
    alertFrequency: "immediate",
    notificationChannels: ["email", "dashboard"],
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const notificationChannels = [
    {
      id: "email",
      name: "Email",
      description: "Gửi cảnh báo qua email",
      icon: <Email />,
      enabled: settings.notificationChannels.includes("email"),
    },
    {
      id: "sms",
      name: "SMS",
      description: "Gửi cảnh báo qua tin nhắn",
      icon: <Sms />,
      enabled: settings.notificationChannels.includes("sms"),
    },
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Hiển thị trên dashboard",
      icon: <Notifications />,
      enabled: settings.notificationChannels.includes("dashboard"),
    },
    {
      id: "mobile",
      name: "Mobile App",
      description: "Thông báo trên ứng dụng di động",
      icon: <Notifications />,
      enabled: settings.notificationChannels.includes("mobile"),
    },
  ];

  const escalationLevels = [
    { value: "operator", label: "Người vận hành" },
    { value: "supervisor", label: "Giám sát viên" },
    { value: "manager", label: "Quản lý" },
    { value: "director", label: "Giám đốc" },
  ];

  const alertFrequencies = [
    { value: "immediate", label: "Ngay lập tức" },
    { value: "5min", label: "Mỗi 5 phút" },
    { value: "15min", label: "Mỗi 15 phút" },
    { value: "30min", label: "Mỗi 30 phút" },
    { value: "1hour", label: "Mỗi giờ" },
  ];

  const breadcrumbItems = [
    {
      label: "Cảnh báo",
      href: "/canh-bao",
    },
    {
      label: "Cài đặt cảnh báo chung",
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
        Cài đặt cảnh báo chung
      </Typography>

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Settings />
              Cài đặt chung
            </Typography>

            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.globalAlerts}
                    onChange={(e) =>
                      handleSettingChange("globalAlerts", e.target.checked)
                    }
                  />
                }
                label="Bật cảnh báo toàn hệ thống"
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.autoEscalation}
                    onChange={(e) =>
                      handleSettingChange("autoEscalation", e.target.checked)
                    }
                  />
                }
                label="Tự động chuyển tiếp cảnh báo"
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.quietHours}
                    onChange={(e) =>
                      handleSettingChange("quietHours", e.target.checked)
                    }
                  />
                }
                label="Chế độ im lặng"
              />
            </Box>

            {settings.quietHours && (
              <Box sx={{ mt: 2, ml: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Bắt đầu"
                      type="time"
                      value={settings.quietStart}
                      onChange={(e) =>
                        handleSettingChange("quietStart", e.target.value)
                      }
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Kết thúc"
                      type="time"
                      value={settings.quietEnd}
                      onChange={(e) =>
                        handleSettingChange("quietEnd", e.target.value)
                      }
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>
                Thời gian chờ cảnh báo: {settings.alertTimeout} giây
              </Typography>
              <Slider
                value={settings.alertTimeout}
                onChange={(e, value) =>
                  handleSettingChange("alertTimeout", value)
                }
                min={5}
                max={300}
                step={5}
                marks={[
                  { value: 5, label: "5s" },
                  { value: 60, label: "1m" },
                  { value: 300, label: "5m" },
                ]}
                valueLabelDisplay="auto"
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>
                Số lần thử lại tối đa: {settings.maxRetries}
              </Typography>
              <Slider
                value={settings.maxRetries}
                onChange={(e, value) =>
                  handleSettingChange("maxRetries", value)
                }
                min={1}
                max={10}
                step={1}
                marks={[
                  { value: 1, label: "1" },
                  { value: 5, label: "5" },
                  { value: 10, label: "10" },
                ]}
                valueLabelDisplay="auto"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Notifications />
              Cài đặt thông báo
            </Typography>

            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      handleSettingChange(
                        "emailNotifications",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Thông báo email"
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.smsNotifications}
                    onChange={(e) =>
                      handleSettingChange("smsNotifications", e.target.checked)
                    }
                  />
                }
                label="Thông báo SMS"
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.soundAlerts}
                    onChange={(e) =>
                      handleSettingChange("soundAlerts", e.target.checked)
                    }
                  />
                }
                label="Âm thanh cảnh báo"
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Tần suất cảnh báo</InputLabel>
                <Select
                  value={settings.alertFrequency}
                  onChange={(e) =>
                    handleSettingChange("alertFrequency", e.target.value)
                  }
                  label="Tần suất cảnh báo"
                >
                  {alertFrequencies.map((freq) => (
                    <MenuItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Cấp độ chuyển tiếp</InputLabel>
                <Select
                  value={settings.escalationLevel}
                  onChange={(e) =>
                    handleSettingChange("escalationLevel", e.target.value)
                  }
                  label="Cấp độ chuyển tiếp"
                >
                  {escalationLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </Grid>

        {/* Notification Channels */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Email />
              Kênh thông báo
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {notificationChannels.map((channel) => (
                <Grid item xs={12} sm={6} md={3} key={channel.id}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      border: channel.enabled ? "2px solid" : "1px solid",
                      borderColor: channel.enabled
                        ? "primary.main"
                        : "grey.300",
                      backgroundColor: channel.enabled
                        ? "primary.50"
                        : "transparent",
                    }}
                    onClick={() => {
                      const newChannels = channel.enabled
                        ? settings.notificationChannels.filter(
                            (c) => c !== channel.id
                          )
                        : [...settings.notificationChannels, channel.id];
                      handleSettingChange("notificationChannels", newChannels);
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <Box sx={{ mb: 2 }}>{channel.icon}</Box>
                      <Typography variant="h6" gutterBottom>
                        {channel.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {channel.description}
                      </Typography>
                      {channel.enabled && (
                        <Chip
                          label="Đã kích hoạt"
                          color="primary"
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Alert Templates */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Security />
              Mẫu cảnh báo
            </Typography>

            <List>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText
                  primary="Mẫu email cảnh báo"
                  secondary="Cấu hình nội dung và định dạng email cảnh báo"
                />
                <CustomButton size="small" variant="outline">
                  Chỉnh sửa
                </CustomButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Sms />
                </ListItemIcon>
                <ListItemText
                  primary="Mẫu SMS cảnh báo"
                  secondary="Cấu hình nội dung tin nhắn SMS cảnh báo"
                />
                <CustomButton size="small" variant="outline">
                  Chỉnh sửa
                </CustomButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Schedule />
                </ListItemIcon>
                <ListItemText
                  primary="Lịch cảnh báo"
                  secondary="Thiết lập lịch gửi cảnh báo định kỳ"
                />
                <CustomButton size="small" variant="outline">
                  Chỉnh sửa
                </CustomButton>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <CustomButton variant="outline">Hủy</CustomButton>
        <CustomButton variant="primary">Lưu cài đặt</CustomButton>
      </Box>
    </Box>
  );
};

export default CaiDatCanhBaoChung;
