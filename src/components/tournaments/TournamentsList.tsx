import * as React from "react";
import { TournamentListSchema } from "@/consts/tournamens/types";
import { List, ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { getLocalizedMonthDateString } from "@/utils/functions";
import { useLanguageQuery, useSelectedLanguage } from "next-export-i18n";
import * as querystring from "querystring";

interface Props {
  tournaments: TournamentListSchema[];
}

const TournamentsList: React.FC<Props> = ({ tournaments }) => {
  const { lang } = useSelectedLanguage();
  const [query] = useLanguageQuery();
  const queryString = querystring.stringify(query);

  return (
    <List>
      {tournaments.map((tournament: TournamentListSchema) => (
        <ListItem key={tournament.code}>
          <ListItemButton href={`/turnieje/${tournament.code}?${queryString}`}>
            <ListItemText
              primary={tournament.name}
              secondary={getLocalizedMonthDateString(
                lang,
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
