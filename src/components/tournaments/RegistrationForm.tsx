import * as React from "react";
import Button from "@mui/material/Button";
import AddAdvertiserFormFields from "./RegistrationFormFields";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Paper,
} from "@mui/material";
import { RegistrationInfoSchema } from "@/consts/tournamens/types";
import { registerPlayer } from "@/api/api_methods";
import CenteredBox from "@/components/common/CenteredBox";
import { useState } from "react";
import { redirect } from "next/navigation";

interface Props {
  registration_info: RegistrationInfoSchema;
}

const RegistrationForm: React.FC<Props> = ({ registration_info }) => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    tournament_id: number
  ) => {
    event.preventDefault();
    setLoading(true);

    const target = event.currentTarget;
    const data = {
      first_name: target.first_name.value,
      last_name: target.last_name.value,
      rank: target.rank.value,
      city_club: target.city_club.value,
      country: target.country.value,
      egf_pid: target.egf_pid.value,
    };

    const response_message = await registerPlayer(tournament_id, data);
    setMessage(response_message);
    setLoading(false);
    setResponse(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResponse(false);
    window.location.reload();
  };

  return (
    <>
      <Paper
        sx={{
          "& .MuiTextField-root": { m: 2, width: "25ch" },
        }}
      >
        <CenteredBox sx={{ m: 1, p: 2 }}>
          <form
            onSubmit={(event) =>
              handleSubmit(event, registration_info.tournament_id)
            }
          >
            <FormControl size="small">
              <AddAdvertiserFormFields registration_info={registration_info} />
              <Button type="submit" variant={"contained"}>
                Zarejestruj
              </Button>
              <Backdrop open={loading}>
                <CircularProgress color="inherit" />
              </Backdrop>
              <Dialog open={response} onClose={handleClose}>
                <DialogTitle>Success!</DialogTitle>
                <DialogContent>{message}</DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </FormControl>
          </form>
        </CenteredBox>
      </Paper>
    </>
  );
};

export default RegistrationForm;
