import Image from "next/image";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Typography from "@mui/material/Typography";
import { TournamentListSchema } from "@/consts/tournamens/types";
import TournamentCard from "@/components/index/tournamentCard";
import { MeetingListSchema } from "@/consts/meetings/types";
import React from "react";
import MeetingCard from "@/components/index/meetingCard";
import { getMeetingsList, getTournamentsList } from "@/api/api_methods";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Paper, Stack } from "@mui/material";
import CenteredBox from "@/components/common/CenteredBox";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const tournaments: TournamentListSchema[] = await getTournamentsList(
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
  const { t } = useTranslation("main");
  return (
    <CenteredBox
      sx={{ flexGrow: 1 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={10} direction={{ xs: "column", md: "row" }}>
        <CenteredBox>
          <Image
            src="/images/dragon_small.png"
            alt={"Krakowski Klub Go"}
            width={300}
            height={269}
            style={{
              filter: "drop-shadow(0px 0px 20px #AAAAFF)",
            }}
          />
        </CenteredBox>
        <CenteredBox>
          <Stack direction={"column"} spacing={1}>
            <Paper elevation={3}>
              <Typography variant={"h4"} padding={"1rem"}>
                {t("tournament")}
              </Typography>
              {data.tournaments.map((tournament: TournamentListSchema) => (
                <TournamentCard tournament={tournament} key={tournament.id} />
              ))}
            </Paper>

            <Paper elevation={3}>
              <Typography variant={"h4"} padding={"1rem"}>
                {t("meeting")}
              </Typography>
              {data.meetings.map((meeting: MeetingListSchema) => (
                <MeetingCard meeting={meeting} key={meeting.id} />
              ))}
            </Paper>
          </Stack>
        </CenteredBox>
      </Stack>
    </CenteredBox>
  );
}
