import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import "../../styles/main.css";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from "@mui/icons-material/Mail";
import TopBar from "./TopBar";
import Bar from "./Bar";
import { Link, NavLink } from "react-router-dom";
import Drawer from "../mui/user/Drawer";
// import Drawer from '@mui/material/Drawer';
import usercontext from "../../context/AuthContext";
import DrawerHeader from "../mui/user/DrawerHeader";
import { Avatar, Stack } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import CategoryIcon from "@mui/icons-material/Category";

// import '../../App.css'

const drawerWidth = 240;

export default function AsideBar({ open, setOpen, theme }) {
  const user = React.useContext(usercontext);
  const [Open, setOopen] = React.useState(false);
  const [prod, setProd] = React.useState(false);
  const [order, setOrder] = React.useState(false);

  const handleClick = () => {
    setOopen(!Open);
  };

  const handleClick2 = () => {
    setProd(!prod);
  };

  const handleClick3 = () => {
    setOrder(!order);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen((prev)=>!prev);
  };
  return (
    <>
      <Drawer theme={theme} variant="permanent" open={open}>
        <DrawerHeader theme={theme}>
          <IconButton onClick={handleDrawerClose}>
            {!open ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider></Divider>

        <Stack sx={{ alignItems: "center", mt: 2, mb: 2 }}>
          <Avatar
            alt="Semy Sharp"
            src="https://randomuser.me/api/portraits/men/51.jpg"
            sx={{
              width: open ? 60 : 30,
              height: open ? 60 : 30,
              border: "3px solid green",
              mb: 2,
              transition: "1s",
            }}
          />
          <Typography sx={{ fontSize: open ? 18 : 0, transition: "1s" }}>
            {user?.userdata?.Data?.user_name}{" "}
          </Typography>
          <Typography
            sx={{ fontSize: open ? 18 : 0, transition: "1s" }}
            color="primary"
          >
            {user?.userdata?.Data?.role}
          </Typography>
        </Stack>

        <Divider />
        <List>
          {/* Homme  */}
          <NavLink to={"/"}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon
                  style={{ color: "rgb(14 3 45)" }}
                  fontSize="large"
                />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </NavLink>

          {/* users */}
          <NavLink to="/users">
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <AccountBoxIcon
                  style={{ color: "rgb(14 3 45)" }}
                  fontSize="large"
                />
              </ListItemIcon>
              <ListItemText primary="Users" />
              {/* {Open ? <ExpandLess /> : <ExpandMore />} */}
            </ListItemButton>
          </NavLink>

          {/* <Collapse in={Open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Add User" />
            </ListItemButton>
          </List>
        </Collapse>
        <Collapse in={Open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse> */}

          {/* products */}
          <Box>
            <NavLink to={"customer"}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon
                    style={{ color: "rgb(14 3 45)" }}
                    fontSize="large"
                  />
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItemButton>
            </NavLink>
          </Box>
          <NavLink to={"product"}>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon
                  style={{ color: "rgb(14 3 45)" }}
                  fontSize="large"
                />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {/* {prod ? <ExpandLess /> : <ExpandMore />} */}
            </ListItemButton>
          </NavLink>

          <NavLink to={"orders"}>
            <ListItemButton onClick={handleClick3}>
              <ListItemIcon>
                <LocalMallIcon
                  style={{ color: "rgb(14 3 45)" }}
                  fontSize="large"
                />
              </ListItemIcon>
              <ListItemText primary="Orders" />
              {/* {order ? <ExpandLess /> : <ExpandMore />} */}
            </ListItemButton>
          </NavLink>

          <NavLink to={"/subcategory"}>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingBagIcon
                  style={{ color: "rgb(14 3 45)" }}
                  fontSize="large"
                />
              </ListItemIcon>
              <ListItemText primary="SubCategories" />
            </ListItemButton>
          </NavLink>
        </List>
        <Divider />
        <Box>
          <NavLink to={"/barchart"}>
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon
                  style={{ color: "rgb(14 3 45)" }}
                  fontSize="large"
                />
              </ListItemIcon>
              <ListItemText primary="Bar Chart" />
            </ListItemButton>
          </NavLink>
        </Box>

        <Box>
          <NavLink to={"piechart"}>
            <ListItemButton>
              <ListItemIcon>
                <PieChartIcon
                  style={{ color: "rgb(14 3 45)" }}
                  fontSize="large"
                />
              </ListItemIcon>
              <ListItemText primary="Pie Char" />
            </ListItemButton>
          </NavLink>
        </Box>
        {/* <Box>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon style={{ color: "#000" }} fontSize="large" />
            </ListItemIcon>
            <NavLink to={"/lklk"}>
              <ListItemText primary="Dashboard" />
            </NavLink>
          </ListItemButton>
        </Box>
        <Box>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon style={{ color: "#000" }} fontSize="large" />
            </ListItemIcon>
            <NavLink to={"/nkjjl"}>
              <ListItemText primary="Dashboard" />
            </NavLink>
          </ListItemButton>
        </Box> */}
      </Drawer>
    </>
  );
}
