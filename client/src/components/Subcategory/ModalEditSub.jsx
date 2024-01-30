import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useCallback, useState } from "react";
import { FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import request from "../axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

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

export default function ModalEditSub({ row,setSubcategory }) {
  const [open, setOpen] = useState(false);
  const [subName, setSubName] = useState({
    subcategory_name: row.subcategory_name,
    active: false,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("hna fsubname",subName);


  const handleEditing=(e)=>{
    const {value,name}=e.target;
    setSubName((prev)=>{
      return {...prev,[name]:value}
    })
  }

  const handleSave=useCallback(async(_id)=>{
    console.log(_id);
    try {
      const data=await request.put(`/v1/subcategories/${_id}`,subName);
      if(data.status==200){
        toast.success('order updated successfully');
        handleClose();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      if(error instanceof AxiosError){

      }
    }
  },[subName])

  return (
    <div>
      <Button onClick={handleOpen} endIcon={<EditIcon />}>
        Edit{" "}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={4}>
            <TextField
              label="New Subcategory Name"
              variant="outlined"
              required
              value={subName.subName}
              name="subcategory_name"
              onChange={({target}) =>setSubName((prev)=>{
                  return {...prev ,subcategory_name:target.value}
              })   
              }
            />
            <FormControlLabel
              label="active"
              control={
                <Switch
                  checked={subName.active}
                  onChange={({target}) =>
                    setSubName((prev)=>{
                      return {...prev,active : target.checked}
                    })
                  }
                />
              }
            />

            <Button variant="contained" onClick={()=>handleSave(row._id)}>SAVE</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
