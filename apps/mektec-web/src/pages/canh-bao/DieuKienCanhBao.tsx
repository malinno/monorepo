import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Warning,
  CheckCircle,
  Error,
  Info,
} from "@mui/icons-material";
import { CustomButton, Breadcrumbs } from "../../components/common";

const DieuKienCanhBao: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRule, setEditingRule] = useState<any>(null);

  const alertRules = [
    {
      id: 1,
      name: "Nhiệt độ cao",
      description: "Cảnh báo khi nhiệt độ vượt quá 45°C",
      condition: "temperature > 45",
      severity: "error",
      enabled: true,
      machine: "Máy A01",
      lastTriggered: "2 giờ trước",
    },
    {
      id: 2,
      name: "Áp suất thấp",
      description: "Cảnh báo khi áp suất dưới 2 bar",
      condition: "pressure < 2",
      severity: "warning",
      enabled: true,
      machine: "Máy B02",
      lastTriggered: "1 ngày trước",
    },
    {
      id: 3,
      name: "Tốc độ quay bất thường",
      description: "Cảnh báo khi tốc độ quay ngoài phạm vi 1000-3000 RPM",
      condition: "rpm < 1000 OR rpm > 3000",
      severity: "warning",
      enabled: false,
      machine: "Máy C03",
      lastTriggered: "Chưa kích hoạt",
    },
    {
      id: 4,
      name: "Dừng máy đột ngột",
      description: "Cảnh báo khi máy dừng không theo lịch trình",
      condition: "status = 'stopped' AND scheduled = false",
      severity: "error",
      enabled: true,
      machine: "Tất cả máy",
      lastTriggered: "3 giờ trước",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "default";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <Error color="error" />;
      case "warning":
        return <Warning color="warning" />;
      case "info":
        return <Info color="info" />;
      default:
        return <Warning />;
    }
  };

  const handleAddRule = () => {
    setEditingRule(null);
    setOpenDialog(true);
  };

  const handleEditRule = (rule: any) => {
    setEditingRule(rule);
    setOpenDialog(true);
  };

  const handleDeleteRule = (id: number) => {
    console.log("Delete rule:", id);
  };

  const handleToggleRule = (id: number) => {
    console.log("Toggle rule:", id);
  };

  const breadcrumbItems = [
    {
      label: "Cảnh báo",
      href: "/canh-bao",
    },
    {
      label: "Điều kiện cảnh báo",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs items={breadcrumbItems} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" color="text.primary">
          Điều kiện cảnh báo
        </Typography>
        <CustomButton
          variant="primary"
          startIcon={<Add />}
          onClick={handleAddRule}
        >
          Thêm điều kiện
        </CustomButton>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Error color="error" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="error.main">
                    12
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Cảnh báo lỗi
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Warning color="warning" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="warning.main">
                    8
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Cảnh báo chú ý
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircle color="success" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="success.main">
                    4
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Điều kiện hoạt động
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Info color="info" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="info.main">
                    24
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tổng điều kiện
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Rules Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên điều kiện</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Điều kiện</TableCell>
                <TableCell>Mức độ</TableCell>
                <TableCell>Máy</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Lần kích hoạt cuối</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alertRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {getSeverityIcon(rule.severity)}
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {rule.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{rule.description}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        backgroundColor: "grey.100",
                        p: 1,
                        borderRadius: 1,
                      }}
                    >
                      {rule.condition}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={rule.severity}
                      color={getSeverityColor(rule.severity) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{rule.machine}</Typography>
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={rule.enabled}
                          onChange={() => handleToggleRule(rule.id)}
                          size="small"
                        />
                      }
                      label={rule.enabled ? "Bật" : "Tắt"}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      {rule.lastTriggered}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleEditRule(rule)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteRule(rule.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingRule ? "Chỉnh sửa điều kiện" : "Thêm điều kiện mới"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên điều kiện"
                defaultValue={editingRule?.name || ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Mức độ</InputLabel>
                <Select
                  defaultValue={editingRule?.severity || "warning"}
                  label="Mức độ"
                >
                  <MenuItem value="info">Thông tin</MenuItem>
                  <MenuItem value="warning">Cảnh báo</MenuItem>
                  <MenuItem value="error">Lỗi</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                multiline
                rows={2}
                defaultValue={editingRule?.description || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Điều kiện"
                multiline
                rows={3}
                defaultValue={editingRule?.condition || ""}
                helperText="Sử dụng cú pháp: temperature > 45, pressure < 2, status = 'stopped'"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Máy áp dụng</InputLabel>
                <Select
                  defaultValue={editingRule?.machine || "all"}
                  label="Máy áp dụng"
                >
                  <MenuItem value="all">Tất cả máy</MenuItem>
                  <MenuItem value="A01">Máy A01</MenuItem>
                  <MenuItem value="B02">Máy B02</MenuItem>
                  <MenuItem value="C03">Máy C03</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch defaultChecked={editingRule?.enabled || false} />
                }
                label="Kích hoạt ngay"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <CustomButton variant="outline" onClick={() => setOpenDialog(false)}>
            Hủy
          </CustomButton>
          <CustomButton variant="primary">
            {editingRule ? "Cập nhật" : "Thêm mới"}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DieuKienCanhBao;
