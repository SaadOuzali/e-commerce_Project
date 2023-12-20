import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Chip, Grid, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateProductModal = ({
  open,
  handleClose,
  setIsCreateOpen,
  setProducts,
}) => {
  const [createProductModal, setCreateProductModal] = useState({
    product_name: "",
    sku: "",
    short_description: "",
    long_description: "",
    quantity: "",
    price: "",
    active: "",
    product_img: null,
  });

  const handleCreateButton = useCallback(() => {
    console.log("CREAAAAAATE!!!!!!!!");
    axios
      .post("http://localhost:3000/v1/products/", createProductModal, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        console.log("Product created: ", data.data);
        toast.success(data?.message ?? "YAAAAAAY created!!!!");
        if (data) setProducts((prev) => [...prev, { ...data.data }]);
        setIsCreateOpen(false);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response.data?.message ?? "Couldn't create product");
        }
        console.error("Error creating product: ", err);
      });
  }, [createProductModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Name of the input: ", name);
    setCreateProductModal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
          Products
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="product_name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="SKU"
                  variant="outlined"
                  fullWidth
                  required
                  name="sku"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Short Description"
                  variant="outlined"
                  fullWidth
                  required
                  name="short_description"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Long Description"
                  variant="outlined"
                  fullWidth
                  required
                  name="long_description"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Active Status"
                  variant="outlined"
                  fullWidth
                  required
                  name="active"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  required
                  name="quantity"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  required
                  name="price"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {createProductModal.product_img ? (
                  <Chip color="info" label={1} />
                ) : (
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <VisuallyHiddenInput
                      type="file"
                      name="product_img"
                      onChange={(e) =>
                        setCreateProductModal((prev) => ({
                          ...prev,
                          product_img: e.target.files[0],
                        }))
                      }
                    />
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  onClick={handleCreateButton}
                  endIcon={<AddIcon />}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Typography>
      </Box>
    </Modal>
  );
};

CreateProductModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setIsCreateOpen: PropTypes.bool,
  setProducts: PropTypes.func,
};

export default CreateProductModal;
