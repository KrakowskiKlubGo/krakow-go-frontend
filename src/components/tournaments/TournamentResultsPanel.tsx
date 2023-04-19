import { TournamentResultSchema } from "@/consts/tournamens/types";
import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  TableContainer,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useSWR from "swr";
import parse from "html-react-parser";
import ResultTable from "./ResultTable";

interface Props {
  results: TournamentResultSchema[];
}

const TournamentResultsPanel: React.FC<Props> = ({ results }) => {
  return (
    <>
      <Box sx={{ m: 1, p: 1 }}>
        {results.map((result, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content"
              id="panel-header"
            >
              <Typography>{result.name}</Typography>
            </AccordionSummary>
            <TableContainer component={Paper}>
              <ResultTable result={result} />
            </TableContainer>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default TournamentResultsPanel;
