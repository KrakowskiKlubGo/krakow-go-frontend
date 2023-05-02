import { GetStaticProps, InferGetStaticPropsType } from "next";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import CenteredBox from "@/components/common/CenteredBox";
import { useTranslation } from "next-export-i18n";

export default function Page404() {
  const { t } = useTranslation();
  return (
    <CenteredBox sx={{ flexGrow: 1 }}>
      <Paper>
        <CenteredBox sx={{ padding: 2 }}>
          <Typography variant={"h2"}>404</Typography>
        </CenteredBox>
        <CenteredBox sx={{ padding: 2 }}>
          <Typography> {t("errors.404_text")}</Typography>
        </CenteredBox>
      </Paper>
    </CenteredBox>
  );
}
