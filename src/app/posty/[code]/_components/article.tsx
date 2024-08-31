"use client";
import Typography from "@mui/material/Typography";
import { Container, Paper } from "@mui/material";
import React from "react";

import CenteredBox from "@/components/CenteredBox";
import { useSelectedLanguage } from "next-export-i18n";

export default function Article({ article_localized_data }: any) {
  const { lang } = useSelectedLanguage();
  const article = article_localized_data[lang];

  return (
    <>
      <Container>
        <CenteredBox>
          <Paper sx={{ m: 3, p: 3 }}>
            <Typography variant={"h5"}>{article.title}</Typography>
            <div dangerouslySetInnerHTML={{ __html: article.html_content }} />
          </Paper>
        </CenteredBox>
      </Container>
    </>
  );
}
