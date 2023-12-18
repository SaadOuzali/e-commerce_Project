import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
export default function Drawers() {
  const [isdraweropen,setIsdraweropen]=useState(false)
  return (
   <>
   <IconButton onClick={()=>setIsdraweropen(true)}>
      < MenuIcon />
   </IconButton>
    <Drawer
    anchor="right"
    open={isdraweropen}
    onClose={()=>setIsdraweropen(false)}
  >
    <Box>
      hhhhhh
    </Box>
  </Drawer>
   </>
  )
}
