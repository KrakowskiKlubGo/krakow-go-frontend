"use client";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import CenteredBox from "@/components/CenteredBox";
import { useTranslation } from "next-export-i18n";

export default function Custom500() {
  const { t } = useTranslation();
  return (
    <CenteredBox sx={{ flexGrow: 1 }}>
      <Paper>
        <CenteredBox sx={{ padding: 2 }}>
          <Typography variant={"h2"}>500</Typography>
        </CenteredBox>
        <CenteredBox sx={{ padding: 2 }}>
          <Typography> {t("errors.500_text")}</Typography>
        </CenteredBox>
      </Paper>
    </CenteredBox>
  );
}
