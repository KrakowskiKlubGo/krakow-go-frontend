import { GetStaticProps, InferGetStaticPropsType } from "next";
import Box from "@mui/material/Box";
import { Container, Paper, Typography } from "@mui/material";
import {
  getEndedTournamentsList,
  getIncomingTournamentsList,
} from "@/api/api_methods";
import { TournamentListSchema } from "@/consts/tournamens/types";
import * as React from "react";
import TournamentsList from "@/components/tournaments/TournamentsList";
import { useSelectedLanguage, useTranslation } from "next-export-i18n";

export const getStaticProps: GetStaticProps = async (context) => {
  const ended_tournaments_pl: TournamentListSchema[] =
    await getEndedTournamentsList("pl");

  const incoming_tournaments_pl: TournamentListSchema[] =
    await getIncomingTournamentsList("pl");

  const ended_tournaments_en: TournamentListSchema[] =
    await getEndedTournamentsList("en");

  const incoming_tournaments_en: TournamentListSchema[] =
    await getIncomingTournamentsList("en");

  return {
    props: {
      ended_tournaments_pl,
      incoming_tournaments_pl,
      ended_tournaments_en,
      incoming_tournaments_en,
    },
  };
};

export default function Tournaments(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  const incoming_tournaments_available =
    data.incoming_tournaments_pl.length > 0;
  const ended_tournaments_available = data.ended_tournaments_pl.length > 0;

  const { t } = useTranslation();
  const { lang } = useSelectedLanguage();
  const incoming_tournaments =
    lang === "pl" ? data.incoming_tournaments_pl : data.incoming_tournaments_en;
  const ended_tournaments =
    lang === "pl" ? data.ended_tournaments_pl : data.ended_tournaments_en;

  return (
    <Container>
      <Box>
        <Paper>
          {incoming_tournaments_available && (
            <Box padding={2}>
              <Typography variant={"h4"}>
                {t("tournaments.incoming_tournaments_header")}
              </Typography>
              <TournamentsList tournaments={incoming_tournaments} />
            </Box>
          )}
          {ended_tournaments_available && (
            <Box padding={2}>
              <Typography variant={"h4"}>
                {t("tournaments.ended_tournaments_header")}
              </Typography>
              <TournamentsList tournaments={ended_tournaments} />
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
