import { getMeetingsList, getTournamentsList } from "@/api/api_methods";
import { get_incoming_tournaments } from "@/utils/functions";
import Home from "@/app/_components/home";
import { Suspense } from "react";
export default async function Page() {
  const home_page_data = {
    pl: {
      tournaments: get_incoming_tournaments(await getTournamentsList("pl")),
      meetings: await getMeetingsList("pl"),
    },
    en: {
      tournaments: get_incoming_tournaments(await getTournamentsList("en")),
      meetings: await getMeetingsList("en"),
    },
  };

  return (
    <Suspense>
      <Home data={home_page_data} />;
    </Suspense>
  );
}
