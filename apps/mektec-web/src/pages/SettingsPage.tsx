import {
  Box,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";
import { CustomButton, Breadcrumbs } from "../components/common";

const SettingsPage = () => {
  const breadcrumbItems = [
    {
      label: "Settings",
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
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              General Settings
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable notifications"
              />
              <FormControlLabel control={<Switch />} label="Dark mode" />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Auto-save"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <CustomButton variant="outline" size="medium">
                Change Password
              </CustomButton>
              <CustomButton variant="outline" size="medium">
                Update Profile
              </CustomButton>
              <CustomButton variant="error" size="medium">
                Delete Account
              </CustomButton>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Information
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Version: 1.0.0
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated: {new Date().toLocaleDateString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
