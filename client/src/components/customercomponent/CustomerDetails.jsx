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
    // bgcolor: "background.paper",
    bgcolor: "#13123c",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "whitesmoke",
    borderRadius: "24px",
    borderColor: "transparent",
    // fontFamily: "Montserrat, sans-serif !important",
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          className="fw-bold"
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Customers Details
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "14px" }}
        >
          <p>
            <b>First Name :</b> {customer?.first_name}
          </p>
          <p>
            <b>Last Name :</b> {customer?.last_name}
          </p>
          <p>
            <b>Email :</b> {customer?.email}
          </p>
          <p>
            <b>Password :</b> {customer?.password}
          </p>
          <p>
            <b>Active Status :</b> {customer?.active ? "Active" : "Inactive"}
          </p>
          <p>
            <b>Active Status :</b>{" "}
            {customer?.valid_account ? "Active" : "Inactive"}
          </p>
          <p>
            <b>Last Login :</b> {customer?.last_login}
          </p>
          <p>
            <b>Creation Date :</b> {customer?.creation_date}
          </p>
          <p>
            <b>Date of Creation :</b> {customer?.createdAt}
          </p>
          <p>
            <b>Date of Update :</b> {customer?.updatedAt}
          </p>
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
