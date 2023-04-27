import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MeetingListSchema } from "@/consts/meetings/types";
import { useTranslation } from "next-i18next";
import { getLocalizedMonthDateString } from "@/utils/functions";

interface Props {
  meeting: MeetingListSchema;
}

const MeetingCard: React.FC<Props> = ({ meeting }) => {
  const { i18n, t } = useTranslation("common");
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom>{meeting.name}</Typography>
        <Typography variant="body1" component="div">
          {getLocalizedMonthDateString(i18n.language, meeting.date)}
        </Typography>
        <Typography variant="body1">
          {meeting.start_time}
          {meeting.end_time !== null && <span> - {meeting.end_time}</span>}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`/meetings/${meeting.code}`} variant="contained">
          {t("details_button_text")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MeetingCard;
