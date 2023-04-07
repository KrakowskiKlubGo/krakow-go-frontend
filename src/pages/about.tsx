import Image from "next/image";
import Box from "@mui/material/Box";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Typography from "@mui/material/Typography";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Container, Grid, Paper } from "@mui/material";
import Meeting1 from "public/images/meeting1.jpg";
import Meeting2 from "public/images/meeting2.jpg";
import Meeting3 from "public/images/meeting3.jpg";
import Meeting4 from "public/images/meeting4.jpg";
import CssBaseline from "@mui/material/CssBaseline";
import { ImageSection } from "@/components/about/ImageSection";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "pl", [
        "common",
        "about",
      ])),
    },
  };
};

export default function About(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation("about");
  return (
    <Container>
      <Paper>
        <Typography variant={"h4"}>{t("main_header")}</Typography>
        <Typography variant={"h5"}>{t("text_1")}</Typography>
        <Typography variant={"h5"}>{t("text_2")}</Typography>

        <Typography variant={"h5"}>{t("map_header")}</Typography>
        <Typography variant={"subtitle1"}>{t("map_description")}</Typography>
        <Typography variant={"subtitle1"}>{t("map_address_1")}</Typography>
        <Typography variant={"body1"}>{t("map_address_2")}</Typography>

        <ImageSection
          image={Meeting1}
          header={t("section_1_header")}
          description={t("section_1_text")}
        />

        <ImageSection
          image={Meeting2}
          header={t("section_2_header")}
          description={t("section_2_text")}
          flip={true}
        />

        <ImageSection
          image={Meeting3}
          header={t("section_3_header")}
          description={t("section_3_text")}
        />

        <ImageSection
          image={Meeting4}
          header={t("section_4_header")}
          description={t("section_4_text")}
          flip={true}
        />

        <Typography variant={"body1"}>{t("contact")}</Typography>
      </Paper>
    </Container>
  );
}
