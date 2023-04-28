import Image from "next/image";
import * as React from "react";

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
