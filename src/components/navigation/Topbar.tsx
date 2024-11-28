import MenuIcon from "@mui/icons-material/Menu";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useAtomValue, useSetAtom } from "jotai";
import { useAtom } from "jotai/index";
import * as React from "react";
import { FC } from "react";
import { useNavigate } from "react-router";
import { UserRoles } from "../../api/types/User.ts";
import authenticationAtom from "../../atoms/authenticationAtom.tsx";
import topbarAtom from "../../atoms/topbarAtom.tsx";
import { BrowserRoutes } from "../../router/BrowserRoutes.ts";

interface Setting {
  name: string;
  action: () => void;
}

interface NavigationItem {
  name: string;
  requiredPermission: UserRoles;
  routeNavigation: BrowserRoutes;
}

const Topbar: FC = () => {
  const navigation = useNavigate();
  const user = useAtomValue(authenticationAtom);

  const modifySessionAtom = useSetAtom(authenticationAtom);

  const [anchors, setAnchors] = useAtom(topbarAtom);

  if (!user) {
    navigation(BrowserRoutes.SIGN_IN);
    return null;
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchors((state) => ({ ...state, userMenuAnchor: event.currentTarget }));
  };

  const handleCloseUserMenu = () => {
    setAnchors((state) => ({ ...state, userMenuAnchor: null }));
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchors((state) => ({
      ...state,
      navigationMenuAnchor: event.currentTarget,
    }));
  };

  const handleCloseNavMenu = () => {
    setAnchors((state) => ({ ...state, navigationMenuAnchor: null }));
  };

  const settings: Setting[] = [
    {
      name: "Cerrar sesión",
      action: () => {
        handleCloseUserMenu();
        modifySessionAtom(() => null);
      },
    },
  ];

  const pages: NavigationItem[] = [
    {
      name: "Inscripcion a equipo",
      requiredPermission: UserRoles.PLAYER,
      routeNavigation: BrowserRoutes.JOIN_TEAM,
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 2, display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchors.navigationMenuAnchor}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchors.navigationMenuAnchor)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "block" } }}
            >
              {pages
                .filter((page) => user.roles.includes(page.requiredPermission))
                .map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography
                      onClick={() => navigation(page.routeNavigation)}
                      sx={{ textAlign: "center" }}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <SportsSoccerIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="span"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ASOCIACION DE FUTBOL
          </Typography>

          <SportsSoccerIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="span"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AS. FUTBOL
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Ver opciones">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt="Foto de perfil"
                  src={user ? user.foto : ""}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchors.userMenuAnchor}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchors.userMenuAnchor)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={setting.action}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Topbar;
