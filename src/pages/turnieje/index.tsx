import { GetStaticProps, InferGetStaticPropsType } from "next";
import Box from "@mui/material/Box";
import { Container, Paper, Typography } from "@mui/material";
import { getTournamentsList } from "@/api/api_methods";
import { TournamentListSchema } from "@/consts/tournamens/types";
import * as React from "react";
import TournamentsList from "@/components/tournaments/TournamentsList";
import { useSelectedLanguage, useTranslation } from "next-export-i18n";
import {
  get_ended_tournaments,
  get_incoming_tournaments,
} from "@/utils/functions";

export const getStaticProps: GetStaticProps = async (context) => {
  const tournaments_pl: TournamentListSchema[] = await getTournamentsList("pl");
  const tournaments_en: TournamentListSchema[] = await getTournamentsList("en");

  const ended_tournaments_pl = get_ended_tournaments(tournaments_pl);
  const incoming_tournaments_pl = get_incoming_tournaments(tournaments_pl);
  const ended_tournaments_en = get_ended_tournaments(tournaments_en);
  const incoming_tournaments_en = get_incoming_tournaments(tournaments_en);

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
