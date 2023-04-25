import {
  TournamentDetailSchema,
  TournamentListSchema,
} from "@/consts/tournamens/types";

export const getLocalizedDateString = (
  locale: string,
  start_date_string: string,
  end_date_string: string | null = null
) => {
  const start_date = new Date(start_date_string);

  if (end_date_string) {
    const end_date = new Date(end_date_string);

    if (start_date.getMonth() === end_date.getMonth()) {
      return `${start_date.getDate()} - ${end_date.getDate()} ${start_date.toLocaleString(
        locale,
        {
          month: "long",
          year: "numeric",
        }
      )}`;
    } else if (start_date.getFullYear() === end_date.getFullYear()) {
      return `${start_date.getDate()} ${start_date.toLocaleString(locale, {
        month: "long",
        year: "numeric",
      })} - ${end_date.getDate()} ${end_date.toLocaleString(locale, {
        month: "long",
        year: "numeric",
      })} ${start_date.getFullYear()}`;
    }
  }
  return `${start_date.getDate()} ${start_date.toLocaleString(locale, {
    month: "long",
    year: "numeric",
  })}`;
};
