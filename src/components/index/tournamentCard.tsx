import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getLocalizedDateString } from "@/utils/functions";
import { TournamentListSchema } from "@/consts/tournamens/types";
import { useTranslation } from "next-i18next";

interface Props {
  tournament: TournamentListSchema;
}

const TournamentCard: React.FC<Props> = ({ tournament }) => {
  const { i18n } = useTranslation("common");
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          {tournament.name}
        </Typography>
        <Typography variant="h5"></Typography>
        <Typography variant="body2">
          {getLocalizedDateString(
            i18n.language,
            tournament.start_date,
            tournament.end_date
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" href={`/tournaments/${tournament.code}`}>
          Szczegóły
        </Button>
      </CardActions>
    </Card>
  );
};

export default TournamentCard;
