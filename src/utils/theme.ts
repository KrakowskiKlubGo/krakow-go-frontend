import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1140,
      xl: 1536,
    },
  },
  palette: {
    mode: "light",
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
        color: "#fff",
      },
    },
    MuiPaper: {
      defaultProps: {},
    },
  },
  typography: {
    fontFamily: "Varela Round",
  },
});
