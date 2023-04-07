import * as React from "react";
import Button from "@mui/material/Button";
import AddAdvertiserFormFields from "./RegistrationFormFields";
import { Paper } from "@mui/material";
import { RegistrationInfoSchema } from "@/consts/tournamens/types";
import { registerPlayer } from "@/api/api_methods";

interface Props {
  registration_info: RegistrationInfoSchema;
}

const RegistrationForm: React.FC<Props> = ({ registration_info }) => {
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    tournament_id: number
  ) => {
    event.preventDefault();
    const target = event.currentTarget;
    const data = {
      first_name: target.first_name.value,
      last_name: target.last_name.value,
      rank: target.rank.value,
      city_club: target.city_club.value,
      country: target.country.value,
      egf_pid: target.egf_pid.value,
    };
    return await registerPlayer(tournament_id, data);
  };
  return (
    <>
      <Paper
        sx={{
          "& .MuiTextField-root": { m: 2, width: "25ch" },
        }}
      >
        <form
          onSubmit={(event) =>
            handleSubmit(event, registration_info.tournament_id)
          }
        >
          <AddAdvertiserFormFields registration_info={registration_info} />
          <Button type="submit">Zarejestruj</Button>
        </form>
      </Paper>
    </>
  );
};

export default RegistrationForm;
