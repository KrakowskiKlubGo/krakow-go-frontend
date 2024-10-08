import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getLocalizedMonthDateString } from "@/utils/functions";
import { TournamentListSchema } from "@/consts/tournamens/types";
import {
  LinkWithLocale,
  useSelectedLanguage,
  useTranslation,
} from "next-export-i18n";

interface Props {
  tournament: TournamentListSchema;
}

const TournamentCard: React.FC<Props> = ({ tournament }) => {
  const { t } = useTranslation();
  const { lang } = useSelectedLanguage();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom>{tournament.name}</Typography>
        <br></br>
        <Typography variant="body1">
          {getLocalizedMonthDateString(
            lang,
            tournament.start_date,
            tournament.end_date,
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <LinkWithLocale
          variant="contained"
          href={t("/turnieje/${tournament.code}/")}
        >
          {t("common.details_button_text")}
        </LinkWithLocale>
      </CardActions>
    </Card>
  );
};

export default TournamentCard;
