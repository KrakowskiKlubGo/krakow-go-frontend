"use client";

import Typography from "@mui/material/Typography";
import { Container, Paper } from "@mui/material";
import React from "react";
import CenteredBox from "@/components/CenteredBox";
import { getLocalizedMonthDateString } from "@/utils/functions";
import { useSelectedLanguage } from "next-export-i18n";

export default function MeetingDetail({ meeting_localized_data }: any) {
  const { lang } = useSelectedLanguage();
  const meeting = meeting_localized_data[lang];

  return (
    <>
      <Container>
        <CenteredBox>
          <Paper sx={{ m: 3, p: 3 }}>
            <Typography variant={"h5"}>{meeting.name}</Typography>
            <Typography variant={"body1"}>
              {getLocalizedMonthDateString(lang, meeting.date)}
            </Typography>

            <Typography variant={"body1"} paddingBottom={"1rem"}>
              {meeting.start_time}
              {meeting.end_time !== null && <span> - {meeting.end_time}</span>}
            </Typography>
            <Typography variant={"body1"} paddingBottom={"2rem"}>
              {meeting.description}
            </Typography>

            <Typography variant={"h5"}>{meeting.address}</Typography>
            <iframe
              src={meeting.address_map_link}
              allowFullScreen={false}
              width={"100%"}
              height={300}
            ></iframe>
          </Paper>
        </CenteredBox>
      </Container>
    </>
  );
}
