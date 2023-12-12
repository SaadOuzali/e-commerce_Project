import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import usercontext from "../context/AuthContext";
import { toast } from "react-toastify";
import request from './axios'
import DrawerHeader from "./mui/user/DrawerHeader";
import AsideBar from "./user/AsideBar";
import Bar from "./user/Bar";
import { Box, CssBaseline, useTheme } from "@mui/material";




export default function PrivateRoute() {
    const navigate = useNavigate();
    const location =useLocation()
  const user = useContext(usercontext);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (!user.userdata.isConnected) {
        try {
          
          const {data, status} = await request.post("v1/users/token")
  
        
          
          console.log("status",status);
          
          if (data?.status == "success") {
            console.log("mz1");
            console.log(data);
            user.setUserdata((prev) => {
              return { ...prev, Data: data.data, isConnected: true };
            });
  
          } 
        } catch ({response}) {
            if(response.status == 401){
              toast.error("session expired please logain again");
              console.log("error",response);
               navigate("/users/login", {state: {path: location.pathname}})
            }
        }
      }
    };
    
      checkToken();
      
    
  }, [user.userdata.isConnected]);

  if(user.userdata.isConnected) return (
    <>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Bar open={open} setOpen={setOpen} />

      <AsideBar open={open} setOpen={setOpen} theme={theme} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader theme={theme} />
        <Outlet />
      </Box>
    </Box>
  </>
  )
}
