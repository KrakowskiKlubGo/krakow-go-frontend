"use client";

import Box from "@mui/material/Box";

import { Container, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import TournamentInfoPanel from "./info/infoTab";
import RegisteredPlayersPanel from "./players/registeredPlayersTab";
import RegistrationForm from "./register/registrationForm";

import CenteredBox from "@/components/CenteredBox";
import Image from "next/image";
import ResultsPanel from "@/app/turnieje/[code]/_components/results/resultsPanel";
import { getLocalizedMonthDateString } from "@/utils/functions";
import { useSelectedLanguage, useTranslation } from "next-export-i18n";

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
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

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TournamentDetail({ tournament_localized_data }: any) {
  const { lang } = useSelectedLanguage();
  const tournament = tournament_localized_data[lang];

  const [value, setValue] = React.useState("info");
  React.useEffect(() => {
    const default_value = window.location.hash.slice(1);
    if (default_value !== "") {
      setValue(default_value);
    } else {
      setValue("info");
    }
  }, []);

  const registration_enable =
    tournament.registration_info.end_date != null
      ? new Date(tournament.registration_info.end_date) >= new Date()
      : true;
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };
  const { t } = useTranslation();

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
              <Image alt="" src={tournament.image} width={300} height={269} />
            </Box>

            <Box>
              <Typography variant={"h3"}>{tournament.name}</Typography>
              <Typography variant={"h4"}>
                {getLocalizedMonthDateString(
                  lang,
                  tournament.start_date,
                  tournament.end_date,
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
              <Tab
                label={t("tournaments.info_tab")}
                href="#info"
                {...a11yProps("info")}
                value={"info"}
              />
              <Tab
                label={t("tournaments.registration_tab")}
                {...a11yProps("register")}
                disabled={!registration_enable}
                href="#register"
                value={"register"}
              />
              <Tab
                label={t("tournaments.registered_players_tab")}
                {...a11yProps("players")}
                href="#players"
                value={"players"}
              />
              <Tab
                label={t("tournaments.results_tab")}
                {...a11yProps("results")}
                href="#results"
                value={"results"}
              />
            </Tabs>
          </CenteredBox>

          <TabPanel value={value} index={"info"}>
            <TournamentInfoPanel tournament_info={tournament.tournament_info} />
          </TabPanel>
          {registration_enable && (
            <TabPanel value={value} index={"register"}>
              <RegistrationForm
                registration_info={tournament.registration_info}
                tournament_code={tournament.code}
              />
            </TabPanel>
          )}
          <TabPanel value={value} index={"players"}>
            <RegisteredPlayersPanel
              tournament_code={tournament.code}
              registration_info={tournament.registration_info}
            />
          </TabPanel>

          <TabPanel value={value} index={"results"}>
            <ResultsPanel tournament_code={tournament.code} />
          </TabPanel>
        </Paper>
      </Container>
    </>
  );
}
