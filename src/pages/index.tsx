import Image from "next/image";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Typography from "@mui/material/Typography";
import { TournamentListSchema } from "@/consts/tournamens/types";
import TournamentCard from "@/components/index/tournamentCard";
import { MeetingListSchema } from "@/consts/meetings/types";
import React from "react";
import { getMeetingsList, getIncomingTournamentsList } from "@/api/api_methods";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Container, Paper, Stack } from "@mui/material";
import CenteredBox from "@/components/common/CenteredBox";
import MeetingCard from "@/components/index/meetingCard";
import StonesGobanImage from "public/images/stones-goban.jpg";
import Box from "@mui/material/Box";
import styles from "@/styles/Home.module.css";
import { ImageSection } from "@/components/about/ImageSection";
import Meeting1 from "../../public/images/meeting1.jpg";
import Meeting2 from "../../public/images/meeting2.jpg";
import Meeting3 from "../../public/images/meeting3.jpg";
import Meeting4 from "../../public/images/meeting4.jpg";
import Meeting5 from "../../public/images/meeting5.jpg";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const tournaments: TournamentListSchema[] = await getIncomingTournamentsList(
    locale ?? "pl"
  );
  const meetings: MeetingListSchema[] = await getMeetingsList(locale ?? "pl");

  return {
    props: {
      tournaments,
      meetings,
      ...(await serverSideTranslations(locale ?? "pl", ["common", "main"])),
    },
  };
};

export default function Home(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation(["main"]);
  return (
    <>
      <Box
        className={styles.header}
        sx={{
          background: `linear-gradient(to bottom, rgba(22, 22, 22, 0.3) 0%, rgba(22, 22, 22, 0.7) 75%, #161616 100%), url(${StonesGobanImage.src})`,
        }}
      >
        <CenteredBox>
          <Stack spacing={10} direction={{ xs: "column", md: "row" }}>
            <CenteredBox>
              <Image
                src="/images/dragon_small.png"
                alt={"Krakowski Klub Go"}
                width={300}
                height={269}
              />
            </CenteredBox>
            <CenteredBox>
              <Stack direction={"column"} spacing={1}>
                {data.tournaments.length > 0 && (
                  <Paper elevation={3}>
                    <Typography variant={"h4"} padding={"1rem"}>
                      {t("tournament")}
                    </Typography>
                    {data.tournaments.map(
                      (tournament: TournamentListSchema) => (
                        <TournamentCard
                          tournament={tournament}
                          key={tournament.code}
                        />
                      )
                    )}
                  </Paper>
                )}
                {data.meetings.length > 0 && (
                  <Paper elevation={3}>
                    <Typography variant={"h4"} padding={"1rem"}>
                      {t("meeting")}
                    </Typography>
                    {data.meetings.map((meeting: MeetingListSchema) => (
                      <MeetingCard meeting={meeting} key={meeting.id} />
                    ))}
                  </Paper>
                )}
              </Stack>
            </CenteredBox>
          </Stack>
        </CenteredBox>
      </Box>
      <Box className={styles.intro}>
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant={"h4"}>{t("main_header")}</Typography>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography>
              {t("text_1")} {t("text_2")}
            </Typography>
          </Box>
        </Container>
      </Box>
      <Paper>
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
      </Paper>
    </>
  );
}
