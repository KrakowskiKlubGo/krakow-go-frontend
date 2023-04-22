import { TournamentResultSchema } from "@/consts/tournamens/types";
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

interface Props {
  results: TournamentResultSchema[];
}

const TournamentResultsPanel: React.FC<Props> = ({ results }) => {
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
