import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getLocalizedMonthDateString } from "@/utils/functions";
import { TournamentListSchema } from "@/consts/tournamens/types";
import {
  useLanguageQuery,
  useSelectedLanguage,
  useTranslation,
} from "next-export-i18n";
import querystring from "querystring";

interface Props {
  tournament: TournamentListSchema;
}

const TournamentCard: React.FC<Props> = ({ tournament }) => {
  const { t } = useTranslation();
  const { lang } = useSelectedLanguage();
  const [query] = useLanguageQuery();
  const queryString = querystring.stringify(query);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom>{tournament.name}</Typography>
        <br></br>
        <Typography variant="body1">
          {getLocalizedMonthDateString(
            lang,
            tournament.start_date,
            tournament.end_date
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          href={`/turnieje/${tournament.code}/?${queryString}`}
        >
          {t("common.details_button_text")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default TournamentCard;
