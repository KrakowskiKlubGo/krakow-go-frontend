import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import CenteredBox from "@/components/common/CenteredBox";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pl", ["errors", "common"])),
    },
  };
};

export default function Page404(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation("errors");
  return (
    <CenteredBox sx={{ flexGrow: 1 }}>
      <Paper>
        <CenteredBox sx={{ padding: 2 }}>
          <Typography variant={"h2"}>404</Typography>
        </CenteredBox>
        <CenteredBox sx={{ padding: 2 }}>
          <Typography> {t("404_text")}</Typography>
        </CenteredBox>
      </Paper>
    </CenteredBox>
  );
}
