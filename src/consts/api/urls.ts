export const serverUrl = "http://127.0.0.1:8000";
export const apiBaseUrl = "http://127.0.0.1:8000/api";

export const tournamentsListUrl = `${apiBaseUrl}/tournaments/`;
export const tournamentDetailUrl = (id: number) =>
  `${apiBaseUrl}/tournaments/${id}/`;
export const tournamentRegistrationUrl = (id: number) =>
  `${apiBaseUrl}/tournaments/${id}/register-player/`;
