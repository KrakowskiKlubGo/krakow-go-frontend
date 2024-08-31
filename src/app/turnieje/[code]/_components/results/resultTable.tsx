"use client";

import * as React from "react";
import {
  TournamentResultSchema,
  TournamentResultType,
} from "@/consts/tournamens/types";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import GoResultsHighlighter from "@/utils/go_results_highlighter/lib/wrapper";

interface Props {
  result: TournamentResultSchema;
  id: string;
}

const fileFetcher = (url: string) =>
  fetch(url, {
    method: "GET",
  }).then((res) => res.text());

const ResultTable: React.FC<Props> = ({ result, id }) => {
  useEffect(() => {
    if (result.type == TournamentResultType.standings) {
      const results_table = document.getElementById(id);
      if (results_table) new GoResultsHighlighter(results_table);
    }
  });

  const { data } = useSWR(result.result_file, fileFetcher);
  if (data) {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, "text/html");
    const table = htmlDoc.querySelector("table");

    const headers_content = [];
    const rows_content = [];

    if (table) {
      const headers = table.getElementsByTagName("th");
      for (let i = 0; i < headers.length; i++) {
        headers_content.push(headers[i].textContent);
      }

      const rows = table.getElementsByTagName("tr");
      for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        let cells_content = [];
        for (let j = 0; j < cells.length; j++) {
          cells_content.push(cells[j].textContent);
        }
        rows_content.push(cells_content);
      }
    }

    return (
      <>
        <Table
          sx={{ minWidth: 500 }}
          aria-label="simple table"
          data-go-results
          id={id}
          size="small"
        >
          <TableHead>
            <TableRow>
              {headers_content.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows_content.map((row) => (
              <TableRow
                key={row[0]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row.map((cell, index) => (
                  <TableCell key={index}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }

  return <></>;
};

export default ResultTable;
