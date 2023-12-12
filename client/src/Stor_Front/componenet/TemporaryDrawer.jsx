import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink } from "react-router-dom";
import { Rotate90DegreesCcw } from "@mui/icons-material";

export default function () {
  const theme = useTheme();
  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Box>
      <IconButton>
        <Button onClick={toggleDrawer("top", true)}>
          <MenuIcon sx={{ color: theme.palette.text.secondary }} />
        </Button>
      </IconButton>

      <Drawer
        anchor={"top"}
        open={state["top"]}
        onClose={toggleDrawer("top", false)}
        sx={{ ".MuiPaper-root": { height: "100%" } }}
      >
        <Box sx={{ width: 444, mx: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={toggleDrawer("top", false)}
              sx={{ marginBottom: 5, ": hover":{rotate:"170deg",color:"red"} }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box>
            {[
              { mainLink: "Homme", subLink: ["item1", "item2"] },
              { mainLink: "Products" },
            ].map((item, index) => {
              return (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{item.mainLink} </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {item.subLink?.map((Item, index) => {
                        return (
                          <ListItem key={index} sx={{ p: 0, m: 0 }}>
                            <ListItemButton>
                              <ListItemText primary={Item} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
