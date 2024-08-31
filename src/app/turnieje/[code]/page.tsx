import { getAllTournamentsList, GetTournamentDetails } from "@/api/api_methods";
import { TournamentListSchema } from "@/consts/tournamens/types";
import TournamentDetail from "@/app/turnieje/[code]/_components/tournamentDetail";
import { Suspense } from "react";

export async function generateStaticParams() {
  const tournaments: TournamentListSchema[] = await getAllTournamentsList("pl");

  return tournaments.flatMap((tournament) => {
    return {
      code: tournament.code,
    };
  });
}

export default async function Page({ params }: { params: { code: string } }) {
  const tournament_localized_data = {
    pl: await GetTournamentDetails(params.code, "pl"),
    en: await GetTournamentDetails(params.code, "en"),
  };
  return (
    <Suspense>
      <TournamentDetail tournament_localized_data={tournament_localized_data} />
    </Suspense>
  );
}
