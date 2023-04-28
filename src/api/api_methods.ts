import {
  EgdGetPlayerDataByDataUrl,
  EndedTournamentsListUrl,
  IncomingTournamentsListUrl,
  meetingDetailUrl,
  meetingsListUrl,
  tournamentDetailUrl,
  tournamentRegistrationUrl,
  tournamentsListUrl,
} from "@/consts/api/urls";
import { EgdPlayerDataSchema } from "@/consts/tournamens/types";

export const getDataFromBackend = async (api_url: string, locale: string) => {
  try {
    const response = await fetch(api_url, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
      method: "GET",
    });
    if (response.status === 200) {
      return response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const postDataToBackend = async (
  api_url: string,
  data: any,
  locale: string
) => {
  try {
    const response = await fetch(api_url, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.status === 200 || response.status === 201) {
      return result.message;
    } else {
      return result.non_field_errors[0];
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMeetingsList = async (locale: string) => {
  return getDataFromBackend(meetingsListUrl, locale);
};

export const getMeetingDetails = async (code: string, locale: string) => {
  return getDataFromBackend(meetingDetailUrl(code), locale);
};

export const getAllTournamentsList = async (locale: string) => {
  return getDataFromBackend(tournamentsListUrl, locale);
};

export const getIncomingTournamentsList = async (locale: string) => {
  return getDataFromBackend(IncomingTournamentsListUrl, locale);
};

export const getEndedTournamentsList = async (locale: string) => {
  return getDataFromBackend(EndedTournamentsListUrl, locale);
};

export const GetTournamentDetails = (code: string, locale: string) => {
  return getDataFromBackend(tournamentDetailUrl(code), locale);
};

export const registerPlayer = async (
  code: string,
  data: any,
  locale: string
) => {
  return postDataToBackend(tournamentRegistrationUrl(code), data, locale);
};

export const captchaFetcher = (url: string) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: null,
  }).then((res) => res.json());

export const EgdGetPlayerDataByData = async (last_name: string) => {
  try {
    const response = await fetch(EgdGetPlayerDataByDataUrl(last_name), {
      method: "GET",
    });

    if (response.status === 200) {
      const { data } = await response.json();
      console.log(data);
      if (data?.retcode == "Ok") {
        console.log("api players: " + data?.players);
        return data?.players as EgdPlayerDataSchema[];
      } else {
        return [];
      }
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
