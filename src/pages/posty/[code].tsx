import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import Typography from "@mui/material/Typography";
import { Container, Paper } from "@mui/material";
import React from "react";
import { getArticleDetails, getArticlesList } from "@/api/api_methods";
import { detailPageParams } from "@/consts/interfaces";
import CenteredBox from "@/components/common/CenteredBox";
import { useSelectedLanguage } from "next-export-i18n";
import {
  ArticleDetailSchema,
  ArticleListSchema,
} from "@/consts/articles/types";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const articles: ArticleListSchema[] = await getArticlesList();
  const unique_codes = Array.from(
    new Set(articles.map((article) => article.code))
  );

  const paths = unique_codes.flatMap((code) => {
    return {
      params: { code: code },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { code } = context.params as detailPageParams;
  const article_pl: ArticleDetailSchema = await getArticleDetails(code, "pl");
  const article_en: ArticleDetailSchema = await getArticleDetails(code, "en");

  return {
    props: {
      article_pl,
      article_en,
    },
  };
};

export default function Article(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { lang } = useSelectedLanguage();
  const article = lang === "pl" ? data.article_pl : data.article_en;

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
