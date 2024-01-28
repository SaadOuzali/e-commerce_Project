import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Grid, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import request from "../axios";

const EditCustomer = ({
  customer,
  open,
  handleClose,
  setIsEditOpen,
  setSelectedCustomer,
  setCustomers,
}) => {
  const handleInputChange = (fieldName, value) => {
    setSelectedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [fieldName]: value,
    }));
  };
  const handleEditButton = useCallback(() => {
    const id = customer.id;
    console.log(id);
    // delete customer._id;
    request
      .put("/v1/customers/" + id, customer)
      .then(({ data }) => {
        const newCustomer = data.data;
        console.log("data:  ", data);
        setIsEditOpen(false);
        setCustomers((prev) =>
          prev.map((cust) => (cust.id === id ? newCustomer : cust))
        );
        console.log(data.data);
        toast.success(data?.message ?? "YAAAAAAY edited!!!!");
      })
      .catch((err) => console.log("Error editing: ", err));
  }, [customer]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: "background.paper",
    // border: "2px solid #000",
    bgcolor: "whitesmoke",
    boxShadow: 24,
    p: 4,
    color: "#13123c",
    borderRadius: "24px",
    borderColor: "transparent",
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
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{ fontFamily: "Montserrat" }}
          className="fw-bold"
        >
          Customers
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="customer_name"
                  value={customer?.first_name}
                  onChange={(e) =>
                    handleInputChange("first_name", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="last_name"
                  value={customer?.last_name}
                  onChange={(e) =>
                    handleInputChange("last_name", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  name="sku"
                  value={customer?.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  name="password"
                  value={customer?.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  endIcon={<EditIcon />}
                  onClick={() => handleEditButton()}
                  sx={{
                    backgroundColor: "#13123c",
                    padding: "10px 20px",
                    margin: "5px",
                    borderRadius: "5px",
                    textTransform: "none", // Prevents uppercase transformation
                    "&:hover": {
                      backgroundColor: "#0f0f2f", // darker color on hover
                    },
                    "&:active": {
                      backgroundColor: "#0d0d1f", // darker color on active/click
                    },
                    "&:focus": {
                      // Optional
                    },
                    "& .MuiButton-endIcon": {
                      marginLeft: "8px", // space between text and icon
                    },
                  }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Typography>
      </Box>
    </Modal>
  );
};

EditCustomer.propTypes = {
  customer: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setIsEditOpen: PropTypes.bool,
  setSelectedCustomer: PropTypes.func,
  setCustomers: PropTypes.func,
};

export default EditCustomer;
