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
import Meeting5 from "public/images/meeting5.jpg";
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
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant={"h4"}>{t("main_header")}</Typography>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant={"h5"}>
              {t("text_1")} {t("text_2")}
            </Typography>
          </Box>
        </Container>
        <Container>
          <ImageSection
            image={Meeting1}
            header={t("map_header")}
            description={t("map_description")}
            direction={"row-reverse"}
          />

          <ImageSection
            image={Meeting2}
            header={t("section_1_header")}
            description={t("section_1_text")}
          />

          <ImageSection
            image={Meeting3}
            header={t("section_2_header")}
            description={t("section_2_text")}
            direction={"row-reverse"}
          />

          <ImageSection
            image={Meeting4}
            header={t("section_3_header")}
            description={t("section_3_text")}
          />

          <ImageSection
            image={Meeting5}
            header={t("section_4_header")}
            description={t("section_4_text")}
            direction={"row-reverse"}
          />
        </Container>

        <Typography variant={"body1"}>{t("contact")}</Typography>
      </Paper>
    </Container>
  );
}
