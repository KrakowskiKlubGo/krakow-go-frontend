import * as React from "react";
import {
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { RegisteredPlayersSchema } from "@/consts/tournamens/types";
import { useTranslation } from "next-i18next";

interface Props {
  registered_players: RegisteredPlayersSchema[];
}

const RegisteredPlayersPanel: React.FC<Props> = ({ registered_players }) => {
  const { t } = useTranslation("registration");
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">{t("order")}</TableCell>
              <TableCell align="right">{t("name")}</TableCell>
              <TableCell align="right">{t("rank")}</TableCell>
              <TableCell align="right">{t("country")}</TableCell>
              <TableCell align="right">{t("club_city")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registered_players.map((player, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="right">
                  {player.first_name} {player.last_name}
                </TableCell>
                <TableCell align="right">{player.rank}</TableCell>
                <TableCell align="right">{player.country}</TableCell>
                <TableCell align="right">{player.city_club}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RegisteredPlayersPanel;
