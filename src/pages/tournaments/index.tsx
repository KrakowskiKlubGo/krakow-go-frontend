import { GetStaticProps, InferGetStaticPropsType } from "next";
import Box from "@mui/material/Box";
import { Container, Paper, Typography } from "@mui/material";
import {
  getEndedTournamentsList,
  getIncomingTournamentsList,
} from "@/api/api_methods";
import { TournamentListSchema } from "@/consts/tournamens/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";
import { useTranslation } from "next-i18next";
import TournamentsList from "@/components/tournaments/TournamentsList";

export const getStaticProps: GetStaticProps = async (context) => {
  const ended_tournaments: TournamentListSchema[] =
    await getEndedTournamentsList(context.locale ?? "pl");

  const incoming_tournaments: TournamentListSchema[] =
    await getIncomingTournamentsList(context.locale ?? "pl");

  return {
    props: {
      ended_tournaments,
      incoming_tournaments,
      ...(await serverSideTranslations(context.locale ?? "pl", [
        "common",
        "tournaments",
      ])),
      revalidate: 60,
    },
  };
};

export default function Tournaments(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  const incoming_tournaments_available = data.incoming_tournaments.length > 0;
  const ended_tournaments_available = data.ended_tournaments.length > 0;
  const { t } = useTranslation("tournaments");
  return (
    <Container>
      <Box>
        <Paper>
          {incoming_tournaments_available && (
            <Box padding={2}>
              <Typography variant={"h4"}>
                {t("incoming_tournaments_header")}
              </Typography>
              <TournamentsList tournaments={data.incoming_tournaments} />
            </Box>
          )}
          {ended_tournaments_available && (
            <Box padding={2}>
              <Typography variant={"h4"}>
                {t("ended_tournaments_header")}
              </Typography>
              <TournamentsList tournaments={data.ended_tournaments} />
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
