import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

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

export default function TemplateModal({ children, icon, openmdl, setOpenmdl }) {
  const handleOpen = () => setOpenmdl(true);
  const handleClose = () => setOpenmdl(false);

  return (
    <div>
      <Button onClick={handleOpen}> {icon} </Button>
      <Modal
        open={openmdl}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} borderRadius={"20px"}>
          <Box textAlign={"center"} marginBottom={3}>
            Wa7ad salam o3alikom
          </Box>
          {children}
          <Box textAlign={"center"} marginTop={3}>
          Don't have account ?
            <Link to={'/registre'}>Registre</Link>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
