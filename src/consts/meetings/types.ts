export type MeetingListSchema = {
  id: number;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  address: string;
};

export type MeetingDetailSchema = {
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  address: string;
  participants_count: number;
  address_map_link: string;
  description: string;
};
