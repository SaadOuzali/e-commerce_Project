import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import usercontext from "../../context/AuthContext";
import Switch from "@mui/material/Switch";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import request from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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

export default function ModalEdit({ name, data, _id, setUsers }) {
  const user = React.useContext(usercontext);
  const navigate = useNavigate();
  
  const [edituser, setEdituser] = React.useState({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    user_name: data.user_name,
    password: "",
    active: true,
    role: data.role,
  });
  //   console.log('data',data);
    // console.log("edituser", edituser);
  const handleChange = ({ target }) => {
    setEdituser((prev) => {
      return { ...prev, role: target.value };
    });
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   to save data updated
  const handleEditing = async (_id) => {
    // console.log(_id);
    const Data = edituser;
    try {
      const { data } = await request.put(`/v1/users/${_id}`, Data);
      console.log(data);
      if (data?.status === "success") {
        toast.success("user updated successfully");
        console.log(data.data);
        setUsers((prev)=>{
          return prev.map((prev)=>{
            return prev.id === data.data.id ? data.data : prev
          })
        })
       
      }
    } catch ({ response }) {
      console.log("fhadiiiiiii", response);
      if (response.status == 401) {
        toast.error("session expired please logain again");
        console.log("error", response);
        navigate("/users/login");
      }
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>{name} </Button>
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
                value={edituser.first_name}
                onChange={({ target }) =>
                  setEdituser((prev) => {
                    return { ...prev, first_name: target.value };
                  })
                }
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={edituser.last_name}
                onChange={({ target }) =>
                  setEdituser((prev) => {
                    return { ...prev, last_name: target.value };
                  })
                }
              />
              <TextField
                label="User Name"
                variant="outlined"
                value={edituser.user_name}
                onChange={({ target }) =>
                  setEdituser((prev) => {
                    return { ...prev, user_name: target.value };
                  })
                }
              />
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={edituser.email}
                onChange={({ target }) =>
                  setEdituser((prev) => {
                    return { ...prev, email: target.value };
                  })
                }
              />
              <TextField
                label="password"
                variant="outlined"
                type="password"
                value={edituser.password}
                onChange={({ target }) =>
                  setEdituser((prev) => {
                    return { ...prev, password: target.value };
                  })
                }
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={edituser.role}
                  label="Role"
                  onChange={({ target }) =>
                    setEdituser((prev) => {
                      return { ...prev, role: target.value };
                    })
                  }
                >
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"manager"}>Manager</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={edituser.active}
                    onChange={({target}) => setEdituser((prev)=>{
                        return {...prev,active :target.checked}
                    })}
                  />
                }
                label="Active"
              />
            </Stack>
            <Button variant="contained" onClick={() => handleEditing(_id)}>
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
