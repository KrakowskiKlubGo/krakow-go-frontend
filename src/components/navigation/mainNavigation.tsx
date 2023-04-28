import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import { Link } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import pl_icon from "public/pl.svg";
import en_icon from "public/en.svg";
import CenteredBox from "@/components/common/CenteredBox";
import { styled } from "@mui/system";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

// @ts-ignore
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const MainAppBar: React.FC<Props> = (props) => {
  const { i18n, t } = useTranslation("common");
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  type MenuLink = {
    href: string;
    label: string;
  };

  const links: MenuLink[] = [
    { href: "/", label: t("home") },
    { href: "/tournaments", label: t("tournaments") },
    { href: "/contact", label: t("contact") },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {t("title")}
      </Typography>
      <Divider />
      <List>
        {links.map(({ href, label }, index) => (
          <ListItem key={index}>
            <ListItemButton href={href}>
              <ListItemText secondary={label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <Link
            href={router.asPath}
            locale={i18n.language === "pl" ? "en" : false}
            component={NextLink}
          >
            <ListItemButton>
              {i18n.language === "pl" ? (
                <CenteredBox>
                  <Image
                    src={en_icon}
                    width={40}
                    height={20}
                    alt={"English"}
                  ></Image>
                </CenteredBox>
              ) : (
                <CenteredBox>
                  <Image
                    src={pl_icon}
                    width={40}
                    height={20}
                    alt={"Polski"}
                  ></Image>
                </CenteredBox>
              )}
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" position={"fixed"}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ display: { xs: "block", sm: "block" } }}
            >
              {t("title")}
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" }, margin: "auto" }}>
              {links.map(({ href, label }, index) => (
                <Button key={index} href={href} size={"large"}>
                  <Typography color={"white"}>{label}</Typography>
                </Button>
              ))}
            </Box>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Link
                href={router.asPath}
                locale={i18n.language === "pl" ? "en" : false}
                component={NextLink}
              >
                <Button>
                  {i18n.language === "pl" ? (
                    <CenteredBox>
                      <Image
                        src={en_icon}
                        width={40}
                        height={20}
                        alt={"English"}
                      ></Image>
                    </CenteredBox>
                  ) : (
                    <CenteredBox>
                      <Image
                        src={pl_icon}
                        width={40}
                        height={20}
                        alt={"Polski"}
                      ></Image>
                    </CenteredBox>
                  )}
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            anchor={"top"}
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "auto",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <Offset />
    </>
  );
};

export default MainAppBar;
