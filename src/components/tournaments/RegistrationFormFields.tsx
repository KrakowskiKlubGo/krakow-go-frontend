import { FormControl, MenuItem, TextField } from "@mui/material";
import { ranks, RegistrationInfoSchema } from "@/consts/tournamens/types";

interface Props {
  registration_info: RegistrationInfoSchema;
}

const AddAdvertiserFormFields: React.FC<Props> = ({ registration_info }) => {
  return (
    <>
      <FormControl size="small">
        <TextField required id="first_name" label="Nazwisko" defaultValue="" />
        <TextField required id="last_name" label="Imię" defaultValue="" />
        <TextField
          required
          select
          id="rank"
          label="Siła"
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
          label="Klub/Miasto"
          defaultValue=""
        />
        <TextField required id="country" label="Kraj" defaultValue="" />
        <TextField id="egf_pid" label="EGF PID" defaultValue="" />
      </FormControl>
    </>
  );
};

export default AddAdvertiserFormFields;
