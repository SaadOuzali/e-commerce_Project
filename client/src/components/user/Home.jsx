// import React from 'react'
import { Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import request from "../axios";
import { toast } from "react-toastify";
import Barchart from "../../statistics/Barchart";
import PieChart from "../../statistics/PieChart";
import Row1 from "./dashboardComponent/Row1";
import Row2 from "./dashboardComponent/Row2";
import Row3 from "./dashboardComponent/Row3";

const Home = () => {
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
      <Typography
        textAlign={"center"}
        marginBottom={4}
        variant="h4"
        style={{ fontFamily: "Montserrat", fontWeight: "bold" }}
      >
        DASHBOARD
      </Typography>

      <Row1 />
      <Row2 />
      <Row3 />
    </>
  );
};

export default Home;
