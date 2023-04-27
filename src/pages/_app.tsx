import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/utils/createEmotionCache";
import { theme } from "@/utils/theme";
import MainAppBar from "../components/navigation/mainNavigation";
import styles from "@/styles/Main.module.css";
import "../styles/globals.css";
import "../styles/highlighter.scss";
import { appWithTranslation } from "next-i18next";
import { Box } from "@mui/material";
import Image from "next/image";
import Footer from "@/components/navigation/footer";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Krakowski Klub Go</title>
        <meta
          name="description"
          content="Strona opisująca działalność Krakowskiego Klubu Go"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Varela+Round"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <MainAppBar />
        <main className={styles.main}>
          <Box className={styles.background}></Box>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default appWithTranslation(MyApp);
