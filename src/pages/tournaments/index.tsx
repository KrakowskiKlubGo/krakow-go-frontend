import { GetStaticProps, InferGetStaticPropsType } from "next";
import Box from "@mui/material/Box";
import { Container, Link, List, ListItem, Paper } from "@mui/material";
import { getAllTournamentsList } from "@/api/api_methods";
import { TournamentListSchema } from "@/consts/tournamens/types";
import ListItemText from "@mui/material/ListItemText";
import { Key } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getTournamentDateString } from "@/utils/functions";
import ListItemButton from "@mui/material/ListItemButton";
import * as React from "react";

export const getStaticProps: GetStaticProps = async (context) => {
  const tournaments: TournamentListSchema[] = await getAllTournamentsList(
    context.locale ?? "pl"
  );

  return {
    props: {
      tournaments,
      ...(await serverSideTranslations(context.locale ?? "pl", [
        "tournaments",
        "common",
      ])),
    },
  };
};

export default function TournamentList(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Paper>
          <List>
            {data.tournaments.map((tournament: TournamentListSchema) => (
              <ListItem key={tournament.code}>
                <ListItemButton href={`/tournaments/${tournament.code}`}>
                  <ListItemText
                    primary={tournament.name}
                    secondary={getTournamentDateString(tournament)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}
