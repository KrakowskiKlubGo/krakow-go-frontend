import { GetStaticProps, InferGetStaticPropsType } from "next";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { TournamentListSchema } from "../../consts/tournamens/types";
import { getTournamentsList } from "@/api/api_methods";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const tournaments: TournamentListSchema[] = await getTournamentsList(
    locale ?? "pl"
  );

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
