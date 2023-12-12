import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { ColorModeContext, useMode } from "./them";
import Header1 from "./componenet/Header1";
import Header2 from "./componenet/Header2";
import Header3 from "./componenet/Header3";
import Section from "./componenet/Section";
import Slider from "./componenet/Slider";
import IconSection from "./componenet/IconSection";
import Main from "./componenet/main/Main";
import Footer from "./componenet/Footer";
import ModalTemplate from "./componenet/ModalTemplate";


const arr = [{ type: "email",label:"Email" }, { type: "password",label:"Password" }];
const btn={title:"Login"};

// fn=()=>{

// }

export default function App_Front() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        < Header1 />
        <Header2 />
        <Header3 />
      </ThemeProvider>
      <Box bgcolor={theme.palette.bg.main}>
        <Section />
        <IconSection theme={theme} />
        <Main theme={theme} />
      </Box>
      {/* < Footer /> */}
      <ModalTemplate fields={arr} btn={btn}/>
    </ColorModeContext.Provider>
  );
}
