import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const ProductDetails = ({ product, open, handleClose }) => {
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
          Products Details
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <p>Product Name: {product?.product_name}</p>
          <p>SKU: {product?.sku}</p>
          <p>Long Description: {product?.long_description}</p>
          <p>Short Description: {product?.short_description}</p>
          <p>Active Status: {product?.active ? "Active" : "Inactive"}</p>
          <p>Quantity: {product?.quantity}</p>
          <p>Price: {product?.price}</p>
        </Typography>
      </Box>
    </Modal>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ProductDetails;
