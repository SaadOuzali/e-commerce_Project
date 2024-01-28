import { Button, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import request from "../components/axios";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalUpdateOrder from "./ModalUpdateOrder";

export default function SingleOrder() {
  const { id } = useParams();
  const location = useLocation();
  console.log("dial location", location);
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  // to get order by Id
  useEffect(() => {
    const getorderById = async () => {
      try {
        const { data } = await request.get(`/v1/orders/${id}`);
        if (data.status === 200) {
          setOrder(data.data);
        }
      } catch ({ response }) {
        if (response.status == 401) {
          toast.error("session expired please login again");
          navigate("/users/login", { state: { path: "hello" } });
        }
      }
    };
    getorderById();
  }, []);

  // delete order by id

  return (
    <>
      <Link to={"/orders"}>
        <Button
          variant="outlined"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            color: "white",
            marginLeft: "20px",
            marginBottom: "20px",
            backgroundColor: "#43a047",
            padding: "10px 20px",
            borderRadius: "4px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#43a047", // darker shade on hover
            },
            "&:active": {
              backgroundColor: "#388e3c", // darker color on click
            },
            "& .MuiButton-endIcon": {
              marginLeft: "8px", // Space between text and icon
            },
          }}
          startIcon={<ArrowBackIosIcon sx={{ fontSize: "15px !important" }} />}
        >
          Back
        </Button>
      </Link>
      {/* <Stack sx={{marginTop:4,alignItems:"center"}}> */}
      <Card
        sx={{
          maxWidth: 800,
          marginTop: 4,
          bgcolor: "#13123c",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          color: "whitesmoke",
          borderRadius: "24px",
          borderColor: "transparent",
        }}
      >
        {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
        <CardContent sx={{ width: "800px" }}>
          <Stack spacing={3}>
            <Stack direction={"row"} spacing={3} sx={{ alignItems: "center" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{
                  fontSize: "17px",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Order Id:
              </Typography>
              <Typography
                style={{ fontSize: "17px", fontFamily: "Montserrat" }}
              >
                {order?.id}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{ alignItems: "center" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{
                  fontSize: "17px",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Customer First Name:
              </Typography>
              <Typography sx={{ fontSize: "17px", fontFamily: "Montserrat" }}>
                {order?.customer_id?.first_name}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{ alignItems: "center" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{
                  fontSize: "17px",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Customer Last Name:
              </Typography>
              <Typography sx={{ fontSize: "17px", fontFamily: "Montserrat" }}>
                {order?.customer_id?.last_name}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{ alignItems: "center" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{
                  fontSize: "17px",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Customer Email:
              </Typography>
              <Typography sx={{ fontSize: "17px", fontFamily: "Montserrat" }}>
                {order?.customer_id?.email}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{ alignItems: "center" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{
                  fontSize: "17px",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Order date:
              </Typography>
              <Typography sx={{ fontSize: "17px", fontFamily: "Montserrat" }}>
                {order?.order_date}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{ alignItems: "center" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{
                  fontSize: "17px",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Total Price:
              </Typography>
              <Typography sx={{ fontSize: "17px", fontFamily: "Montserrat" }}>
                {order?.cart_total_price}$
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{ alignItems: "center" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{
                  fontSize: "17px",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Status:
              </Typography>
              <Typography sx={{ fontSize: "17px", fontFamily: "Montserrat" }}>
                {order?.status}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <ModalUpdateOrder id={id} />
        </CardActions>
      </Card>
      {/* </Stack> */}

      {/* <Button onClick={()=> {navigate('/users/login',{ state: { path: 7 } })}}>hhhh</Button> */}
    </>
  );
}
