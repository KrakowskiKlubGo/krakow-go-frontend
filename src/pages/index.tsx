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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Image
            src="/images/dragon_small.png"
            alt={"Krakowski Klub Go"}
            width={300}
            height={269}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Typography>{t("tournament")}</Typography>
            {data.tournaments.map((tournament: TournamentListSchema) => (
              <TournamentCard tournament={tournament} key={tournament.id} />
            ))}

            <Typography>{t("meeting")}</Typography>
            {data.meetings.map((meeting: MeetingListSchema) => (
              <MeetingCard meeting={meeting} key={meeting.id} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
