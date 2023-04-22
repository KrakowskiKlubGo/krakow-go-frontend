import * as React from "react";
import Button from "@mui/material/Button";
import {
  Backdrop,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import {
  CaptchaSchema,
  PlayerRegistrationFormSchema,
  ranks,
  RegistrationInfoSchema,
} from "@/consts/tournamens/types";
import { captchaFetcher, registerPlayer } from "@/api/api_methods";
import CenteredBox from "@/components/common/CenteredBox";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import { captchaUrl } from "@/consts/api/urls";
import { CaptchaImage } from "@/components/common/CaptchaImage";
import { useTranslation } from "next-i18next";
import EgdLastNameAutocomplete from "@/components/tournaments/EgdLastNameAutocomplete";
interface Props {
  registration_info: RegistrationInfoSchema;
}

const RegistrationForm: React.FC<Props> = ({ registration_info }) => {
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [firstNameText, setFirstNameText] = useState("");
  const [rankText, setRankText] = useState("1k");
  const [cityClubText, setCityClubText] = useState("");
  const [countryText, setCountryText] = useState("");
  const [egfPidText, setEgfPidText] = useState("");

  const { data } = useSWR<CaptchaSchema>(captchaUrl, captchaFetcher);
  const { t } = useTranslation("registration");
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    tournament_id: number
  ) => {
    event.preventDefault();
    setLoading(true);

    if (data?.captcha_key !== undefined) {
      const target = event.currentTarget;
      const post_data: PlayerRegistrationFormSchema = {
        first_name: target.first_name.value,
        last_name: target.last_name.value,
        rank: target.rank.value,
        city_club: target.city_club.value,
        country: target.country.value,
        egf_pid: target.egf_pid.value,
        captcha_key: data?.captcha_key,
        captcha_value: target.captcha_value.value,
      };

      const response_message = await registerPlayer(tournament_id, post_data);
      setMessage(response_message);
    } else {
      setMessage("Captcha not loaded");
    }
    setLoading(false);
    setResponse(true);
  };

  const handleClose = () => {
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
            <Container>
              <FormControl size="small">
                <EgdLastNameAutocomplete label={t("last_name")} />
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
                <TextField
                  required
                  id="country"
                  label={t("country")}
                  defaultValue=""
                />
                <TextField id="egf_pid" label="EGF PID" defaultValue="" />

                {data?.captcha_image ? (
                  <CenteredBox>
                    <CaptchaImage base64_image={data?.captcha_image} />
                  </CenteredBox>
                ) : (
                  <CenteredBox>
                    <CircularProgress color="inherit" />
                  </CenteredBox>
                )}
                <TextField
                  required
                  id="captcha_value"
                  label="Captcha"
                  defaultValue=""
                />

                <Button type="submit" variant={"contained"}>
                  {t("register_button_text")}
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
            </Container>
          </form>
        </CenteredBox>
      </Paper>
    </>
  );
};

export default RegistrationForm;
