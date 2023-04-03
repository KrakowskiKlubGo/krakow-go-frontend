import * as React from "react";
import Typography from "@mui/material/Typography";
import { Paper, Tab } from "@mui/material";
import Image from "next/image";
import { apiBaseUrl, serverUrl } from "@/consts/api/urls";
import { TournamentInfoSchema } from "@/consts/tournamens/types";

interface Props {
  tournament_info: TournamentInfoSchema;
}

const TournamentInfoPanel: React.FC<Props> = ({ tournament_info }) => {
  return (
    <>
      <Paper sx={{ m: 3, p: 3 }}>
        <Image
          alt=""
          src={`${serverUrl}${tournament_info.image}`}
          width={300}
          height={269}
        />
        <Typography variant={"h5"}>{tournament_info.name}</Typography>

        <Typography variant={"body2"}>
          {tournament_info.start_date}
          {tournament_info.end_date !== null && (
            <span> - {tournament_info.end_date}</span>
          )}
        </Typography>
        <Typography variant={"body2"}>{tournament_info.description}</Typography>
      </Paper>

      <Paper sx={{ m: 3, p: 3 }}>
        <Typography variant={"h5"}>
          Addres: {tournament_info.address}
        </Typography>
        <iframe
          src={tournament_info.address_map_link}
          allowFullScreen={false}
          width={400}
          height={300}
        ></iframe>
      </Paper>
    </>
  );
};

export default TournamentInfoPanel;
