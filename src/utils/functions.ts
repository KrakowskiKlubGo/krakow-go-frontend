import {
  TournamentDetailSchema,
  TournamentListSchema,
} from "@/consts/tournamens/types";

export const getTournamentDateString = (
  tournament: TournamentDetailSchema | TournamentListSchema
) => {
  if (tournament.end_date) {
    return `${tournament.start_date} - ${tournament.end_date}`;
  }
  return tournament.start_date;
};
