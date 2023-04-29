import {
  RegisteredPlayersSchema,
  TournamentResultSchema,
} from "@/consts/tournamens/types";
import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  Box,
  Paper,
  TableContainer,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ResultTable from "./ResultTable";
import useSWR from "swr";
import { tournamentResultsUrl } from "@/consts/api/urls";
import { useTranslation } from "react-i18next";

type Props = {
  tournament_code: string;
};

const TournamentResultsPanel: React.FC<Props> = ({ tournament_code }) => {
  const { i18n } = useTranslation("registration");
  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": i18n.language,
      },
      method: "GET",
    }).then((r) => r.json());

  const { data } = useSWR<TournamentResultSchema[]>(
    tournamentResultsUrl(tournament_code),
    fetcher
  );
  const results = data ?? [];
  return (
    <>
      <Box sx={{ m: 1, p: 1 }}>
        {results.map((result, index) => (
          <Accordion key={index} defaultExpanded={index === 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content"
              id="panel-header"
            >
              <Typography>{result.name}</Typography>
            </AccordionSummary>
            <TableContainer component={Paper}>
              <ResultTable result={result} id={"go-result-" + index} />
            </TableContainer>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default TournamentResultsPanel;
