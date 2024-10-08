"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MeetingListSchema } from "@/consts/meetings/types";
import { getLocalizedMonthDateString } from "@/utils/functions";
import { useSelectedLanguage, useTranslation } from "next-export-i18n";

interface Props {
  meeting: MeetingListSchema;
}

const MeetingCard: React.FC<Props> = ({ meeting }) => {
  const { t } = useTranslation();
  const { lang } = useSelectedLanguage();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom>{meeting.name}</Typography>
        <Typography variant="body1" component="div">
          {getLocalizedMonthDateString(lang, meeting.date)}
        </Typography>
        <Typography variant="body1">
          {meeting.start_time}
          {meeting.end_time !== null && <span> - {meeting.end_time}</span>}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          href={`/spotkania/${meeting.code}/?${lang}`}
          variant="contained"
        >
          {t("common.details_button_text")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MeetingCard;
