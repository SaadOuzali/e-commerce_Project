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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import '../../styles/main.css'
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
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import '../../App.css'

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
    setOpen(false);
  };
  return (
    <>
      <Drawer theme={theme} variant="permanent" open={open}>
        <DrawerHeader theme={theme}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider></Divider>

        <Stack sx={{ alignItems: "center", mt: 2, mb: 2 }}>
          <Avatar
            alt="Remy Sharp"
            src="../images/3135715.png"
            sx={{
              width: open ? 60 : 30,
              height: open ? 60 : 30,
              border: "3px solid green",
              mb: 2,
              transition:"1s"
            }}
          />
          <Typography sx={{ fontSize: open ? 18 : 0,transition:"1s" }}>
            {user.userdata.Data.user_name}{" "}
          </Typography>
          <Typography sx={{ fontSize: open ? 18 : 0,transition:"1s" }} color="primary">
            {user.userdata.Data.role}
          </Typography>
        </Stack>

        <Divider />
        <List>
          

          {/* Homme  */}
            <NavLink to={"/"}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon style={{ color: "#000" }} fontSize="large" />
            </ListItemIcon>
              <ListItemText primary="Dashboard" />
          </ListItemButton>
          </NavLink>

          {/* users */}
            <NavLink to="/users">
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PersonIcon style={{ color: "#000" }} fontSize="large" />
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
          <ListItemButton >
            <ListItemIcon>
              <ProductionQuantityLimitsIcon
                style={{ color: "#000" }}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {/* {prod ? <ExpandLess /> : <ExpandMore />} */}
          </ListItemButton>
          
          
          
          <NavLink to={"orders"}>
          <ListItemButton onClick={handleClick3}>
            
            <ListItemIcon>
              <AttachMoneyIcon style={{ color: "#000" }} fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Orders" />
            {/* {order ? <ExpandLess /> : <ExpandMore />} */}
          </ListItemButton>
          </NavLink>
         
          
        </List>
        <Divider />
        <Box >
            <NavLink to={"/barchart"}>
        <ListItemButton >
            <ListItemIcon>
              <BarChartIcon style={{ color: "#000" }} fontSize="large" />
            </ListItemIcon>
              <ListItemText primary="Bar Chart" />
          </ListItemButton>
            </NavLink>
        </Box>

        <Box>
            <NavLink to={"piechart"}>
          <ListItemButton>
            <ListItemIcon>
              <PieChartIcon style={{ color: "#000" }} fontSize="large" />
            </ListItemIcon>
              <ListItemText primary="Pie Char" />
          </ListItemButton>
            </NavLink>
        </Box>
        <Box>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon style={{ color: "#000" }} fontSize="large" />
            </ListItemIcon>
            <NavLink to={"/"}>
              <ListItemText primary="Dashboard" />
            </NavLink>
          </ListItemButton>
        </Box>
        <Box>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon style={{ color: "#000" }} fontSize="large" />
            </ListItemIcon>
            <NavLink to={"/"}>
              <ListItemText primary="Dashboard" />
            </NavLink>
          </ListItemButton>
        </Box>
        
      </Drawer>
      
      
    </>
  );
}
