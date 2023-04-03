import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import MainAppBar from "../components/navigation/main_navigation";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Typography from "@mui/material/Typography";
import MeetingCard, {
  MeetingListSchema,
} from "../components/index/meetingCard";
import { apiBaseUrl } from "@/consts/api/urls";
import { TournamentListSchema } from "@/consts/tournamens/types";
import TournamentCard from "@/components/index/tournamentCard";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps: GetStaticProps = async () => {
  const tournaments_response = await await fetch(`${apiBaseUrl}/tournaments/`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const tournaments: TournamentListSchema[] = await tournaments_response.json();

  const meetings_response = await await fetch(`${apiBaseUrl}/meetings/`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const meetings: MeetingListSchema[] = await meetings_response.json();

  return {
    props: {
      tournaments,
      meetings,
    },
  };
};

export default function Home(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Image
            src="/dragon_small.png"
            alt={"Krakowski Klub Go"}
            width={300}
            height={269}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Typography>Najbliższy turniej</Typography>
            {data.tournaments.map((tournament: TournamentListSchema) => (
              <TournamentCard tournament={tournament} key={tournament.id} />
            ))}

            <Typography>Najbliższe spotkanie</Typography>
            {data.meetings.map((meeting: MeetingListSchema) => (
              <MeetingCard meeting={meeting} key={meeting.id} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
