import { GetStaticProps, InferGetStaticPropsType } from "next";

import Typography from "@mui/material/Typography";
import { Container, Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import {
  MeetingDetailSchema,
  MeetingListSchema,
} from "@/consts/meetings/types";
import { getMeetingDetails, getMeetingsList } from "@/api/api_methods";
import { detailPageParams } from "@/consts/interfaces";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CenteredBox from "@/components/common/CenteredBox";
import { getLocalizedMonthDateString } from "@/utils/functions";
import { useTranslation } from "next-i18next";

export const getStaticPaths = async () => {
  const meetings: MeetingListSchema[] = await getMeetingsList("pl");

  const paths = meetings.map((meeting) => {
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
  const meeting: MeetingDetailSchema = await getMeetingDetails(
    code,
    context.locale ?? "pl"
  );

  return {
    props: {
      meeting,
      ...(await serverSideTranslations(context.locale ?? "pl", ["common"])),
    },
  };
};

export default function MeetingDetail(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { i18n } = useTranslation("common");

  return (
    <>
      <Container>
        <CenteredBox>
          <Paper sx={{ m: 3, p: 3 }}>
            <Typography variant={"h5"}>{data.meeting.name}</Typography>
            <Typography variant={"body1"}>
              {getLocalizedMonthDateString(i18n.language, data.meeting.date)}
            </Typography>

            <Typography variant={"body1"} paddingBottom={"1rem"}>
              {data.meeting.start_time}
              {data.meeting.end_time !== null && (
                <span> - {data.meeting.end_time}</span>
              )}
            </Typography>
            <Typography variant={"body1"} paddingBottom={"2rem"}>
              {data.meeting.description}
            </Typography>

            <Typography variant={"h5"}>{data.meeting.address}</Typography>
            <iframe
              src={data.meeting.address_map_link}
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
