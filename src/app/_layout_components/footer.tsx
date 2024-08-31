"use client";
import { BottomNavigation, Box, Link, Stack } from "@mui/material";
import * as React from "react";

import { Facebook, Mail } from "@mui/icons-material";
import Discord from "public/images/discord-icon.png";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import CenteredBox from "@/components/CenteredBox";

interface Props {}
const Footer: React.FC<Props> = (props) => {
  return (
    <BottomNavigation
      sx={{
        minHeight: "7rem",
      }}
    >
      <Box>
        <Stack direction={"row"} spacing={10} padding={1}>
          <Link href="mailto:krakowski.klub.go@gmail.com" target="_blank">
            <Mail fontSize="large" sx={{ color: "#dd4b39" }} />
          </Link>

          <Link href="https://www.facebook.com/" target="_blank">
            <Facebook fontSize="large" sx={{ color: "#3b5998" }} />
          </Link>
          <CenteredBox>
            <Link href="https://discord.com/invite/6GesH6daNz" target="_blank">
              <Image src={Discord} alt={""} width={30} height={30}></Image>
            </Link>
          </CenteredBox>
        </Stack>
        <Typography variant="body1" textAlign={"center"}>
          Copywright Krakowski Klub Go
        </Typography>
      </Box>
    </BottomNavigation>
  );
};

export default Footer;
