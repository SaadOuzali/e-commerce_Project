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
          Products Details
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "14px" }}
        >
          <p>
            <b>Product Name :</b> {product?.product_name}
          </p>
          <p>
            <b>SKU :</b> {product?.sku}
          </p>
          <p>
            <b>Long Description :</b> {product?.long_description}
          </p>
          <p>
            <b>Short Description :</b> {product?.short_description}
          </p>
          <p>
            <b>Active Status :</b> {product?.active ? "Active" : "Inactive"}
          </p>
          <p>
            <b>Quantity :</b> {product?.quantity}
          </p>
          <p>
            <b>Price :</b> {product?.price}
          </p>
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
