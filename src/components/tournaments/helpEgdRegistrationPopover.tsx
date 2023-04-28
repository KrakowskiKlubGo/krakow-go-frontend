import * as React from "react";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

interface Props {
  help_text: string;
}

const HelpEgdRegistrationPopover: React.FC<Props> = (data) => {
  const [helpAnchorEl, setHelpAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleHelpClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHelpAnchorEl(event.currentTarget);
  };
  const handleHelpClose = () => {
    setHelpAnchorEl(null);
  };
  const helpOpen = Boolean(helpAnchorEl);
  const help_id = helpOpen ? "help-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleHelpClick} aria-describedby={help_id}>
        <HelpOutlineIcon />
      </IconButton>
      <Popover
        id={help_id}
        open={helpOpen}
        anchorEl={helpAnchorEl}
        onClose={handleHelpClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Typography sx={{ p: 2, maxWidth: "13rem" }}>
          {data.help_text}
        </Typography>
      </Popover>
    </div>
  );
};

export default HelpEgdRegistrationPopover;
