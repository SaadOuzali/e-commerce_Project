// import { Box, CssBaseline, ThemeProvider } from "@mui/material";
// import React, { useState } from "react";
// import { ColorModeContext, useMode } from "./them";
// import Header1 from "./componenet/Header1";
// import Header2 from "./componenet/Header2";
// import Header3 from "./componenet/Header3";
// import Section from "./componenet/Section";
// import Slider from "./componenet/Slider";
// import IconSection from "./componenet/IconSection";
// import Main from "./componenet/main/Main";
// import Footer from "./componenet/Footer";
// import ModalTemplate from "./componenet/ModalTemplate";
// import TemplateModal from "./componenet/template/TemplateModal";
// import PersonIcon from "@mui/icons-material/Person";
// import TemplateFields from "./componenet/template/TemplateFields";
// import CartShoppingprovider from "./componenet/contexte/CartShoppingContexte";
import img1 from "./main/productImage/trico.png";
import img2 from "./main/productImage/trico2.png";
import img3 from "./main/productImage/jeans.png";

import { createContext, useState } from "react";
import { ColorModeContext, useMode } from "../them";
import CartShoppingprovider from "./contexte/CartShoppingContexte";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Header1 from "./Header1";
import Header2 from "./Header2";
import Header3 from "./Header3";
import Section from "./Section";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import Footer from "./Footer";
import { ScrollContext } from "./ScrollContext";

const arr = [
  { type: "email", label: "Email" },
  { type: "password", label: "Password" },
  { type: "email", label: "Email" },
];
const btn = { title: "Loginnn" };

export const Customercontexte = createContext({});

export default function Parent() {
  const [customer, setCustomer] = useState({
    customerData: null,
    iscustConnected: false,
  });
  const [openmdl, setOpenmdl] = useState(false);
  const [sectionRef, setSectionRef] = useState({ current: null });
  //   const [theme, colorMode] = useMode();
  const { theme } = useContext(ColorModeContext);

  return (
    <>
      <CartShoppingprovider>
        <Customercontexte.Provider value={{ customer, setCustomer }}>
          <ScrollContext.Provider value={{ sectionRef, setSectionRef }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Header1 />
              <Header2 />
              <Header3 />
              <Outlet />

              <Footer />
            </ThemeProvider>
            {/* <Box bgcolor={theme.palette.bg.main}>
        <Section />
        <IconSection theme={theme} />
        <Main theme={theme} data={data} />
      </Box> */}
            {/* < Footer /> */}
            {/* <ModalTemplate fields={arr} btn={btn}/> */}
            {/* < TemplateModal icon={< PersonIcon/>} openmdl={openmdl} setOpenmdl={setOpenmdl} >
        <TemplateFields fields={arr}  />
     </TemplateModal> */}
          </ScrollContext.Provider>
        </Customercontexte.Provider>
      </CartShoppingprovider>
    </>
  );
}
