export const serverUrl = "http://127.0.0.1:8000";
export const apiBaseUrl = "http://127.0.0.1:8000/api";

export const tournamentsListUrl = `${apiBaseUrl}/tournaments/`;
export const IncomingTournamentsListUrl = `${apiBaseUrl}/tournaments/?is_ended=false&is_draft=false`;
export const EndedTournamentsListUrl = `${apiBaseUrl}/tournaments/?is_ended=true&is_draft=false`;
export const tournamentDetailUrl = (code: string) =>
  `${apiBaseUrl}/tournaments/${code}/`;
export const tournamentRegistrationUrl = (code: string) =>
  `${apiBaseUrl}/tournaments/${code}/register-player/`;
export const meetingsListUrl = `${apiBaseUrl}/meetings/`;
export const meetingDetailUrl = (code: string) =>
  `${apiBaseUrl}/meetings/${code}/`;

export const captchaUrl = `${apiBaseUrl}/captcha/`;

export const EgdGetPlayerDataByPinUrl = (pin: string) =>
  `https://www.europeangodatabase.eu/EGD/GetPlayerDataByPIN.php?pin=${pin}`;

export const EgdGetPlayerDataByDataUrl = (last_name: string) =>
  `https://www.europeangodatabase.eu/EGD/GetPlayerDataByData.php?lastname=${last_name}`;
