import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
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
import TemplateModal from "./componenet/template/TemplateModal";
import PersonIcon from "@mui/icons-material/Person";
import TemplateFields from "./componenet/template/TemplateFields";
import CartShoppingprovider from "./componenet/contexte/CartShoppingContexte";
import img1 from './componenet/main/productImage/trico.png'
import img2 from './componenet/main/productImage/trico2.png'
import img3 from './componenet/main/productImage/jeans.png'



const arr = [{ type: "email",label:"Email" }, { type: "password",label:"Password" },{ type: "email",label:"Email" }];
const btn={title:"Loginnn"};

// fn=()=>{

// }

export default function App_Front() {
  const [openmdl, setOpenmdl] = useState(false);
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([
    {id:0, title: "Jeans", price: 15,img:img1 },
    {id:1, title: "T-Shirt", price: 10,img:img2 },
    { id:2,title: "Nike", price: 75,img:img3 },
    {id:3, title: "Denim Jeans", price: 15,img:img3 },
    {id:4, title: "Robe", price: 5  ,img:img3 },
    {id:5, title: "Bracelet", price: 15 ,img:img3 },
    { id:6,title: "Jordan", price: 100 ,img:img3 },
    { id:7,title: "Jordan", price: 150 ,img:img3 },

  ]);
  return (
    <>
      <CartShoppingprovider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        < Header1 />
        <Header2 data={data} />
        <Header3 />
      </ThemeProvider>
      <Box bgcolor={theme.palette.bg.main}>
        <Section />
        <IconSection theme={theme} />
        <Main theme={theme} data={data} />
      </Box>
      {/* < Footer /> */}
      {/* <ModalTemplate fields={arr} btn={btn}/> */}
     {/* < TemplateModal icon={< PersonIcon/>} openmdl={openmdl} setOpenmdl={setOpenmdl} >
        <TemplateFields fields={arr}  />
     </TemplateModal> */}
  </CartShoppingprovider>
      
    </>
  );
}
