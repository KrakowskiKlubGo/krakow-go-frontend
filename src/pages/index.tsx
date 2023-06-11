import Image from "next/image";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Typography from "@mui/material/Typography";
import { TournamentListSchema } from "@/consts/tournamens/types";
import TournamentCard from "@/components/index/tournamentCard";
import { MeetingListSchema } from "@/consts/meetings/types";
import React from "react";
import { getMeetingsList, getTournamentsList } from "@/api/api_methods";
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
import GobanCut from "../../public/images/goban-cut.png";
import { useSelectedLanguage, useTranslation } from "next-export-i18n";
import { get_incoming_tournaments } from "@/utils/functions";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const all_tournaments_pl: TournamentListSchema[] = await getTournamentsList(
    "pl"
  );
  const all_tournaments_en: TournamentListSchema[] = await getTournamentsList(
    "en"
  );

  const tournaments_pl: TournamentListSchema[] =
    get_incoming_tournaments(all_tournaments_pl);
  const tournaments_en: TournamentListSchema[] =
    get_incoming_tournaments(all_tournaments_en);

  const meetings_pl: MeetingListSchema[] = await getMeetingsList("pl");
  const meetings_en: MeetingListSchema[] = await getMeetingsList("en");

  return {
    props: {
      tournaments_pl,
      tournaments_en,
      meetings_en,
      meetings_pl,
    },
  };
};

export default function Home(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation();
  const { lang } = useSelectedLanguage();

  const tournaments = lang === "pl" ? data.tournaments_pl : data.tournaments_en;
  const meetings = lang === "pl" ? data.meetings_pl : data.meetings_en;
  return (
    <>
      <Box
        className={styles.header}
        sx={{
          background: `linear-gradient(to bottom, rgba(22, 22, 22, 0.3) 0%, rgba(22, 22, 22, 0.7) 75%, #161616 100%), url(${StonesGobanImage.src})`,
        }}
      >
        <CenteredBox>
          <Stack spacing={10} direction={"column"}>
            <CenteredBox>
              <Image
                src="/images/dragon_small.png"
                alt={"Krakowski Klub Go"}
                width={300}
                height={269}
              />
            </CenteredBox>
            <CenteredBox>
              <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
                {tournaments.length > 0 && (
                  <Stack spacing={1}>
                    <Paper elevation={2}>
                      <Typography variant={"h5"} padding={"1rem"}>
                        {t("main.tournament")}
                      </Typography>
                    </Paper>
                    {tournaments.map((tournament: TournamentListSchema) => (
                      <TournamentCard
                        tournament={tournament}
                        key={tournament.code}
                      />
                    ))}
                  </Stack>
                )}
                {meetings.length > 0 && (
                  <Stack spacing={1}>
                    <Paper elevation={4}>
                      <Typography variant={"h5"} padding={"1rem"}>
                        {t("main.meeting")}
                      </Typography>
                    </Paper>

                    {meetings.map((meeting: MeetingListSchema) => (
                      <MeetingCard meeting={meeting} key={meeting.code} />
                    ))}
                  </Stack>
                )}
              </Stack>
            </CenteredBox>
          </Stack>
        </CenteredBox>
      </Box>

      <Box className={styles.intro}>
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant={"h4"}>{t("main.main_header")}</Typography>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography>
              {t("main.text_1")} {t("main.text_2")}
            </Typography>
          </Box>
          <CenteredBox>
            <Image src={GobanCut} alt="goban" />
          </CenteredBox>
        </Container>
      </Box>

      <Container>
        <Paper>
          <ImageSection
            image={Meeting1}
            header={t("main.map_header")}
            description={t("main.map_description")}
            direction={"row-reverse"}
          />

          <ImageSection
            image={Meeting2}
            header={t("main.section_1_header")}
            description={t("main.section_1_text")}
          />

          <ImageSection
            image={Meeting3}
            header={t("main.section_2_header")}
            description={t("main.section_2_text")}
            direction={"row-reverse"}
          />

          <ImageSection
            image={Meeting4}
            header={t("main.section_3_header")}
            description={t("main.section_3_text")}
          />

          <ImageSection
            image={Meeting5}
            header={t("main.section_4_header")}
            description={t("main.section_4_text")}
            direction={"row-reverse"}
          />
        </Paper>
      </Container>
    </>
  );
}
