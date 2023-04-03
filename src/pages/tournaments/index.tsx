import { GetStaticProps, InferGetStaticPropsType } from "next";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { apiBaseUrl } from "@/consts/api/urls";
import { TournamentListSchema } from "../../consts/tournamens/types";

export const getStaticProps: GetStaticProps = async () => {
  const tournaments_response = await fetch(`${apiBaseUrl}/tournaments/`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const tournaments: TournamentListSchema[] = await tournaments_response.json();

  return {
    props: {
      tournaments,
    },
  };
};

export default function TournamentList(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper>Chuj ci na matule</Paper>
    </Box>
  );
}
