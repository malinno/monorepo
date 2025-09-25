import React from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  ArrowBack,
  Save,
  PlayArrow,
  Stop,
  Construction,
} from "@mui/icons-material";
import { useNavigation } from "../hooks/useNavigation";
import { Breadcrumbs } from "../components/common";

const AnimationPage: React.FC = () => {
  const { goBack } = useNavigation();

  const handleSave = () => {
    console.log("Saving animation...");
  };

  const handlePlay = () => {
    console.log("Playing animation...");
  };

  const handleStop = () => {
    console.log("Stopping animation...");
  };

  const breadcrumbItems = [
    {
      label: "Animation",
    },
  ];

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Breadcrumbs */}
      <Box sx={{ p: 2, backgroundColor: "background.paper" }}>
        <Breadcrumbs items={breadcrumbItems} />
      </Box>

      {/* Header */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={goBack}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Animation Studio
          </Typography>

          <Button
            color="inherit"
            startIcon={<Save />}
            onClick={handleSave}
            sx={{ mr: 1 }}
          >
            Lưu
          </Button>

          <Button
            color="inherit"
            startIcon={<PlayArrow />}
            onClick={handlePlay}
            sx={{ mr: 1 }}
          >
            Phát
          </Button>

          <Button color="inherit" startIcon={<Stop />} onClick={handleStop}>
            Dừng
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: 300,
            borderRight: 1,
            borderColor: "divider",
            backgroundColor: "background.paper",
            overflow: "auto",
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Component Palette
          </Typography>

          <Grid container spacing={1}>
            {[
              { name: "Pump", icon: "🔧", color: "primary" },
              { name: "Valve", icon: "🚰", color: "secondary" },
              { name: "Tank", icon: "🛢️", color: "success" },
              { name: "Pipe", icon: "🔗", color: "info" },
              { name: "Filter", icon: "🔍", color: "warning" },
              { name: "Fan", icon: "🌀", color: "error" },
            ].map((component, index) => (
              <Grid item xs={6} key={index}>
                <Card
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: 2,
                    },
                  }}
                >
                  <CardContent sx={{ p: 1, textAlign: "center" }}>
                    <Typography variant="h6">{component.icon}</Typography>
                    <Typography variant="caption" display="block">
                      {component.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Canvas */}
        <Box sx={{ flexGrow: 1, position: "relative", p: 2 }}>
          <Paper
            elevation={1}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Construction
              sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Animation Canvas
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Animation components will be integrated here
            </Typography>
            <Chip label="Coming Soon" color="primary" variant="outlined" />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AnimationPage;
