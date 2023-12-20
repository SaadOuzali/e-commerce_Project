import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const CustomerDetails = ({ customer, open, handleClose }) => {
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
    color: "black",
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Customers Details
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <p>First Name: {customer?.first_name}</p>
          <p>Last Name: {customer?.last_name}</p>
          <p>Email: {customer?.email}</p>
          <p>Password: {customer?.password}</p>
          <p>Creation_date: {customer?.creation_date}</p>
          <p>Active Status: {customer?.active ? "True" : "False"}</p>
          <p>Valid Account: {customer?.valid_account ? "True" : "False"}</p>
          <p>Created At: {customer?.createdAt}</p>
          <p>Updated At: {customer?.updatedAt}</p>
        </Typography>
      </Box>
    </Modal>
  );
};

CustomerDetails.propTypes = {
  customer: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default CustomerDetails;
