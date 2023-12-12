import {
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WindowIcon from "@mui/icons-material/Window";
import MenuIcon from "@mui/icons-material/Menu";
import TemporaryDrawer from "./TemporaryDrawer";
import IconSection from "./IconSection";

const categories = ["Sports", "Electronic"];

export default function Header3() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
   


      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
            width:"200px"
          }}
        >
          <WindowIcon />
          <Typography sx={{ mx: 1, textTransform: "capitalize" }}>
            Categories
          </Typography>
          <KeyboardArrowRightIcon />
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
              width: 200,
              bgcolor: theme.palette.search.main,
              color: theme.palette.text.secondary,
            },
          }}
        >
          {categories.map((cat) => {
            return <MenuItem onClick={handleClose}>{cat} </MenuItem>;
          })}
          {/* <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        </Menu>
      
          <TemporaryDrawer />
      
      
      </Container>
      
      
    

    
  );
}
