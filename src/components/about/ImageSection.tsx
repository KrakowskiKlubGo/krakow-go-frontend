import * as React from "react";
import { Grid } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { StaticImport } from "@/consts/interfaces";

interface Props {
  image: StaticImport;
  header: string;
  description: string;
  flip?: boolean;
}

export const ImageSection: React.FC<Props> = ({
  image,
  header,
  description,
  flip = false,
}) => {
  if (flip) {
    return (
      <>
        <Grid container>
          <Grid item container md={6}>
            <Box padding={"5rem"}>
              <Typography variant={"h5"}>{header}</Typography>
              <Typography variant={"subtitle1"}>{description}</Typography>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Image src={image} alt={""}></Image>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Grid container>
          <Grid item md={6}>
            <Image src={image} alt={""}></Image>
          </Grid>
          <Grid item container md={6}>
            <Box padding={"5em"}>
              <Typography variant={"h5"}>{header}</Typography>
              <Typography variant={"subtitle1"}>{description}</Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
};
