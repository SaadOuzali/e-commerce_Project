import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WindowIcon from "@mui/icons-material/Window";
import MenuIcon from "@mui/icons-material/Menu";
import TemporaryDrawer from "./TemporaryDrawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconSection from "./IconSection";
import request from "../../components/axios";
import ChairIcon from "@mui/icons-material/Chair";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";
import CategoriesDisplay from "../../components/CategoriesDisplay";
import { Shoppigncartcontexte } from "./contexte/CartShoppingContexte";

const categories = ["Sports", "Electronic"];

export default function Header3() {
  const [categorie, setCategorie] = useState([]);
  const [isopen, setIsopen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const shopCtx = useContext(Shoppigncartcontexte);

  if (!shopCtx) throw new Error("Shop context not available");
  console.log(shopCtx);

  const { anchorEl, setAnchorEl, open } = shopCtx;

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };
  // console.log("dial state", categorie);
  const theme = useTheme();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const data = await request.get(`/v1/categories`);
        if (data.status === 200) {
          setCategorie(data.data.data);
        }
      } catch (error) {
        console.log("hna ferror", error);
      }
    };
    fetchCategorie();
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: theme.palette.bg1.header3,
        }}
      >
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            bgcolor: theme.palette.search.main,
            color: theme.palette.text.secondary,
            width: "250px",
          }}
        >
          <WindowIcon sx={{ color: "#2b3445" }} />
          <p
            className="fw-bold"
            style={{
              marginLeft: "10px",
              marginBottom: "0",
              textTransform: "capitalize",
              color: "grey",
            }}
          >
            Categories
          </p>
          {open ? (
            <ExpandMoreIcon sx={{ marginLeft: 12, color: "#2b3445" }} />
          ) : (
            <KeyboardArrowRightIcon sx={{ marginLeft: 12, color: "#2b3445" }} />
          )}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            ".MuiPaper-root": {
              width: 250,
              bgcolor: theme.palette.search.main,
              color: theme.palette.text.secondary,
              // display:"none"
            },
          }}
        >
          {categorie.map((cat) => {
            return (
              <Link to={`/home/${cat.slug}`} key={cat.slug}>
                <p>{cat.category_name}</p>
              </Link>
            );
          })}
        </Menu>

        <TemporaryDrawer />
      </Container>

      {/* <Box>
      <CategoriesDisplay />
    </Box> */}
    </>
  );
}
