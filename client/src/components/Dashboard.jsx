import React, { useContext, useEffect } from "react";
import usercontext from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from './user/Navbar'
import { Box, Stack } from "@mui/material";
import ResponsiveAppBar from "./user/Navbar";



export default function Dashboard() {
  const navigate = useNavigate();
  const user = useContext(usercontext);

  // protecte Route to verify authentication of user
  // useEffect(() => {
  //   const checkToken = async () => {
  //     if (!user.userdata.isConnected) {
  //       const verifytoken = await fetch(
  //         "http://localhost:3000/v1/users/token",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-type": "application/json",
  //             origin: "*",
  //           },
  //         }
  //       );

  //       if (verifytoken?.status === 404) {
  //         toast.error("Missing token in cookies");
  //         navigate("/users/login");
  //         return;
  //       }

  //       const data = await verifytoken.json();
  //       if (data?.status == "success") {
  //         user.setUserdata((prev)=>{
  //           return {...prev,Data:data.data,isConnected:true}
  //         })
  //         navigate();
          
  //       }else{
  //         toast.error('your token expired login again');
  //         navigate('/users/login');
  //       }
  //     }
  //   };
  //   checkToken()
  // }, []);

// useEffect(()=>{
// const getalluser=
// },[])


  return (<>
  <ResponsiveAppBar/>
  
  </>)
    // <Stack sx={{border:"2px solid red"}} direction="row">
    //   <Box sx={{color:'red','&:hover':{backgroundColor:"primary.light"}}}>
      
      
    // </Box>
    // </Stack>
    
    
    
    
  
  // return <Navbar />
}
