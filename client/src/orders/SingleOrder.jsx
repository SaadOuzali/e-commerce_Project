import { Button, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import request from "../components/axios";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalUpdateOrder from "./ModalUpdateOrder";

export default function SingleOrder() {
  const { id } = useParams();
  const location=useLocation()
  console.log("dial location",location );
  const navigate=useNavigate()
 const [order,setOrder]=useState({})
// to get order by Id
useEffect(()=>{
    const getorderById=async ()=>{
        try {
            const {data}=await request.get(`/v1/orders/${id}`);
            if(data.status===200){
               setOrder(data.data) 
            }
        } catch ({response}) {
            if (response.status == 401) {
                toast.error("session expired please logain again");
                navigate('/users/login',{ state: { path:'hello' } });
              }
        }
    }
    getorderById()
},[])
 

// delete order by id

  return (
    <>
      <Link to={"/orders"}>
        <Button variant="outlined" size="large">
          Back 
        </Button>
      </Link>
      {/* <Stack sx={{marginTop:4,alignItems:"center"}}> */}
      <Card sx={{ maxWidth: 800 ,marginTop:4}}>
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
      <CardContent sx={{width:"800px"}}>
        <Stack spacing={3}>
        <Stack direction={"row"} spacing={3} sx={{alignItems:"center",}}>
                <Typography gutterBottom variant="h5" component="div">
                  Order Id:
                </Typography>
                <Typography sx={{fontWeight:"400"}}> {order?.id}</Typography>
            
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{alignItems:"center",}}>
                <Typography gutterBottom variant="h5" component="div">
                  Customer First Name:
                </Typography>
                <Typography sx={{fontWeight:"600"}}> {order?.customer_id?.first_name}</Typography>
            
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{alignItems:"center",}}>
                <Typography gutterBottom variant="h5" component="div" >
                  Customer Last Name:
                </Typography>
                <Typography sx={{fontWeight:"400"}}> {order?.customer_id?.last_name}</Typography>
            
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{alignItems:"center",}}>
                <Typography gutterBottom variant="h5" component="div">
                  Customer Email:
                </Typography>
                <Typography sx={{fontWeight:"400"}}> {order?.customer_id?.email}</Typography>
            
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{alignItems:"center",}}>
                <Typography gutterBottom variant="h5" component="div">
                  Order date:
                </Typography>
                <Typography sx={{fontWeight:"400"}}> {order?.order_date}</Typography>
            
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{alignItems:"center",}}>
                <Typography gutterBottom variant="h5" component="div">
                  Total Price:
                </Typography>
                <Typography sx={{fontWeight:"400"}}> {order?.cart_total_price}$</Typography>
            
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{alignItems:"center",}}>
                <Typography gutterBottom variant="h5" component="div">
                  Status:
                </Typography>
                <Typography sx={{fontWeight:"400"}}> {order?.status}</Typography>
            
            </Stack>
        </Stack>
        
      </CardContent>
      <CardActions sx={{justifyContent:"center",marginBottom:"20px"}}>
        <ModalUpdateOrder  id={id} />
       
      </CardActions>
    </Card>
      {/* </Stack> */}

      {/* <Button onClick={()=> {navigate('/users/login',{ state: { path: 7 } })}}>hhhh</Button> */}
    </>
  );
}
