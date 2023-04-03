import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Typography from "@mui/material/Typography";
import { Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import { apiBaseUrl, serverUrl } from "@/consts/api/urls";
import { MeetingDetailSchema } from "@/consts/meetings/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // @ts-ignore
  const id = context.params.id;
  const response = await fetch(`${apiBaseUrl}/meetings/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const meeting: MeetingDetailSchema = await response.json();

  return {
    props: {
      meeting,
    },
  };
};

export default function MeetingDetail(
  data: InferGetServerSidePropsType<typeof getServerSideProps>
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

        <Typography variant={"h5"}>Addres: {data.meeting.address}</Typography>
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
