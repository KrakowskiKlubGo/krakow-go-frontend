import * as React from "react";
import { Container, Stack } from "@mui/material";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { StaticImport } from "@/consts/interfaces";

interface Props {
  image: StaticImport;
  header: string;
  description: string;
  direction?: "row" | "row-reverse";
}

export const ImageSection: React.FC<Props> = ({
  image,
  header,
  description,
  direction = "row",
}) => {
  return (
    <>
      <Stack direction={{ xs: "column", md: direction }} spacing={0}>
        <Container>
          <Box padding={{ xs: "3rem", md: "5rem" }}>
            <Typography variant={"h5"} paddingBottom={"1rem"}>
              {header}
            </Typography>
            <Typography variant={"subtitle1"}>{description}</Typography>
          </Box>
        </Container>
        <Container
          sx={{
            margin: "auto",
          }}
        >
          <Image src={image} alt={""}></Image>
        </Container>
      </Stack>
    </>
  );
};
