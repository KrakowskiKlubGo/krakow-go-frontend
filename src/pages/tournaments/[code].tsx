import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import Box from "@mui/material/Box";

import { Container, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import TournamentInfoPanel from "../../components/tournaments/tournamentInfoTab";
import RegisteredPlayersPanel from "../../components/tournaments/registeredPlayersTab";
import RegistrationForm from "../../components/tournaments/RegistrationForm";
import {
  TournamentDetailSchema,
  TournamentListSchema,
} from "@/consts/tournamens/types";
import { GetTournamentDetails, getAllTournamentsList } from "@/api/api_methods";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import CenteredBox from "@/components/common/CenteredBox";
import Image from "next/image";
import TournamentResultsPanel from "@/components/tournaments/TournamentResultsPanel";
import { getLocalizedMonthDateString } from "@/utils/functions";
import { detailPageParams } from "@/consts/interfaces";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const tournaments: TournamentListSchema[] = await getAllTournamentsList("pl");
  const validLocales = locales && Array.isArray(locales) ? locales : [];

  const paths = tournaments.flatMap((tournament) => {
    return validLocales.map((locale) => {
      return {
        params: { code: tournament.code },
        locale: locale,
      };
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { code } = context.params as detailPageParams;

  const tournament: TournamentDetailSchema[] = await GetTournamentDetails(
    code,
    context.locale ?? "pl"
  );

  return {
    props: {
      tournament,
      ...(await serverSideTranslations(context.locale ?? "pl", [
        "common",
        "registration",
        "tournaments",
      ])),
    },
  };
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TournamentDetail(
  data: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [value, setValue] = React.useState(0);
  const registration_enable =
    data.tournament.registration_info.end_date != null
      ? new Date(data.tournament.registration_info.end_date) > new Date()
      : true;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { t, i18n } = useTranslation(["tournaments", "registration"]);
  return (
    <>
      <Container>
        <Paper>
          <Stack
            spacing={10}
            direction={{ xs: "column", md: "row" }}
            sx={{ p: 3 }}
          >
            <Box>
              <Image
                alt=""
                src={data.tournament.image}
                width={300}
                height={269}
              />
            </Box>

            <Box>
              <Typography variant={"h3"}>{data.tournament.name}</Typography>
              <Typography variant={"h4"}>
                {getLocalizedMonthDateString(
                  i18n.language,
                  data.tournament.start_date,
                  data.tournament.end_date
                )}
              </Typography>
            </Box>
          </Stack>

          <CenteredBox sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab label={t("info_tab")} {...a11yProps(0)} />
              <Tab
                label={t("registration_tab")}
                {...a11yProps(1)}
                disabled={!registration_enable}
              />
              <Tab label={t("registered_players_tab")} {...a11yProps(2)} />
              <Tab label={t("results_tab")} {...a11yProps(2)} />
            </Tabs>
          </CenteredBox>

          <TabPanel value={value} index={0}>
            <TournamentInfoPanel
              tournament_info={data.tournament.tournament_info}
            />
          </TabPanel>

          {registration_enable && (
            <TabPanel value={value} index={1}>
              <RegistrationForm
                registration_info={data.tournament.registration_info}
                tournament_code={data.tournament.code}
              />
            </TabPanel>
          )}
          <TabPanel value={value} index={2}>
            <RegisteredPlayersPanel
              tournament_code={data.tournament.code}
              registration_info={data.tournament.registration_info}
            />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <TournamentResultsPanel tournament_code={data.tournament.code} />
          </TabPanel>
        </Paper>
      </Container>
    </>
  );
}
