import * as React from "react";
import { Box, CircularProgress } from "@mui/material";
import {
  RegisteredPlayersSchema,
  RegistrationInfoSchema,
} from "@/consts/tournamens/types";
import Typography from "@mui/material/Typography";
import PlayersTable from "@/components/tournaments/PlayersTable";
import useSWR from "swr";
import { tournamentRegisteredPlayersUrl } from "@/consts/api/urls";
import CenteredBox from "@/components/common/CenteredBox";
import { useTranslation } from "next-export-i18n";

interface Props {
  tournament_code: string;
  registration_info: RegistrationInfoSchema;
}

const RegisteredPlayersPanel: React.FC<Props> = ({
  registration_info,
  tournament_code,
}) => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data } = useSWR<RegisteredPlayersSchema[]>(
    tournamentRegisteredPlayersUrl(tournament_code),
    fetcher
  );
  const registered_players = data ?? [];
  const { t } = useTranslation();
  const players_list =
    registration_info.player_limit != null
      ? registered_players.slice(
          0,
          Math.min(registration_info.player_limit, registered_players.length)
        )
      : registered_players;
  const waiting_list =
    registration_info.player_limit != null
      ? registered_players.slice(
          registration_info.player_limit,
          registered_players.length
        )
      : [];
  return (
    <>
      <Box sx={{ m: 1, p: 1 }}>
        <Typography variant={"h4"}>
          {t("registration.registered_players_list")}
        </Typography>
        {!data ? (
          <CenteredBox>
            <CircularProgress color="inherit" />
          </CenteredBox>
        ) : (
          <>
            <PlayersTable players={players_list} />
            {waiting_list.length > 0 && (
              <Box sx={{ paddingTop: 3 }}>
                <Typography variant={"h4"}>
                  {t("registration.waiting_list")}
                </Typography>
                <PlayersTable players={waiting_list} />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default RegisteredPlayersPanel;
