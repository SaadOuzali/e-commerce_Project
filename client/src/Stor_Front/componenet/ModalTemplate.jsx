import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PersonIcon from "@mui/icons-material/Person";
import { Stack, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import handleActions from '../fetch'


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

// const arr = [{ type: "email",label:"Email" }, { type: "password",label:"Password" }];
// const btn={title:"Login"}
export default function ModalTemplate({ fields, btn, fn }) {
  const [inputValue, setInputValue] = useState({});
  //   const initialInputValue = useMemo(() => {
  //     let objectsOfInput = {};

  //     objectsOfInput = fields.map((field) => {
  //       return objectsOfInput.field;
  //     });

  // return obj
  //   }, [fields]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    // console.log("dial input",inputValue);
  const handlechange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleModal = async (e) => {
    e.preventDefault();
    console.log("dial input", inputValue);
    try {
        const data=await handleActions()
    } catch (error) {
        
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <PersonIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleModal}>
            
        <Stack sx={style} spacing={3}>
        <Box display={"flex"} justifyContent={"center"}>
            < LockOpenIcon />
        </Box>
          {fields.map((item, index) => {
            return (
              <TextField
                key={index + 1}
                label={item?.label}
                name={item?.label}
                variant="outlined"
                required
                type={item?.type}
                onChange={handlechange}
                autoComplete={false}
              />
            );
          })}
          <Button variant="contained" type="submit">
            {btn?.title}
          </Button>
        </Stack>

        <Link to={"/"}>
            Don't have an account ?
        </Link>
        </form>
      </Modal>
    </div>
  );
}
