import { CircularProgress } from "@mui/material";
import Image from "next/image";
import * as React from "react";
import { RegistrationInfoSchema } from "@/consts/tournamens/types";
import Box from "@mui/material/Box";
import CenteredBox from "@/components/common/CenteredBox";

interface Props {
  base64_image: string;
}

export const CaptchaImage: React.FC<Props> = ({ base64_image }) => {
  return (
    <Image
      src={`data:image/png;base64,${base64_image}`}
      alt="Captcha"
      width={90}
      height={40}
    />
  );
};
