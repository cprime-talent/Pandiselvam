import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Outlet, useNavigate } from "react-router-dom";
import Wrapper from "../components/Wrapper/Wrapper";
import Header from "../components/Header/Header";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SegmentIcon from "@mui/icons-material/Segment";

export default function ClippedDrawer() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Header />
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop: "5%", backgroundColor: "#f5f5f5" }}
      >
        <Wrapper>
          <Outlet />
        </Wrapper>
      </Box>
    </Box>
  );
}
