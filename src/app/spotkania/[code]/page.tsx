import { MeetingListSchema } from "@/consts/meetings/types";
import { getMeetingDetails, getMeetingsList } from "@/api/api_methods";
import MeetingDetail from "@/app/spotkania/_components/meetingDetail";
import React, { Suspense } from "react";

export async function generateStaticParams() {
  const meetings: MeetingListSchema[] = await getMeetingsList("pl");

  return meetings.flatMap((meeting) => {
    return {
      code: meeting.code,
    };
  });
}

export default async function Page({ params }: { params: { code: string } }) {
  const meeting_localized_data = {
    pl: await getMeetingDetails(params.code, "pl"),
    en: await getMeetingDetails(params.code, "en"),
  };
  return (
    <Suspense>
      <MeetingDetail meeting_localized_data={meeting_localized_data} />;
    </Suspense>
  );
}
