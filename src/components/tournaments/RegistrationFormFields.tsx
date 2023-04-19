import { FormControl, MenuItem, TextField } from "@mui/material";
import { ranks, RegistrationInfoSchema } from "@/consts/tournamens/types";
import { useTranslation } from "next-i18next";
import Button from "@mui/material/Button";
import * as React from "react";

interface Props {
  registration_info: RegistrationInfoSchema;
}

const AddPlayerFormFields: React.FC<Props> = ({ registration_info }) => {
  const { t } = useTranslation("registration");
  return (
    <>
      <TextField
        required
        id="last_name"
        label={t("last_name")}
        defaultValue=""
      />
      <TextField
        required
        id="first_name"
        label={t("first_name")}
        defaultValue=""
      />
      <TextField
        required
        select
        id="rank"
        label={t("rank")}
        defaultValue="1k"
        SelectProps={{
          native: true,
        }}
      >
        {ranks.map((rank) => (
          <option key={rank.value} value={rank.value}>
            {rank.label}
          </option>
        ))}
      </TextField>
      <TextField
        required
        id="city_club"
        label={t("club_city")}
        defaultValue=""
      />
      <TextField required id="country" label={t("country")} defaultValue="" />
      <TextField id="egf_pid" label="EGF PID" defaultValue="" />
    </>
  );
};

export default AddPlayerFormFields;
