import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#085492",
      light: "#60B3DE",
      dark: "#043069",
      contrastText: "#fff",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
  },
  typography: {
    fontFamily: "Varela Round",
  },
});
