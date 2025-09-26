import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { FilterList, Monitor, Warning } from "@mui/icons-material";
import { useTheme as useCustomTheme } from "../../contexts/ThemeContext";
import {
  ACCENT_FORM_TERTIARY_TABLE,
  BORDER_PRIMARY,
  WHITE,
  BLACK,
  FONT_SIZE_SM,
  FONT_WEIGHT_BOLD,
  FONT_SIZE_XS,
  BORDER_SECONDARY,
  TEXT_DISABLED,
  BG_SECONDARY,
} from "../../styles/colors";

interface SensorData {
  id: number;
  uuid: string;
  name: string;
  line?: string;
  machine?: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windFlow?: number;
  waterFlow?: number;
  status: "active" | "inactive";
  hasWarning: boolean;
}

const Dashboard = () => {
  const { actualMode } = useCustomTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedArea, setSelectedArea] = useState("GN1");
  const [displayedCount, setDisplayedCount] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  // Style objects để tái sử dụng
  const headerCellStyle = {
    backgroundColor: ACCENT_FORM_TERTIARY_TABLE,
    color: WHITE,
    fontWeight: FONT_WEIGHT_BOLD,
    fontSize: FONT_SIZE_XS,
    border: "none",
    textAlign: "center" as const,
    padding: "8px 12px",
    height: "40px",
  };

  const dataCellStyle = {
    border: "none",
    textAlign: "center" as const,
    color: actualMode === "dark" ? WHITE : BLACK,
    fontSize: FONT_SIZE_XS,
    padding: "6px 12px",
    height: "36px",
  };

  const borderRightStyle = {
    borderRight: `1px solid ${
      actualMode === "dark" ? BORDER_PRIMARY : "#e0e0e0"
    }`,
  };

  const borderRightThickStyle = {
    borderRight: `2px solid ${
      actualMode === "dark" ? "rgba(255, 255, 255, 0.4)" : "#d0d0d0"
    }`,
  };

  const tabs = ["All", "Line", "Máy", "Đường ống"];
  const areaItems = [
    "GN1",
    "CH1",
    "CR1",
    "CH2",
    "GN2",
    "GN3C",
    "SMTC",
    "GN3AB",
    "GH4",
    "MEKTEC",
    "4SENSOR",
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "S6",
    "S7",
    "CH3",
  ];

  // Mock data
  const sensorData: SensorData[] = [
    {
      id: 1,
      uuid: "C0:49:EF:68:DC:08",
      name: "Cảm biến 1",
      line: "Line A",
      machine: "Máy 001",
      temperature: 25.5,
      humidity: 65,
      pressure: 1013.3,
      windFlow: 2.1,
      waterFlow: 1.5,
      status: "active",
      hasWarning: false,
    },
    {
      id: 2,
      uuid: "B9:34:CD:78:90:12",
      name: "Cảm biến 2",
      line: "Line B",
      machine: "Máy 002",
      temperature: 28.2,
      humidity: 70,
      pressure: 1012.8,
      windFlow: 3.2,
      waterFlow: 2.1,
      status: "active",
      hasWarning: false,
    },
    {
      id: 3,
      uuid: "A7:82:1B:45:67:89",
      name: "Cảm biến 3",
      line: "Line A",
      machine: "Máy 003",
      temperature: 22.8,
      humidity: 58,
      pressure: 1014.1,
      windFlow: 1.9,
      waterFlow: 1.5,
      status: "active",
      hasWarning: false,
    },
    {
      id: 4,
      uuid: "D3:56:9E:12:34:56",
      name: "Cảm biến 4",
      line: "Line C",
      machine: "Máy 004",
      temperature: 350,
      humidity: 45,
      pressure: 1015.3,
      windFlow: 4.1,
      waterFlow: 2.8,
      status: "active",
      hasWarning: true,
    },
    {
      id: 5,
      uuid: "E8:91:2F:78:90:AB",
      name: "Cảm biến 5",
      line: "Line B",
      machine: "Máy 005",
      temperature: 26.1,
      humidity: 72,
      pressure: 1011.5,
      windFlow: 2.8,
      waterFlow: 1.8,
      status: "active",
      hasWarning: false,
    },
    {
      id: 6,
      uuid: "F4:67:3A:90:12:CD",
      name: "Cảm biến 6",
      line: "Line A",
      machine: "Máy 006",
      temperature: 0,
      humidity: 0,
      pressure: 0,
      windFlow: 0,
      waterFlow: 0,
      status: "inactive",
      hasWarning: false,
    },
    ...Array.from({ length: 19 }, (_, i) => ({
      id: i + 7,
      uuid: `${(i + 7).toString(16).padStart(2, "0")}:${(i + 7)
        .toString(16)
        .padStart(2, "0")}:${(i + 7).toString(16).padStart(2, "0")}:${(i + 7)
        .toString(16)
        .padStart(2, "0")}:${(i + 7).toString(16).padStart(2, "0")}:${(i + 7)
        .toString(16)
        .padStart(2, "0")}`,
      name: `Cảm biến ${i + 7}`,
      line: `Line ${String.fromCharCode(65 + (i % 3))}`,
      machine: `Máy ${String(i + 7).padStart(3, "0")}`,
      temperature: 20 + Math.random() * 15,
      humidity: 50 + Math.random() * 30,
      pressure: 1010 + Math.random() * 10,
      windFlow: 1 + Math.random() * 4,
      waterFlow: 1 + Math.random() * 3,
      status: (Math.random() > 0.1 ? "active" : "inactive") as
        | "active"
        | "inactive",
      hasWarning: Math.random() > 0.8,
    })),
  ];

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setDisplayedCount((prev) => Math.min(prev + 20, sensorData.length));
      setIsLoading(false);
    }, 1000);
  };

  const getDisplayedData = () => {
    return sensorData.slice(0, displayedCount);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "background.default",
        padding: 0,
      }}
    >
      {/* Header with Filter Tabs */}
      <Box
        sx={{
          backgroundColor: actualMode === "dark" ? "#2e364d" : "#ffffff",
          borderBottom:
            actualMode === "dark"
              ? `1px solid ${BORDER_SECONDARY}`
              : "1px solid #e0e0e0",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          sx={{ color: actualMode === "dark" ? "#ffffff" : "#000000", mr: 2 }}
        >
          <FilterList />
        </IconButton>
        <Box sx={{ display: "flex", gap: 1 }}>
          {tabs.map((tab, index) => (
            <Button
              key={tab}
              variant={activeTab === index ? "contained" : "outlined"}
              size="small"
              onClick={() => setActiveTab(index)}
              sx={{
                flex: 1,
                minWidth: 100,
                height: 32,
                backgroundColor:
                  activeTab === index
                    ? actualMode === "dark"
                      ? "#3b499b"
                      : "#1976d2"
                    : "transparent",
                color:
                  activeTab === index
                    ? "#ffffff"
                    : actualMode === "dark"
                    ? "#ffffff"
                    : "#000000",
                borderColor:
                  actualMode === "dark"
                    ? "rgba(255, 255, 255, 0.3)"
                    : "#e0e0e0",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: activeTab === index ? "bold" : "normal",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                "&:hover": {
                  backgroundColor:
                    activeTab === index
                      ? actualMode === "dark"
                        ? "#3b499b"
                        : "#1976d2"
                      : actualMode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              {tab}
            </Button>
          ))}
        </Box>
        <Box sx={{ flex: 1 }} />
      </Box>

      {/* Area Selection Row */}
      <Box
        sx={{
          backgroundColor: actualMode === "dark" ? "#2e364d" : "#ffffff",
          borderBottom:
            actualMode === "dark"
              ? `1px solid ${BORDER_SECONDARY}`
              : "1px solid #e0e0e0",
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          overflowX: "auto",
        }}
      >
        {areaItems.map((item) => (
          <Button
            key={item}
            variant={selectedArea === item ? "contained" : "outlined"}
            size="small"
            onClick={() => setSelectedArea(item)}
            sx={{
              flex: 1,
              height: 32,
              backgroundColor:
                selectedArea === item
                  ? actualMode === "dark"
                    ? "#3b499b"
                    : "#1976d2"
                  : "transparent",
              color:
                selectedArea === item
                  ? "#ffffff"
                  : actualMode === "dark"
                  ? "#ffffff"
                  : "#000000",
              borderColor:
                actualMode === "dark" ? `${TEXT_DISABLED}` : "#e0e0e0",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: selectedArea === item ? "bold" : "normal",
              marginX: 0.5,
              "&:hover": {
                backgroundColor:
                  selectedArea === item
                    ? actualMode === "dark"
                      ? "#3b499b"
                      : "#1976d2"
                    : actualMode === "dark"
                    ? `${BORDER_SECONDARY}`
                    : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            {item}
          </Button>
        ))}
      </Box>

      {/* Table */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: actualMode === "dark" ? "#2e364d" : "#ffffff",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Table with Fixed Header */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            backgroundColor: actualMode === "dark" ? "#2e364d" : "#ffffff",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              border: `1px solid ${
                actualMode === "dark" ? BORDER_PRIMARY : "#e0e0e0"
              }`,
              borderRadius: 1,
              maxHeight: "calc(100vh - 200px)", // Giới hạn chiều cao để có scroll
              overflow: "auto",
            }}
          >
            <Table
              stickyHeader
              sx={{
                borderCollapse: "collapse",
                "& .MuiTableHead-root": {
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                },
                "& .MuiTableHead-root .MuiTableCell-root": {
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                },
              }}
            >
              <TableHead
                sx={{
                  position: "sticky",
                  top: 0,
                  zIndex: 15,
                  backgroundColor:
                    actualMode === "dark" ? "#1f2a40" : "#f5f5f5",
                  borderBottom: `2px solid ${
                    actualMode === "dark" ? BORDER_PRIMARY : "#d0d0d0"
                  }`,
                }}
              >
                {/* Hàng 1 - Header chính */}
                <TableRow>
                  <TableCell
                    sx={{
                      ...headerCellStyle,
                      ...borderRightStyle,
                      width: "80px",
                    }}
                  ></TableCell>
                  <TableCell
                    rowSpan={2}
                    sx={{
                      ...headerCellStyle,
                      ...borderRightStyle,
                      verticalAlign: "middle",
                      width: "60px",
                    }}
                  >
                    STT
                  </TableCell>
                  <TableCell
                    rowSpan={2}
                    sx={{
                      ...headerCellStyle,
                      ...borderRightStyle,
                      verticalAlign: "middle",
                      minWidth: "200px",
                    }}
                  >
                    UUID
                  </TableCell>
                  <TableCell
                    rowSpan={2}
                    sx={{
                      ...headerCellStyle,
                      ...borderRightThickStyle,
                      verticalAlign: "middle",
                      minWidth: "150px",
                    }}
                  >
                    Tên cảm biến
                  </TableCell>
                  {activeTab === 1 && (
                    <TableCell
                      rowSpan={2}
                      sx={{
                        ...headerCellStyle,
                        ...borderRightStyle,
                        textAlign: "left",
                        verticalAlign: "middle",
                        minWidth: "120px",
                      }}
                    >
                      Line
                    </TableCell>
                  )}
                  {activeTab === 2 && (
                    <TableCell
                      rowSpan={2}
                      sx={{
                        ...headerCellStyle,
                        ...borderRightStyle,
                        textAlign: "left",
                        verticalAlign: "middle",
                        minWidth: "120px",
                      }}
                    >
                      Máy
                    </TableCell>
                  )}
                  {(activeTab === 0 || activeTab === 1 || activeTab === 2) && (
                    <TableCell
                      sx={{
                        ...headerCellStyle,
                        ...borderRightStyle,
                        borderBottom: `1px solid ${BORDER_PRIMARY}`,
                        minWidth: "300px",
                      }}
                      colSpan={activeTab === 1 ? 4 : 3}
                    >
                      Dữ liệu
                    </TableCell>
                  )}
                  {activeTab === 3 && (
                    <TableCell
                      sx={{
                        ...headerCellStyle,
                        ...borderRightStyle,
                        minWidth: "200px",
                      }}
                    >
                      Lưu lượng nước (m/s)
                    </TableCell>
                  )}
                  <TableCell
                    rowSpan={2}
                    sx={{
                      ...headerCellStyle,
                      verticalAlign: "middle",
                      minWidth: "120px",
                    }}
                  >
                    Trạng thái
                  </TableCell>
                </TableRow>

                {/* Hàng 2 - Sub headers cho Dữ liệu */}
                {(activeTab === 0 || activeTab === 1 || activeTab === 2) && (
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: ACCENT_FORM_TERTIARY_TABLE,
                        border: "none",
                        borderRight: `1px solid ${BORDER_PRIMARY}`,
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        ...headerCellStyle,
                        ...borderRightStyle,
                        borderTop: `1px solid ${BORDER_PRIMARY}`,
                        minWidth: "100px",
                      }}
                    >
                      Nhiệt độ (°C)
                    </TableCell>
                    <TableCell
                      sx={{
                        ...headerCellStyle,
                        ...borderRightStyle,
                        borderTop: `1px solid ${BORDER_PRIMARY}`,
                        minWidth: "100px",
                      }}
                    >
                      Độ ẩm (%RH)
                    </TableCell>
                    <TableCell
                      sx={{
                        ...headerCellStyle,
                        ...borderRightStyle,
                        borderTop: `1px solid ${BORDER_PRIMARY}`,
                        minWidth: "100px",
                      }}
                    >
                      Áp suất (Pa)
                    </TableCell>
                    {activeTab === 1 && (
                      <TableCell
                        sx={{
                          ...headerCellStyle,
                          ...borderRightStyle,
                          borderTop: `1px solid ${BORDER_PRIMARY}`,
                          minWidth: "100px",
                        }}
                      >
                        Lưu lượng gió (m/s)
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableHead>
              <TableBody
                sx={{
                  borderBottom: `1px solid ${
                    actualMode === "dark" ? BORDER_PRIMARY : "#d0d0d0"
                  }`,
                }}
              >
                {getDisplayedData().map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor:
                        actualMode === "dark" ? "#2e364d" : "#ffffff",
                      borderBottom: `1px solid ${
                        actualMode === "dark" ? BORDER_SECONDARY : "#f0f0f0"
                      }`,
                      "&:nth-of-type(even)": {
                        backgroundColor:
                          actualMode === "dark" ? "#1f2a40" : "#f8f9fa",
                      },
                      "&:hover": {
                        backgroundColor:
                          actualMode === "dark"
                            ? `${BG_SECONDARY}`
                            : "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        ...dataCellStyle,
                        ...borderRightStyle,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        <Monitor sx={{ color: "#1976f3", fontSize: 20 }} />
                        <Warning
                          sx={{
                            color: row.hasWarning ? "#ff9800" : "#9e9e9e",
                            fontSize: 20,
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        ...dataCellStyle,
                        ...borderRightStyle,
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...dataCellStyle,
                        ...borderRightStyle,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "monospace",
                          color: actualMode === "dark" ? WHITE : BLACK,
                        }}
                      >
                        {row.uuid}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        ...dataCellStyle,
                        ...borderRightThickStyle,
                      }}
                    >
                      {row.name}
                    </TableCell>
                    {activeTab === 1 && (
                      <TableCell
                        sx={{
                          ...dataCellStyle,
                          ...borderRightStyle,
                          textAlign: "left",
                        }}
                      >
                        {row.line}
                      </TableCell>
                    )}
                    {activeTab === 2 && (
                      <TableCell
                        sx={{
                          ...dataCellStyle,
                          ...borderRightStyle,
                          textAlign: "left",
                        }}
                      >
                        {row.machine}
                      </TableCell>
                    )}
                    {activeTab === 0 && (
                      <>
                        <TableCell
                          sx={{
                            ...dataCellStyle,
                            ...borderRightStyle,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color:
                                row.temperature && row.temperature > 100
                                  ? "#f44336"
                                  : actualMode === "dark"
                                  ? "#ffffff"
                                  : "#000000",
                              fontWeight: FONT_WEIGHT_BOLD,
                              fontSize: FONT_SIZE_SM,
                            }}
                          >
                            {row.temperature?.toFixed(1) || "0.0"}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            ...dataCellStyle,
                            ...borderRightStyle,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color:
                                row.humidity && row.humidity > 80
                                  ? "#f44336"
                                  : actualMode === "dark"
                                  ? "#ffffff"
                                  : "#000000",
                              fontWeight: FONT_WEIGHT_BOLD,
                              fontSize: FONT_SIZE_SM,
                            }}
                          >
                            {row.humidity?.toFixed(0) || "0"}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            ...dataCellStyle,
                            ...borderRightStyle,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color:
                                row.pressure && row.pressure > 1020
                                  ? "#f44336"
                                  : actualMode === "dark"
                                  ? "#ffffff"
                                  : "#000000",
                              fontWeight: FONT_WEIGHT_BOLD,
                              fontSize: FONT_SIZE_SM,
                            }}
                          >
                            {row.pressure?.toFixed(1) || "0.0"}
                          </Typography>
                        </TableCell>
                      </>
                    )}
                    {activeTab === 1 && (
                      <>
                        <TableCell
                          sx={{
                            ...dataCellStyle,
                            ...borderRightStyle,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color:
                                row.temperature && row.temperature > 100
                                  ? "#f44336"
                                  : actualMode === "dark"
                                  ? "#ffffff"
                                  : "#000000",
                              fontWeight: FONT_WEIGHT_BOLD,
                              fontSize: FONT_SIZE_SM,
                            }}
                          >
                            {row.temperature?.toFixed(1) || "0.0"}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            ...dataCellStyle,
                            ...borderRightStyle,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color:
                                row.humidity && row.humidity > 80
                                  ? "#f44336"
                                  : actualMode === "dark"
                                  ? "#ffffff"
                                  : "#000000",
                              fontWeight: FONT_WEIGHT_BOLD,
                              fontSize: FONT_SIZE_SM,
                            }}
                          >
                            {row.humidity?.toFixed(0) || "0"}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            ...dataCellStyle,
                            ...borderRightStyle,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color:
                                row.pressure && row.pressure > 1020
                                  ? "#f44336"
                                  : actualMode === "dark"
                                  ? "#ffffff"
                                  : "#000000",
                              fontWeight: FONT_WEIGHT_BOLD,
                              fontSize: FONT_SIZE_SM,
                            }}
                          >
                            {row.pressure?.toFixed(1) || "0.0"}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            ...dataCellStyle,
                            ...borderRightStyle,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color:
                                row.windFlow && row.windFlow > 3
                                  ? "#f44336"
                                  : actualMode === "dark"
                                  ? "#ffffff"
                                  : "#000000",
                              fontWeight: FONT_WEIGHT_BOLD,
                              fontSize: FONT_SIZE_SM,
                            }}
                          >
                            {row.windFlow?.toFixed(1) || "0.0"}
                          </Typography>
                        </TableCell>
                      </>
                    )}
                    {activeTab === 2 && (
                      <>
                        <TableCell
                          sx={{
                            ...dataCellStyle,
                            ...borderRightStyle,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color:
                                row.temperature && row.temperature > 100
                                  ? "#f44336"
                                  : actualMode === "dark"
                                  ? "#ffffff"
                                  : "#000000",
                              fontWeight: FONT_WEIGHT_BOLD,
                              fontSize: FONT_SIZE_SM,
                            }}
                          >
                            {row.temperature?.toFixed(1) || "0.0"}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            ...dataCellStyle,
                            ...borderRightStyle,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color:
                                row.humidity && row.humidity > 80
                                  ? "#f44336"
                                  : actualMode === "dark"
                                  ? "#ffffff"
                                  : "#000000",
                              fontWeight: FONT_WEIGHT_BOLD,
                              fontSize: FONT_SIZE_SM,
                            }}
                          >
                            {row.humidity?.toFixed(0) || "0"}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            ...dataCellStyle,
                            ...borderRightStyle,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color:
                                row.pressure && row.pressure > 1020
                                  ? "#f44336"
                                  : actualMode === "dark"
                                  ? "#ffffff"
                                  : "#000000",
                              fontWeight: FONT_WEIGHT_BOLD,
                              fontSize: FONT_SIZE_SM,
                            }}
                          >
                            {row.pressure?.toFixed(1) || "0.0"}
                          </Typography>
                        </TableCell>
                      </>
                    )}
                    {activeTab === 3 && (
                      <TableCell
                        sx={{
                          ...dataCellStyle,
                          ...borderRightStyle,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color:
                              row.waterFlow && row.waterFlow > 2
                                ? "#f44336"
                                : actualMode === "dark"
                                ? "#ffffff"
                                : "#000000",
                            fontWeight: FONT_WEIGHT_BOLD,
                            fontSize: FONT_SIZE_SM,
                          }}
                        >
                          {row.waterFlow?.toFixed(1) || "0.0"}
                        </Typography>
                      </TableCell>
                    )}
                    <TableCell
                      sx={{
                        ...dataCellStyle,
                      }}
                    >
                      <Chip
                        label={
                          row.status === "active"
                            ? "Hoạt động"
                            : "Không hoạt động"
                        }
                        color={row.status === "active" ? "success" : "default"}
                        size="small"
                        sx={{
                          color:
                            row.status === "active"
                              ? "#ffffff" // Chữ trắng cho trạng thái "Hoạt động"
                              : actualMode === "dark"
                              ? "#ffffff"
                              : "#000000",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Load More Button */}
        {displayedCount < sensorData.length && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: 2,
              backgroundColor: actualMode === "dark" ? "#1f2a40" : "#f5f5f5",
              borderTop:
                actualMode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid #e0e0e0",
              flexShrink: 0,
            }}
          >
            <Button
              variant="contained"
              onClick={handleLoadMore}
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : null
              }
              sx={{
                backgroundColor: actualMode === "dark" ? "#3b499b" : "#1976d2",
                color: WHITE,
                "&:hover": {
                  backgroundColor:
                    actualMode === "dark" ? "#2E3A7B" : "#1565c0",
                },
                "&:disabled": {
                  backgroundColor:
                    actualMode === "dark" ? "#2e364d" : "#e0e0e0",
                  color: actualMode === "dark" ? "#666666" : "#999999",
                },
              }}
            >
              {isLoading
                ? "Đang tải..."
                : `Tải thêm (${sensorData.length - displayedCount} còn lại)`}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
