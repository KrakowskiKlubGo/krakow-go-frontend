import {
  captchaUrl,
  meetingDetailUrl,
  meetingsListUrl,
  tournamentDetailUrl,
  tournamentRegistrationUrl,
  tournamentsListUrl,
} from "@/consts/api/urls";

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

export const postDataToBackend = async (api_url: string, data: any) => {
  try {
    const response = await fetch(api_url, {
      headers: {
        "Content-Type": "application/json",
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

export const getMeetingDetails = async (id: string, locale: string) => {
  return getDataFromBackend(meetingDetailUrl(id), locale);
};

export const getTournamentsList = async (locale: string) => {
  return getDataFromBackend(tournamentsListUrl, locale);
};

export const GetTournamentDetails = (id: string, locale: string) => {
  return getDataFromBackend(tournamentDetailUrl(id), locale);
};

export const registerPlayer = async (id: number, data: any) => {
  return postDataToBackend(tournamentRegistrationUrl(id), data);
};
