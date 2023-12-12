import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import usercontext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";

import { toast } from "react-toastify";
import request from "../components/axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalUpdateOrder({id}) {
  const navigate =useNavigate()
  const [signup, setSignup] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    user_name: "",
    password: "",
    active: true,
    role: "",
  });

  // console.log(signup);
  const user = React.useContext(usercontext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit=async (id)=>{
   
    try {
      const {data}=await request.put(`/v1/orders`);
        if(data.status ===  "success"){
          toast.success('order created successfully');
          navigate('orders')
        }
    } catch ({response}) {
      if (response.status == 401) {
        toast.error("session expired please logain again");
        console.log("errorrrrrr§§§", response);
        navigate("/users/login");
      }
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <TextField
                label="First Name"
                variant="outlined"
                required
                value={signup.first_name}
                onChange={({ target }) =>
                  setSignup((prev) => {
                    return { ...prev, first_name: target.value };
                  })
                }
              />
              <TextField
                label="Last Name"
                variant="outlined"
                required
                value={signup.last_name}
                onChange={({ target }) =>
                  setSignup((prev) => {
                    return { ...prev, last_name: target.value };
                  })
                }
              />
              <TextField
                label="User Name"
                variant="outlined"
                required
                value={signup.user_name}
                onChange={({ target }) =>
                  setSignup((prev) => {
                    return { ...prev, user_name: target.value };
                  })
                }
              />
              <TextField
                label="Email"
                variant="outlined"
                required
                type="email"
                value={signup.email}
                onChange={({ target }) => setSignup((prev)=>{
                  return {...prev,email:target.value}
                })}
              />
              <TextField
                label="password"
                variant="outlined"
                required
                type="password"
                value={signup.password}
                onChange={({ target }) => setSignup((prev)=>{
                  return {...prev,password:target.value}
                })}
              />
               <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  
                  value={signup.role}
                  label="Role"
                  onChange={({ target }) =>
                    setSignup((prev) => {
                      return { ...prev, role: target.value };
                    })
                  }
                >
                  <MenuItem value={"admin"}>Processing</MenuItem>
                  <MenuItem value={"manager"}>Shipped</MenuItem>
                  <MenuItem value={"manager"}>Delivered</MenuItem>
                  <MenuItem value={"manager"}>pending</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={signup.active}
                    onChange={({target}) => setSignup((prev)=>{
                        return {...prev,active :target.checked}
                    })}
                  />
                }
                label="Active"
              />
            </Stack>
            <Button variant="contained" onClick={()=>handleEdit(id)}>save</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
