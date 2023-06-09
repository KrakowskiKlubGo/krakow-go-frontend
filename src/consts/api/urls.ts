import * as process from "process";

export const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

export const tournamentsListUrl = `${apiBaseUrl}/tournaments/`;
export const IncomingTournamentsListUrl = `${apiBaseUrl}/tournaments/?is_ended=false&is_draft=false`;
export const EndedTournamentsListUrl = `${apiBaseUrl}/tournaments/?is_ended=true&is_draft=false`;
export const tournamentDetailUrl = (code: string) =>
  `${apiBaseUrl}/tournaments/${code}/`;
export const tournamentRegistrationUrl = (code: string) =>
  `${apiBaseUrl}/tournaments/${code}/register-player/`;

export const tournamentRegisteredPlayersUrl = (code: string) =>
  `${apiBaseUrl}/tournaments/${code}/registered-players/`;

export const tournamentResultsUrl = (code: string) =>
  `${apiBaseUrl}/tournaments/${code}/results/`;
export const meetingsListUrl = `${apiBaseUrl}/meetings/`;
export const meetingDetailUrl = (code: string) =>
  `${apiBaseUrl}/meetings/${code}/`;

export const articleListUrl = `${apiBaseUrl}/articles/`;
export const articleDetailUrl = (code: string) =>
  `${apiBaseUrl}/articles/${code}/`;

export const captchaUrl = `${apiBaseUrl}/captcha/`;

export const EgdGetPlayerDataByDataUrl = (last_name: string) =>
  `https://www.europeangodatabase.eu/EGD/GetPlayerDataByData.php?lastname=${last_name}`;
