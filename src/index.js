import ReactDOM from "react-dom/client"
import App from "./App"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

// Light theme with refined colors and styles
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // blue
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f68e56", // orange
      light: "#f9b385",
      dark: "#e57373",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    divider: "rgba(0, 0, 0, 0.08)",
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#2e7d32",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.5px",
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#757575",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          },
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        },
        containedSecondary: {
          "&:hover": {
            backgroundColor: "#e57373",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: "center",
          padding: "16px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        },
        head: {
          fontWeight: 600,
          backgroundColor: "rgba(0, 0, 0, 0.02)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.15)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(0, 0, 0, 0.3)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
            },
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          scrollbarColor: "#bdbdbd #f5f5f5",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f5f5f5",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#bdbdbd",
            borderRadius: "4px",
          },
        },
      },
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
)
