import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import Typography from "@mui/material/Typography";
import { Container, Paper } from "@mui/material";
import React from "react";
import {
  MeetingDetailSchema,
  MeetingListSchema,
} from "@/consts/meetings/types";
import { getMeetingDetails, getMeetingsList } from "@/api/api_methods";
import { detailPageParams } from "@/consts/interfaces";
import CenteredBox from "@/components/common/CenteredBox";
import { getLocalizedMonthDateString } from "@/utils/functions";
import { useSelectedLanguage } from "next-export-i18n";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const meetings: MeetingListSchema[] = await getMeetingsList("pl");

  const paths = meetings.flatMap((meeting) => {
    return {
      params: { code: meeting.code },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { code } = context.params as detailPageParams;
  const meeting_pl: MeetingDetailSchema = await getMeetingDetails(code, "pl");
  const meeting_en: MeetingDetailSchema = await getMeetingDetails(code, "en");

  return {
    props: {
      meeting_pl,
      meeting_en,
    },
  };
};

export default function MeetingDetail(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { lang } = useSelectedLanguage();
  const meeting = lang === "pl" ? data.meeting_pl : data.meeting_en;

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
