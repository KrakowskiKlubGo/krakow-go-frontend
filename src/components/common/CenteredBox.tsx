import { ReactNode } from "react";
import Box, { BoxProps } from "@mui/material/Box";

interface CenteredBoxProps extends BoxProps {
  children: ReactNode;
}

function CenteredBox({ children, ...rest }: CenteredBoxProps) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" {...rest}>
      {children}
    </Box>
  );
}

export default CenteredBox;
