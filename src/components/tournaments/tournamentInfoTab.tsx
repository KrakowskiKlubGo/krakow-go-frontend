import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import {
  TournamentInfoDetailListFields,
  TournamentInfoSchema,
} from "@/consts/tournamens/types";
import Box from "@mui/material/Box";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";
import { useTranslation } from "next-i18next";
import { getLocalizedDayOfWeekString } from "@/utils/functions";
interface Props {
  tournament_info: TournamentInfoSchema;
}

const TournamentInfoPanel: React.FC<Props> = ({ tournament_info }) => {
  const { t, i18n } = useTranslation("tournaments");
  const schedule_activities_dates = new Set(
    tournament_info.scheduled_activities.map((activity) => activity.date)
  );

  type TournamentInfoKeys = keyof TournamentInfoDetailListFields;

  const info_items: TournamentInfoKeys[] = [
    "organizer",
    "referee",
    "tournament_class",
    "rounds",
    "time_control",
    "rules_system",
    "komi",
    "game_rules",
    "handicap_rules",
    "fee",
    "prizes",
    "additional_info",
    "contact",
  ];
  return (
    <>
      <Box sx={{ m: 3, p: 1 }}>
        <Typography variant={"h6"}>{tournament_info.description}</Typography>
      </Box>

      <Box sx={{ m: 3, p: 1 }}>
        <Typography variant={"h5"}>{t("details_header")}</Typography>
        <List>
          {info_items.map((item) => (
            <ListItem key={item}>
              <ListItemText
                sx={{ whiteSpace: "pre-wrap" }}
                primary={t(item)}
                secondary={tournament_info[item]}
                primaryTypographyProps={{ variant: "h6" }}
                secondaryTypographyProps={{ variant: "body1" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ m: 3, p: 3 }}>
        <Typography variant={"h5"}>{t("address_header")}</Typography>
        <List>
          <ListItem>
            <Typography variant={"body1"} sx={{ whiteSpace: "pre-wrap" }}>
              {tournament_info.place}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant={"body1"} sx={{ whiteSpace: "pre-wrap" }}>
              {tournament_info.address}
            </Typography>
          </ListItem>
        </List>

        <iframe
          src={tournament_info.address_map_link}
          allowFullScreen={false}
          width={"100%"}
          height={"400"}
        ></iframe>
      </Box>

      <Box sx={{ m: 3, p: 3 }}>
        <Typography variant={"h5"}>{t("schedule_header")}</Typography>
        <List>
          {Array.from(schedule_activities_dates).map((date, index) => {
            return (
              <>
                <Typography>
                  {getLocalizedDayOfWeekString(i18n.language, date)}
                </Typography>
                <List>
                  {tournament_info.scheduled_activities.map((activity) => {
                    return (
                      activity.date === date && (
                        <ListItem key={`${activity.date}${activity.time}`}>
                          <ListItemAvatar>
                            <FiberManualRecordSharpIcon fontSize={"small"} />
                          </ListItemAvatar>
                          <ListItemText
                            secondary={activity.activity_name}
                            primary={activity.time}
                            primaryTypographyProps={{ variant: "h6" }}
                            secondaryTypographyProps={{ variant: "body1" }}
                          />
                        </ListItem>
                      )
                    );
                  })}
                </List>
              </>
            );
          })}
        </List>
      </Box>
    </>
  );
};

export default TournamentInfoPanel;
