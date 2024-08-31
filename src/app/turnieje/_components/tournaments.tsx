"use client";
import Box from "@mui/material/Box";
import { Container, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useSelectedLanguage, useTranslation } from "next-export-i18n";
import {
  get_ended_tournaments,
  get_incoming_tournaments,
} from "@/utils/functions";
import TournamentsList from "@/app/turnieje/_components/tournamentsList";

export default function Tournaments({ localized_tournaments_dict }: any) {
  const { t } = useTranslation();
  const { lang } = useSelectedLanguage();
  const tournaments = localized_tournaments_dict[lang];
  const incoming_tournaments = get_incoming_tournaments(tournaments);
  const ended_tournaments = get_ended_tournaments(tournaments);

  const incoming_tournaments_available = incoming_tournaments.length > 0;
  const ended_tournaments_available = ended_tournaments.length > 0;

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
