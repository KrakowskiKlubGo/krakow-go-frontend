import {
  CaptchaSchema,
  RegisteredPlayersSchema,
  RegistrationInfoSchema,
  TournamentResultSchema,
} from "@/consts/tournamens/types";
import * as React from "react";
import { useTranslation } from "next-i18next";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import PlayersTable from "@/components/tournaments/PlayersTable";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useSWR from "swr";
import parse from "html-react-parser";

interface Props {
  results: TournamentResultSchema[];
}

const fileFetcher = (url: string) =>
  fetch(url, {
    method: "GET",
  }).then((res) => res.text());

const TournamentResultsPanel: React.FC<Props> = ({ results }) => {
  const { data } = useSWR(results[0].result_file, fileFetcher);
  console.log(data);
  return (
    <>
      <Box sx={{ m: 1, p: 1 }}>
        {results.map((result, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{result.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>{data && parse(data)}</AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default TournamentResultsPanel;
