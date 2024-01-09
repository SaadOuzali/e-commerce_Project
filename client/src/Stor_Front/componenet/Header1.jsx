import React, { useContext, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const color = grey[50];

import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { ColorModeContext } from "../them";

const options = ["EN", "AR"];

export default function Header1() {
  console.log("header 1");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
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
  const { theme, colorMode } = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        bgcolor: "#2B3445",
        py: "4px",
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
      }}
    >
      <Container>
        <Stack direction={"row"} sx={{ alignItems: "center" }}>
          <Typography
            sx={{
              mr: 2,
              p: "3px 10px",
              bgcolor: "#D23F57",
              borderRadius: "15px",
              fontWeight: "bold",
              fontSize: "10px",
              color: "#fff",
            }}
            variant="body2"
          >
            Hot
          </Typography>

          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "10px",
              color: "#fff",
            }}
            variant="body2"
          >
            Free Express Shipping
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <div>
            {theme.palette.mode === "light" ? (
              <IconButton
                onClick={() => {
                  localStorage.setItem(
                    "mode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  colorMode.toggleColorMode();
                }}
                sx={{ color: "white" }}
                // color="primary"
              >
                <LightModeOutlined fontSize="small" />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  localStorage.setItem(
                    "mode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  colorMode.toggleColorMode();
                }}
                color="#ffffff"
              >
                <DarkModeOutlined fontSize="small" />
              </IconButton>
            )}
          </div>

          <List
            component="nav"
            aria-label="Device settings"
            sx={{ m: "0", p: "0" }}
          >
            <ListItem
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
              sx={{ px: "4", py: "1" }}
            >
              <ListItemText
                primary=""
                secondary={options[selectedIndex]}
                sx={{
                  ".MuiTypography-root": { fontSize: "12px", color: "#fff" },
                }}
              />
              <ExpandMoreIcon sx={{ fontSize: "16px", color: "#fff" }} />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                sx={{ fontSize: "10px" }}
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>

          <FacebookIcon sx={{ fontSize: "20px", color: "#fff" }} />
          <InstagramIcon
            sx={{ fontSize: "20px", color: "#fff", mr: 1, ml: 1 }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
