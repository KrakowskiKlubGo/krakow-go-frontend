import * as React from "react";
import { Box } from "@mui/material";
import {
  RegisteredPlayersSchema,
  RegistrationInfoSchema,
} from "@/consts/tournamens/types";
import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";
import PlayersTable from "@/components/tournaments/PlayersTable";

interface Props {
  registered_players: RegisteredPlayersSchema[];
  registration_info: RegistrationInfoSchema;
}

const RegisteredPlayersPanel: React.FC<Props> = ({
  registered_players,
  registration_info,
}) => {
  const { t } = useTranslation("registration");
  const players_list = registered_players.slice(
    0,
    Math.min(registration_info.player_limit, registered_players.length)
  );
  const waiting_list = registered_players.slice(
    registration_info.player_limit,
    registered_players.length
  );

  return (
    <>
      <Box sx={{ m: 1, p: 1 }}>
        <Typography variant={"h4"}>{t("registered_players_list")}</Typography>
        <PlayersTable players={players_list} />
        {waiting_list.length > 0 && (
          <Box sx={{ paddingTop: 3 }}>
            <Typography variant={"h4"}>{t("waiting_list")}</Typography>
            <PlayersTable players={waiting_list} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default RegisteredPlayersPanel;
