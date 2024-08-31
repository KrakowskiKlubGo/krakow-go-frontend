"use client";
import { createTheme } from "@mui/material/styles";
import { Varela_Round } from "@next/font/google";

const varelaRound = Varela_Round({ weight: "400", subsets: ["latin"] });

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
    mode: "dark",
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    MuiPaper: {
      defaultProps: {},
    },
    MuiContainer: {
      defaultProps: {
        sx: {
          paddingX: 0,
          paddingY: 2,
        },
      },
    },
  },
  typography: {
    fontFamily: varelaRound.style.fontFamily,
  },
});
