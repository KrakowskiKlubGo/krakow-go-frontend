"use client";
import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/utils/theme";
import styles from "@/styles/Main.module.css";
import "../styles/highlighter.scss";
import { Box } from "@mui/material";
import "../styles/globals.css";
import MainAppBar from "@/app/_layout_components/mainNavigation";
import Footer from "@/app/_layout_components/footer";
import { Suspense } from "react";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Suspense>
              <MainAppBar />
            </Suspense>
            <main className={styles.main}>
              <Box className={styles.background}></Box>
              {props.children}
            </main>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
