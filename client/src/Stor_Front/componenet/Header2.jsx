import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentIcon from "@mui/icons-material/Assignment";

import Badge from "@mui/material/Badge";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModalTemplate from "./ModalTemplate";
import TemplateModal from "./template/TemplateModal";
import TemplateFields from "./template/TemplateFields";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import request from "../../components/axios";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { toast } from "react-toastify";
import img from "./main/productImage/trico.png";
import { Shoppigncartcontexte } from "./contexte/CartShoppingContexte";
import img4 from "./main/productImage/trico.png";
import formatCurrency from "../formatCurrency";
import Shoppingcart from "./Shoppingcart";
import Payment from "./Payment";
import { NavLink, useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px black solid",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   width: "100%",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const options = ["All categories", "Baskett", "Chaussures"];
const arr = [
  { type: "email", label: "email" },
  { type: "password", label: "password" },
];
const btn = { title: "Login" };
// const query={url:"/v1/customers/login",method:"post",initialValue:[]};

export default function Header2() {
  const [openmdl, setOpenmdl] = React.useState(false);
  const theme = useTheme();
  // console.log(theme.palette.section1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [isdraweropen, setIsdraweropen] = React.useState(false);
  const { cartItems, TotalPrice } = useContext(Shoppigncartcontexte);
  let numberofproducts = cartItems.length;
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // to handle login in modale
  const handleSubmit = async (inputValue) => {
    try {
      const { data } = await request.post("/v1/customers/login", inputValue);
      console.log("dial data", data);
    } catch (error) {
      console.log("hnaaaa");
      if (error?.response?.status === 404) {
        toast.error(error?.response?.data?.message);
        setOpenmdl(false);
      }
      console.log("dial error", error);
    }
  };

  // handle navigation
  const handleNavigation = () => {
    navigate("/home/customer/payment");
    setIsdraweropen(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        bgcolor: theme.palette.header2.bgcolor,
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "100%",
        },
        marginLeft: "0",
        marginRight: "0",
      }}
    >
      <Stack alignItems={"center"} justifyContent={"center"}>
        <h3 className="fw-bold" style={{ color: theme.palette.header2.logo }}>
          DECOVIB
        </h3>
      </Stack>

      <Box sx={{ flexGrow: 1 }}></Box>
      {/* <NavLink to={"/home/customer/profile"}>
        <p>Hello</p>
      </NavLink> */}
      <Stack direction={"row"} alignItems={"center"}>
        {/* modal form */}
        <IconButton>
          {/* <ModalTemplate fields={arr} btn={btn} query={query} /> */}
          {/* <TemplateModal
            icon={<PersonIcon />}
            openmdl={openmdl}
            setOpenmdl={setOpenmdl}
          >
            <TemplateFields
              fields={arr}
              btn={btn}
              icon={
                <LockOpenIcon sx={{ color: "#1e90ff", fontSize: "40px" }} />
              }
              setOpenmdl={setOpenmdl}
              handleSubmit={handleSubmit}
              theme={theme}
            />
          </TemplateModal> */}
          <NavLink to={"/home/customer/profile/information"}>
            <PersonIcon
              sx={{ fontSize: "30px", color: theme.palette.header2.icons }}
            />
          </NavLink>
        </IconButton>
        <IconButton>
          <NavLink to={"/home/customer/profile/favorites"}>
            <FavoriteIcon
              sx={{ fontSize: "30px", color: theme.palette.header2.icons }}
            />
          </NavLink>
        </IconButton>
        <IconButton className="me-5">
          <NavLink to={"/home/customer/profile/orders"}>
            <ListAltIcon
              sx={{ fontSize: "30px", color: theme.palette.header2.icons }}
            />
          </NavLink>
        </IconButton>

        {/* cart shopping icon */}
        <IconButton aria-label="cart" onClick={() => setIsdraweropen(true)}>
          <StyledBadge badgeContent={numberofproducts} color="primary">
            <ShoppingCartIcon
              sx={{ fontSize: "28px", color: theme.palette.header2.icons }}
            />
          </StyledBadge>
        </IconButton>

        <Drawer
          anchor="right"
          open={isdraweropen}
          onClose={() => setIsdraweropen(false)}
        >
          <Stack spacing={3} width={360}>
            <IconButton
              sx={{ width: "40px", ":hover": { color: "#dc143c" } }}
              onClick={() => setIsdraweropen(false)}
            >
              <ChevronRightIcon />
            </IconButton>

            <Divider />

            <Stack className="px-4">
              {cartItems.map((item) => (
                <Shoppingcart {...item} />
              ))}
            </Stack>
            {cartItems.length === 0 ? null : (
              <>
                <Stack direction={"row"} spacing={7.5} alignItems={"center"}>
                  <h6 className="fw-bold ms-4">Total price : </h6>
                  <h6 className="fw-bold" style={{ color: "#a9a9a9" }}>
                    {" "}
                    {formatCurrency(TotalPrice)}{" "}
                  </h6>
                </Stack>

                <Box display={"flex"} justifyContent={"center"}>
                  {/* <NavLink  to={'/home/customer/payment'}> */}
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ width: "320px" }}
                    onClick={handleNavigation}
                  >
                    checkout Now ({formatCurrency(TotalPrice)})
                  </Button>
                  {/* </NavLink> */}
                </Box>
              </>
            )}
          </Stack>
        </Drawer>
      </Stack>
    </Container>
  );
}
