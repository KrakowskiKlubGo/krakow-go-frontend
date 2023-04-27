import * as React from "react";
import { TournamentListSchema } from "@/consts/tournamens/types";
import { List, ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { getLocalizedMonthDateString } from "@/utils/functions";
import { useTranslation } from "next-i18next";

interface Props {
  tournaments: TournamentListSchema[];
}

const TournamentsList: React.FC<Props> = ({ tournaments }) => {
  const { i18n } = useTranslation("common");
  return (
    <List>
      {tournaments.map((tournament: TournamentListSchema) => (
        <ListItem key={tournament.code}>
          <ListItemButton href={`/tournaments/${tournament.code}`}>
            <ListItemText
              primary={tournament.name}
              secondary={getLocalizedMonthDateString(
                i18n.language,
                tournament.start_date,
                tournament.end_date
              )}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TournamentsList;
