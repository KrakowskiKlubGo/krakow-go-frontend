"use client";

import * as React from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { EgdPlayerDataSchema } from "@/consts/tournamens/types";
import { EgdGetPlayerDataByDataUrl } from "@/consts/api/urls";
import Typography from "@mui/material/Typography";
import HelpEgdRegistrationPopover from "@/app/turnieje/[code]/_components/register/helpEgdRegistrationPopover";
import { ReactNode } from "react";
import { useTranslation } from "next-export-i18n";

interface Props {
  label: string;
  id: string;
  setFirstName: (value: string) => void;
  setRank: (value: string) => void;
  setCityClub: (value: string) => void;
  setCountry: (value: string) => void;
  setEgdPid: (value: string) => void;
}

const EgdLastNameAutocomplete: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly EgdPlayerDataSchema[]>(
    [],
  );

  const { t } = useTranslation();

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 50);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  React.useEffect(() => {
    if (debouncedInputValue && debouncedInputValue.length > 2) {
      fetch(EgdGetPlayerDataByDataUrl(debouncedInputValue))
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log(data);
            if (data.retcode == "Ok") {
              setOptions(data.players);
            } else {
              setOptions([]);
            }
          } else {
            setOptions([]);
          }
        });
    } else {
      setOptions([]);
    }
  }, [debouncedInputValue]);

  const helper: ReactNode = (
    <Stack direction={"row"}>
      <Typography variant="body2" color="text.secondary">
        {t("registration.autocomplete_help_text")}
      </Typography>
      <HelpEgdRegistrationPopover
        help_text={t("registration.autocomplete_help_popover")}
      />
    </Stack>
  );

  return (
    <Autocomplete
      id={props.id}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label={props.label} helperText={helper} />
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
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        } else {
          return option.Last_Name;
        }
      }}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Typography variant="body2" color="text.secondary">
              {option.Last_Name} {option.Name} {option.Grade} {option.Club}
            </Typography>
          </li>
        );
      }}
      onChange={(event, newValue, reason) => {
        if (reason === "selectOption") {
          if (typeof newValue === "string") {
            setInputValue(newValue);
          } else if (newValue) {
            setInputValue(newValue.Last_Name);
            props.setFirstName(newValue.Name);
            props.setRank(newValue.Grade);
            props.setCityClub(newValue.Club);
            props.setCountry(newValue.Country_Code);
            props.setEgdPid(newValue.Pin_Player);
          }
        }
      }}
      onInputChange={(event, newInputValue, reason) => {
        setInputValue(newInputValue);
        setOptions([]);
      }}
    />
  );
};

export default EgdLastNameAutocomplete;
