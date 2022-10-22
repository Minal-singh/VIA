import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import Rooms from "../Rooms/Rooms";
import "../../index.css";
import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";

const Navbar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const BlackButton = styled(Button)(() => ({
    color: grey.A100,
    borderRadius: "25px",
    margin: "2px",
    backgroundColor: grey[900],
    "&:hover": {
      backgroundColor: grey[800],
    },
  }));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={6}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton disableRipple onClick={() => setOpen(!open)}>
            {!open ? (
              <MenuRoundedIcon fontSize="large" />
            ) : (
              <CloseIcon fontSize="large" />
            )}
          </IconButton>
          <Typography component="p" variant="h5" sx={{ flexGrow: 1 }}>
            VIA
            <Box
              component="span"
              sx={{ display: { xs: "none", md: "inline" } }}
            >
              {" "}(Video Interaction Application)
            </Box>
          </Typography>
          <Link
            href="https://github.com/Minal-singh/VIA"
            target="_blank"
            rel="noopener"
            underline="none"
          >
            <BlackButton variant="contained" startIcon={<GitHubIcon />}>
              GitHub
            </BlackButton>
          </Link>
          <BlackButton
            variant="contained"
            startIcon={<ExitToAppIcon />}
            onClick={logout}
          >
            Logout
          </BlackButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{ flexShrink: 0 }}
        variant="persistent"
        transitionDuration={2}
        anchor={"left"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Rooms />
      </Drawer>
    </>
  );
};

export default Navbar;
