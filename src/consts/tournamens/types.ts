export type TournamentListSchema = {
  code: string;
  name: string;
  start_date: string;
  end_date: string;
};

export type ScheduleActivitySchema = {
  date: string;
  time: string;
  activity_name: string;
};

export type TournamentInfoSchema = {
  place: string;
  is_draft: boolean;
  is_ended: boolean;
  organizer: string;
  referee: string;
  description: string;
  additional_info: string;
  address: string;
  address_map_link: string;
  prizes: string;
  fee: string;
  game_rules: string;
  komi: string;
  rules_system: string;
  tournament_class: string;
  rounds: number;
  handicap_rules: string;
  time_control: string;
  scheduled_activities: ScheduleActivitySchema[];
  contact: string;
};

export type TournamentInfoDetailListFields = Pick<
  TournamentInfoSchema,
  | "organizer"
  | "referee"
  | "additional_info"
  | "prizes"
  | "fee"
  | "game_rules"
  | "komi"
  | "rules_system"
  | "tournament_class"
  | "rounds"
  | "handicap_rules"
  | "time_control"
  | "contact"
>;

export type RegistrationInfoSchema = {
  end_date: string | null;
  player_limit: number | null;
  registered_players: number;
  description: string | null;
  email_required: boolean;
};

export type RegisteredPlayersSchema = {
  first_name: string;
  last_name: string;
  timestamp: string;
  rank: string;
  city_club: string;
  country: string;
  is_paid: boolean;
  egf_pid: string;
};

export enum TournamentResultType {
  game_list = "game_list",
  players_list = "players_list",
  standings = "standings",
}

export type TournamentResultSchema = {
  name: string;
  type: TournamentResultType;
  result_file: string;
  timestamp: string;
};

export type TournamentDetailSchema = {
  code: string;
  name: string;
  image: string;
  start_date: string;
  end_date: string;
  tournament_info: TournamentInfoSchema;
  registration_info: RegistrationInfoSchema;
};

export type PlayerRegistrationFormSchema = {
  first_name: string;
  last_name: string;
  rank: string;
  city_club: string;
  country: string;
  egf_pid: string;
  email: string;
  phone: string;
  captcha_key: string | null;
  captcha_value: string;
};

export type CaptchaSchema = {
  captcha_key: string;
  captcha_image: string;
  image_type: string;
  image_decode: string;
};

export type EgdPlayerDataSchema = {
  Pin_Player: string;
  Last_Name: string;
  Name: string;
  Country_Code: string;
  Club: string;
  Grade: string;
};

export const ranks = [
  { value: "30k", label: "30 kyu" },
  { value: "29k", label: "29 kyu" },
  { value: "28k", label: "28 kyu" },
  { value: "27k", label: "27 kyu" },
  { value: "26k", label: "26 kyu" },
  { value: "25k", label: "25 kyu" },
  { value: "24k", label: "24 kyu" },
  { value: "23k", label: "23 kyu" },
  { value: "22k", label: "22 kyu" },
  { value: "21k", label: "21 kyu" },
  { value: "20k", label: "20 kyu" },
  { value: "19k", label: "19 kyu" },
  { value: "18k", label: "18 kyu" },
  { value: "17k", label: "17 kyu" },
  { value: "16k", label: "16 kyu" },
  { value: "15k", label: "15 kyu" },
  { value: "14k", label: "14 kyu" },
  { value: "13k", label: "13 kyu" },
  { value: "12k", label: "12 kyu" },
  { value: "11k", label: "11 kyu" },
  { value: "10k", label: "10 kyu" },
  { value: "9k", label: "9 kyu" },
  { value: "8k", label: "8 kyu" },
  { value: "7k", label: "7 kyu" },
  { value: "6k", label: "6 kyu" },
  { value: "5k", label: "5 kyu" },
  { value: "4k", label: "4 kyu" },
  { value: "3k", label: "3 kyu" },
  { value: "2k", label: "2 kyu" },
  { value: "1k", label: "1 kyu" },
  { value: "1d", label: "1 dan" },
  { value: "2d", label: "2 dan" },
  { value: "3d", label: "3 dan" },
  { value: "4d", label: "4 dan" },
  { value: "5d", label: "5 dan" },
  { value: "6d", label: "6 dan" },
  { value: "7d", label: "7 dan" },
  { value: "8d", label: "8 dan" },
  { value: "9d", label: "9 dan" },
  { value: "1p", label: "1 pro" },
  { value: "2p", label: "2 pro" },
  { value: "3p", label: "3 pro" },
  { value: "4p", label: "4 pro" },
  { value: "5p", label: "5 pro" },
  { value: "6p", label: "6 pro" },
  { value: "7p", label: "7 pro" },
  { value: "8p", label: "8 pro" },
  { value: "9p", label: "9 pro" },
];
