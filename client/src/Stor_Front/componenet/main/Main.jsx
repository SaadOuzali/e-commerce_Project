import {
  Box,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import "./toggle.css";
import img1 from './productImage/trico.png'
import img2 from './productImage/trico2.png'
import img3 from './productImage/jeans.png'


import Section from "./Section";




export default function Main({ theme,data }) {
  const [alignment, setAlignment] = React.useState("web");
  
  // const [data, setData] = React.useState([
  //   {id:0, title: "Jeans", price: 15,img:img1 },
  //   {id:1, title: "T-Shirt", price: 10,img:img2 },
  //   { id:2,title: "Nike", price: 75,img:img3 },
  //   {id:3, title: "Denim Jeans", price: 15,img:img3 },
  //   {id:4, title: "Robe", price: 5  ,img:img3 },
  //   {id:5, title: "Bracelet", price: 15 ,img:img3 },
  //   { id:6,title: "Jordan", price: 100 ,img:img3 },
  //   { id:7,title: "Jordan", price: 150 ,img:img3 },

  // ]);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography variant="h6">Selected Products</Typography>
          <Typography fontWeight={300}>
            All our new arrivals in a exclusive brand selection
          </Typography>
        </Box>

        <Box>
          <ToggleButtonGroup
            color="error"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton
              value="left"
              aria-label="left aligned"
              sx={{
                bgcolor: theme.palette.bg1.main,
                color: theme.palette.text.primary,
              }}
              className="my_button"
            >
              ALL PRODUCTS
            </ToggleButton>
            <ToggleButton
              value="center"
              aria-label="centered"
              sx={{
                bgcolor: theme.palette.bg1.main,
                color: theme.palette.text.primary,
              }}
              className="my_button"
            >
              WOMEN CATEGORY
            </ToggleButton>
            <ToggleButton
              value="right"
              aria-label="right aligned"
              sx={{
                bgcolor: theme.palette.bg1.main,
                color: theme.palette.text.primary,
              }}
              className="my_button"
            >
              MEN CATEGORY
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>
      <Stack sx={{ marginTop: 8 }}>
        <Section  theme={theme} />
      </Stack>
    </Container>
  );
}
