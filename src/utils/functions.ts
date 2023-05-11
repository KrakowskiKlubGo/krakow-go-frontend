const replacePolishMonthNames = (date: string): string => {
  const regex =
    /(styczeń|luty|marzec|kwiecień|maj|czerwiec|lipiec|sierpień|wrzesień|październik|listopad|grudzień)/g;
  return date.replaceAll(regex, (match) => {
    switch (match) {
      case "styczeń":
        return "stycznia";
      case "luty":
        return "lutego";
      case "marzec":
        return "marca";
      case "kwiecień":
        return "kwietnia";
      case "maj":
        return "maja";
      case "czerwiec":
        return "czerwca";
      case "lipiec":
        return "lipca";
      case "sierpień":
        return "sierpnia";
      case "wrzesień":
        return "września";
      case "październik":
        return "października";
      case "listopad":
        return "listopada";
      case "grudzień":
        return "grudnia";
      default:
        return match;
    }
  });
};
export const getLocalizedMonthDateString = (
  locale: string,
  start_date_string: string,
  end_date_string: string | null = null
) => {
  let date_string;
  const start_date = new Date(start_date_string);

  if (end_date_string) {
    const end_date = new Date(end_date_string);
    date_string = "";
    if (start_date.getMonth() === end_date.getMonth()) {
      date_string = `${start_date.getDate()} - ${end_date.getDate()} ${start_date.toLocaleString(
        locale,
        {
          month: "long",
          year: "numeric",
        }
      )}`;
    } else if (start_date.getFullYear() === end_date.getFullYear()) {
      date_string = `${start_date.getDate()} ${start_date.toLocaleString(
        locale,
        {
          month: "long",
          year: "numeric",
        }
      )} - ${end_date.getDate()} ${end_date.toLocaleString(locale, {
        month: "long",
        year: "numeric",
      })} ${start_date.getFullYear()}`;
    }
  } else {
    date_string = `${start_date.getDate()} ${start_date.toLocaleString(locale, {
      month: "long",
      year: "numeric",
    })}`;
  }

  return replacePolishMonthNames(date_string);
};

export const getLocalizedDayOfWeekString = (
  locale: string,
  date: string
): string => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString(locale, { month: "long" });
  const weekday = dateObj.toLocaleString(locale, { weekday: "long" });

  return replacePolishMonthNames(`${dateObj.getDate()} ${month} (${weekday})`);
};
