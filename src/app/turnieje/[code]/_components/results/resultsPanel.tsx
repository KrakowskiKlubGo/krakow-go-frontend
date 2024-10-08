"use client";

import { TournamentResultSchema } from "@/consts/tournamens/types";
import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  Box,
  CircularProgress,
  Paper,
  TableContainer,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ResultTable from "./resultTable";
import useSWR from "swr";
import { tournamentResultsUrl } from "@/consts/api/urls";
import CenteredBox from "@/components/CenteredBox";
import { useSelectedLanguage, useTranslation } from "next-export-i18n";

type Props = {
  tournament_code: string;
};

const ResultsPanel: React.FC<Props> = ({ tournament_code }) => {
  const { lang } = useSelectedLanguage();
  const { t } = useTranslation();
  const fetcher = (url: string) =>
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      method: "GET",
    }).then((r) => r.json());

  const { data } = useSWR<TournamentResultSchema[]>(
    tournamentResultsUrl(tournament_code),
    fetcher,
  );
  const results = data ?? [];
  return (
    <>
      <Box sx={{ m: 1, p: 1 }}>
        {!data ? (
          <CenteredBox>
            <CircularProgress color="inherit" />
          </CenteredBox>
        ) : (
          <>
            {results.length > 0 ? (
              <>
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
              </>
            ) : (
              <Paper>
                <CenteredBox>
                  <Typography variant={"h4"}>
                    {t("tournaments.results_not_available")}
                  </Typography>
                </CenteredBox>
              </Paper>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default ResultsPanel;
