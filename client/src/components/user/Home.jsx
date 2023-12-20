// import React from 'react'
import { Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import request from "../axios";
import { toast } from "react-toastify";

const Home = () => {
  const navigate=useNavigate()
  const [data,setData]=useState({});
  console.log("data",data);
useEffect(()=>{
 const alldocument=async ()=>{
  try {
    const {data}=await request.get('/v1/orders/countdocument');
   if(data.status ==="success"){
      setData(data.data)
   }
  } catch ({response}) {
    if (response.status == 401) {
      toast.error("session expired please logain again");
      navigate("/users/login");
    }
  }
 }

 alldocument()
},[])

  return (
    <>
    <Grid container spacing={2}>
      <Grid item md={3} >
        <Card sx={{ bgcolor:"#FF7F50" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Users
            </Typography>
        <Typography>{data.numberOfUsers}</Typography>
          </CardContent>
        
        </Card>
      </Grid>

      <Grid item md={3} >
        <Card sx={{ bgcolor:"  #6F00FF" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Products
            </Typography>
            <Typography>{data.numberOfProducts}</Typography>
          </CardContent>
        
        </Card>
      </Grid>

      <Grid item md={3} >
        <Card sx={{ bgcolor:"#40E0D0" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Customers
            </Typography>
            <Typography>{data.numberOfcustomers}</Typography>
          </CardContent>
        
        </Card>
      </Grid>

      <Grid item md={3} >
        <Card sx={{ bgcolor:"#007FFF" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Orders
            </Typography>
            <Typography>{data.numberOforders}</Typography>
          </CardContent>
        
        </Card>
      </Grid>

    </Grid>
    </>
  )
}

export default Home