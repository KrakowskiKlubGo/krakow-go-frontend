import * as React from "react";
import Button from "@mui/material/Button";
import AddAdvertiserFormFields from "./RegistrationFormFields";
import { Paper } from "@mui/material";
import {
  PlayerRegistrationFormSchema,
  RegisteredPlayersSchema,
  RegistrationInfoSchema,
} from "@/consts/tournamens/types";
import { tournamentRegistrationUrl } from "@/consts/api/urls";

interface Props {
  registration_info: RegistrationInfoSchema;
}

const RegistrationForm: React.FC<Props> = ({ registration_info }) => {
  // Handles the submit event on form submit.
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    tournament_id: number
  ) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    const target = event.currentTarget;
    // Get data from the form.
    const data = {
      first_name: target.first_name.value,
      last_name: target.last_name.value,
      rank: target.rank.value,
      city_club: target.city_club.value,
      country: target.country.value,
      egf_pid: target.egf_pid.value,
    };
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);
    // API endpoint where we send form data.
    const endpoint = tournamentRegistrationUrl(tournament_id);
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);
    console.log(response);
    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    console.log(result);
    alert(`${result.message}`);
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
