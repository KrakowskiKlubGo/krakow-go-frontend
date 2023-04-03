import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import TournamentInfoPanel from "../../components/tournaments/tournamentInfoTab";
import { apiBaseUrl } from "@/consts/api/urls";
import RegisteredPlayersPanel from "../../components/tournaments/registeredPlayersTab";
import RegistrationForm from "../../components/tournaments/RegistrationForm";
import { TournamentDetailSchema } from "../../consts/tournamens/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // @ts-ignore
  const id = context.params.id;
  const response = await fetch(`${apiBaseUrl}/tournaments/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const tournament: TournamentDetailSchema = await response.json();

  return {
    props: {
      tournament,
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
  data: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Informacje" {...a11yProps(0)} />
          <Tab label="Rejestracja" {...a11yProps(1)} />
          <Tab label="Zarejestrowani gracze" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TournamentInfoPanel
          tournament_info={data.tournament.tournament_info}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RegistrationForm
          registration_info={data.tournament.registration_info}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RegisteredPlayersPanel
          registered_players={data.tournament.registered_players}
        />
      </TabPanel>
    </>
  );
}
