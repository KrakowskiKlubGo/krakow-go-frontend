import { getTournamentsList } from "@/api/api_methods";
import * as React from "react";
import Tournaments from "@/app/turnieje/_components/tournaments";
import { Suspense } from "react";
import MeetingDetail from "@/app/spotkania/_components/meetingDetail";

export default async function Page() {
  const tournaments_data = {
    pl: await getTournamentsList("pl"),
    en: await getTournamentsList("en"),
  };

  return (
    <Suspense>
      <Tournaments localized_tournaments_dict={tournaments_data} />;
    </Suspense>
  );
}
