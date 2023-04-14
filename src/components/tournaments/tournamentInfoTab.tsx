import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
} from "@mui/material";
import Image from "next/image";
import { apiBaseUrl, serverUrl } from "@/consts/api/urls";
import { TournamentInfoSchema } from "@/consts/tournamens/types";
import Box from "@mui/material/Box";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTranslation } from "next-i18next";
interface Props {
  tournament_info: TournamentInfoSchema;
}

const TournamentInfoPanel: React.FC<Props> = ({ tournament_info }) => {
  const { t } = useTranslation("tournaments");
  const schedule_activities_dates = new Set(
    tournament_info.scheduled_activities.map((activity) => activity.date)
  );
  return (
    <>
      <Box sx={{ m: 3, p: 1 }}>
        <Typography variant={"h4"}>{tournament_info.description}</Typography>
      </Box>

      <Box sx={{ m: 3, p: 1 }}>
        <Typography variant={"h5"}>{t("details_header")}</Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={t("organizer")}
              secondary={tournament_info.organizer}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={t("referee")}
              secondary={tournament_info.referee}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={t("tournament_class")}
              secondary={tournament_info.tournament_class}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={t("rounds")}
              secondary={tournament_info.rounds}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={t("time_control")}
              secondary={tournament_info.time_control}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={t("rules_system")}
              secondary={tournament_info.rules_system}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={t("game_rules")}
              secondary={tournament_info.game_rules}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{ whiteSpace: "pre-wrap" }}
              primary={t("handicap_rules")}
              secondary={tournament_info.handicap_rules}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{ whiteSpace: "pre-wrap" }}
              primary={t("fee")}
              secondary={tournament_info.fee}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{ whiteSpace: "pre-wrap" }}
              primary={t("prizes")}
              secondary={tournament_info.prizes}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{ whiteSpace: "pre-wrap" }}
              primary={t("additional_info")}
              secondary={tournament_info.additional_info}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{ whiteSpace: "pre-wrap" }}
              primary={t("contact")}
              secondary={tournament_info.contact}
            />
          </ListItem>
        </List>
      </Box>

      <Box sx={{ m: 3, p: 3 }}>
        <Typography variant={"h5"}>{t("address_header")}</Typography>
        <Typography variant={"body1"}>{tournament_info.place}</Typography>
        <Typography variant={"body1"}>{tournament_info.address}</Typography>
        <iframe
          src={tournament_info.address_map_link}
          allowFullScreen={false}
          width={"100%"}
          height={"400"}
        ></iframe>
      </Box>

      <Box sx={{ m: 3, p: 3 }}>
        <Typography variant={"h5"}>{t("schedule_header")}</Typography>
        {Array.from(schedule_activities_dates).map((date) => {
          return (
            <>
              <Typography>{date}</Typography>
              <List>
                {tournament_info.scheduled_activities.map((activity) => {
                  return (
                    activity.date === date && (
                      <ListItem>
                        <ListItemAvatar>
                          <FiberManualRecordSharpIcon fontSize={"small"} />
                        </ListItemAvatar>
                        <ListItemText
                          secondary={activity.activity_name}
                          primary={activity.time}
                        />
                      </ListItem>
                    )
                  );
                })}
              </List>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default TournamentInfoPanel;
