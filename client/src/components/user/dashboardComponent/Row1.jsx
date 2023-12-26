// import React from 'react'
import { Box, Button, Grid, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Typography from "@mui/material/Typography";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { toast } from "react-toastify";

import request from "../../axios";
import { fakeData } from "../../../util";
import Chart from "./Chart";

const Row1 = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  useEffect(() => {
    const alldocument = async () => {
      try {
        const { data } = await request.get("/v1/orders/countdocument");
        if (data.status === "success") {
          setData(data.data);
        }
      } catch ({ response }) {
        if (response.status == 401) {
          toast.error("session expired please logain again");
          navigate("/users/login");
        }
      }
    };

    alldocument();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Paper sx={{ bgcolor: "#FF7F50", p: 1.5 }} elevation={6}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack justifyContent={"center"}>
                <GroupIcon />
                <Typography gutterBottom component="div">
                  Users
                </Typography>
                {/* <Typography>{data.numberOfUsers}</Typography> */}
              </Stack>
              <Stack>
              <Box  height={"80px"} width={"150px"}   >
                  <Chart fakeData={[{id:"users",value:data.numberOfUsers}]} scheme={"blue"} />
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item md={3}>
          <Paper sx={{ bgcolor: "#6F00FF", p: 1.5 }} elevation={6}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack justifyContent={"center"}>
                <ProductionQuantityLimitsIcon />
                <Typography gutterBottom component="div">
                  Products
                </Typography>
                {/* <Typography>{data.numberOfProducts}</Typography> */}
              </Stack>
              <Stack>
              <Box  height={"80px"} width={"150px"}   >
                  <Chart fakeData={[{id:"products",value:data.numberOfProducts}]} scheme={"blue"} />
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item md={3}>
          <Paper sx={{ bgcolor: "#40E0D0", p: 1.5 }} elevation={6}>
            <Stack direction={"row"} justifyContent={"space-between"} >
              <Stack justifyContent={"center"}>
                <GroupAddIcon />
                <Typography gutterBottom component="div">
                  New Customers +
                </Typography>
                {/* <Typography>{data.numberOfcustomers}</Typography> */}
              </Stack>
              <Stack>
              <Box  height={"80px"} width={"150px"}   >
                  <Chart fakeData={[{id:"customers",value:data.numberOfcustomers}]} scheme={"blue"} />
                </Box>
               
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item md={3}>
          <Paper sx={{ bgcolor: "#007FFF", p: 1.5 }} elevation={6}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack justifyContent={"center"}>
                <GroupIcon />
                <Typography gutterBottom component="div">
                  Orders
                </Typography>
                {/* <Typography>{data.numberOforders}</Typography> */}
              </Stack>
              <Stack>
                <Box  height={"80px"} width={"150px"}   >
                  <Chart fakeData={[{id:"orders",value:data.numberOforders}]} scheme={"nivo"} />
                </Box>
                
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        
        {/* <Grid item md={3}>
          
        <Grid item md={3}>
          <Card sx={{ bgcolor: "#40E0D0" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Customers
              </Typography>
              <Typography>{data.numberOfcustomers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card sx={{ bgcolor: "#007FFF" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Orders
              </Typography>
              <Typography>{data.numberOforders}</Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </>
  );
};

export default Row1;
