import Typography from "@mui/material/Typography";
import {
  Box,
  Container,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { Facebook, Mail } from "@mui/icons-material";
import Discord from "public/images/discord-icon.png";

import * as React from "react";
import Image from "next/image";
import { useTranslation } from "next-export-i18n";

export default function Kontakt() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="sm">
      <Paper>
        <Box sx={{ mt: 8, p: 2 }}>
          <Typography variant="h4" gutterBottom>
            {t("contact.header")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t("contact.links_text")}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Mail fontSize="large" sx={{ color: "#dd4b39" }} />
              </ListItemIcon>
              <ListItemText primary="krakowski.klub.go@gmail.com" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Facebook fontSize="large" sx={{ color: "#3b5998" }} />
              </ListItemIcon>
              <Link
                href="https://www.facebook.com/Krakowski.Klub.Go/"
                target="_blank"
              >
                <Typography>Facebook Krakowski Klub Go</Typography>
              </Link>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Image src={Discord} alt={""} width={30} height={30}></Image>
              </ListItemIcon>
              <Link
                href="https://discord.com/invite/6GesH6daNz"
                target="_blank"
              >
                <Typography>Discord Krakowski Klub Go </Typography>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Container>
  );
}
