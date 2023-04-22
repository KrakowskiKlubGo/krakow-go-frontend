import * as React from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import {
  CaptchaSchema,
  EgdGetPlayerDataByDataSchema,
  EgdPlayerDataSchema,
} from "@/consts/tournamens/types";
import debounce from "@mui/utils/debounce";
import useSWR from "swr";
import { captchaUrl } from "@/consts/api/urls";
import { captchaFetcher, EgdGetPlayerDataByData } from "@/api/api_methods";

interface Props {
  label: string;
  // first_name_setter: (value: string) => void;
  // rank_setter: (value: string) => void;
  // club_city_setter: (value: string) => void;
  // country_setter: (value: string) => void;
  // egf_pid_setter: (value: string) => void;
}

const EgdLastNameAutocomplete: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | EgdPlayerDataSchema | null>(
    null
  );
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly EgdPlayerDataSchema[]>(
    []
  );
  const loading = open && options.length === 0 && inputValue.length > 2;

  React.useEffect(() => {
    setOptions([...list_of_options]);
  }, [inputValue, options]);

  return (
    <Autocomplete
      freeSolo
      disableClearable
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      autoSelect={false}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={options}
      renderOption={(props, option) => {
        return (
          <React.Fragment>
            {option.Last_Name} {option.Name}
          </React.Fragment>
        );
      }}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        console.log(options);
      }}
    />
  );
};

const list_of_options = [
  {
    Pin_Player: "19537859",
    Last_Name: "Milko",
    Name: "Alexandr",
    Country_Code: "RU",
    Club: "61RD",
    Grade: "12k",
  },
  {
    Pin_Player: "14386614",
    Last_Name: "Milkovic",
    Name: "Alen",
    Country_Code: "NO",
    Club: "Osl",
    Grade: "5k",
  },
  {
    Pin_Player: "13713359",
    Last_Name: "Milkovits",
    Name: "Franz",
    Country_Code: "AT",
    Club: "Eis",
    Grade: "15k",
  },
  {
    Pin_Player: "17937370",
    Last_Name: "Milkowski",
    Name: "Jakub",
    Country_Code: "PL",
    Club: "Krak",
    Grade: "3k",
  },
];

export default EgdLastNameAutocomplete;
