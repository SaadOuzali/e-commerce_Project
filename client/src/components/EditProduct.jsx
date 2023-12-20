import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Grid, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

const EditProduct = ({
  product,
  open,
  handleClose,
  setIsEditOpen,
  setSelectedProduct,
  setProducts,
}) => {
  const handleInputChange = (fieldName, value) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [fieldName]: value,
    }));
  };
  const handleEditButton = useCallback(() => {
    const id = product._id;
    delete product._id;
    axios
      .patch("http://localhost:3000/v1/products/" + id, product)
      .then(({ data }) => {
        const newProduct = data.data;

        setIsEditOpen(false);
        setProducts((prev) =>
          prev.map((prd) => (prd._id === id ? newProduct : prd))
        );
        console.log(data.data);
        toast.success(data?.message ?? "YAAAAAAY edited!!!!");
      })
      .catch((err) => console.log("Error editing: ", err));
  }, [product]);

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
                  value={product?.product_name}
                  onChange={(e) =>
                    handleInputChange("product_name", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="SKU"
                  variant="outlined"
                  fullWidth
                  required
                  name="sku"
                  value={product?.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Short Description"
                  variant="outlined"
                  fullWidth
                  required
                  name="short_description"
                  value={product?.short_description}
                  onChange={(e) =>
                    handleInputChange("short_description", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Long Description"
                  variant="outlined"
                  fullWidth
                  required
                  name="long_description"
                  value={product?.long_description}
                  onChange={(e) =>
                    handleInputChange("long_description", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Active Status"
                  variant="outlined"
                  fullWidth
                  required
                  name="active"
                  value={product?.active}
                  onChange={(e) => handleInputChange("active", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  required
                  name="quantity"
                  value={product?.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  required
                  name="price"
                  value={product?.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  endIcon={<EditIcon />}
                  onClick={() => handleEditButton()}
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

EditProduct.propTypes = {
  product: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setIsEditOpen: PropTypes.bool,
  setSelectedProduct: PropTypes.func,
  setProducts: PropTypes.func,
};

export default EditProduct;
