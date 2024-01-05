import React, { useContext, useState } from 'react'
import { ColorModeContext, useMode } from '../them';
import { Box } from '@mui/material';
import img1 from './main/productImage/trico.png'
import img2 from './main/productImage/trico2.png'
import img3 from './main/productImage/jeans.png'
// import Section from './main/Section';
import IconSection from './IconSection';
import Main from './main/Main';
import Section from './Section';
import { useEffect } from 'react';

export default function Child() {
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
  // const [theme, colorMode] = useMode();
      const {theme} = useContext(ColorModeContext);

      useEffect(() => {
        console.log("Featured Rendering");
      }, [])
      
      
  return (
    <Box bgcolor={theme.palette.bg.main}>
        <Section />
        <IconSection theme={theme} />
        <Main theme={theme} data={data} />
        
    </Box>
  )
}
