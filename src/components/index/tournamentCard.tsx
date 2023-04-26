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
  const { i18n, t } = useTranslation("common");
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom>{tournament.name}</Typography>
        <br></br>
        <Typography variant="body1">
          {getLocalizedDateString(
            i18n.language,
            tournament.start_date,
            tournament.end_date
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" href={`/tournaments/${tournament.code}`}>
          {t("details_button_text")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default TournamentCard;
