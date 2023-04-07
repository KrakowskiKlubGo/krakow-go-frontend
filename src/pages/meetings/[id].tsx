import { GetStaticProps, InferGetStaticPropsType } from "next";

import Typography from "@mui/material/Typography";
import { Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import { apiBaseUrl, serverUrl } from "@/consts/api/urls";
import {
  MeetingDetailSchema,
  MeetingListSchema,
} from "@/consts/meetings/types";
import { getMeetingDetails, getMeetingsList } from "@/api/api_methods";
import { ParsedUrlQuery } from "querystring";
import { detailPageParams } from "@/consts/interfaces";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticPaths = async () => {
  const meetings: MeetingListSchema[] = await getMeetingsList("pl");

  const paths = meetings.map((meeting) => {
    return {
      params: { id: meeting.id.toString() },
    };
  });

  return {
    paths,

    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as detailPageParams;
  const meeting: MeetingDetailSchema = await getMeetingDetails(
    id,
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
  return (
    <>
      <Paper sx={{ m: 3, p: 3 }}>
        <Typography variant={"h5"}>{data.meeting.name}</Typography>
        <Typography variant={"body2"}>{data.meeting.date}</Typography>

        <Typography variant={"body2"}>
          {data.meeting.start_time}
          {data.meeting.end_time !== null && (
            <span> - {data.meeting.end_time}</span>
          )}
        </Typography>
        <Typography variant={"body2"}>{data.meeting.description}</Typography>

        <Typography variant={"h5"}>Adres: {data.meeting.address}</Typography>
        <iframe
          src={data.meeting.address_map_link}
          allowFullScreen={false}
          width={400}
          height={300}
        ></iframe>
      </Paper>
    </>
  );
}
