import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";

const OrderDetailsModal = ({ order, open, handleClose }) => {
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
          Order Details
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "14px" }}
        >
          <p>
            <b>Total Price:</b> {order?.cart_total_price}
          </p>
          <p>
            <b>Order Date:</b> {order?.order_date}
          </p>
          <p>
            <b>Status:</b> {order?.status}
          </p>
        </Typography>
        <Typography
          className="fw-bold"
          style={{ fontFamily: "Montserrat, sans-serif", marginTop: "20px" }}
        >
          Order Products
        </Typography>

        {order?.order_items?.map((prd, index) => (
          <Accordion
            style={{
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            key={index}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{
                backgroundColor: "#f7f7f7",
                borderBottom: "1px solid #ddd",
              }}
            >
              <Typography
                style={{ fontWeight: "bold", fontFamily: "Montserrat" }}
              >
                {prd.product_id.product_name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ backgroundColor: "#fff", padding: "16px" }}
            >
              <Typography
                style={{ marginBottom: "8px", fontFamily: "Montserrat" }}
              >
                <b>Quantity : </b> {prd.quantity}
              </Typography>
              <Typography
                style={{ marginBottom: "8px", fontFamily: "Montserrat" }}
              >
                <b>Product Short Description : </b>
                {prd.product_id.short_description}
              </Typography>
              <Typography
                style={{ marginBottom: "8px", fontFamily: "Montserrat" }}
              >
                <b>Product Price : </b> {prd.product_id.price}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        {/* <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          style={{ fontFamily: "Montserrat, sans-serif", fontSize: "14px" }}
        >
          <p>
            <b>Total Price :</b> {order?.cart_total_price}
          </p>
          <p>
            <b>Order Date :</b> {order?.order_date}
          </p>
          <p>
            <b>Status :</b> {order?.status}
          </p>
          <p>
            <b>Order Products</b>
            {order?.order_items?.map((prd, index) => (
              <div key={index}>
                <p>
                  <b>Product Name:</b> {prd.product_id.product_name}
                </p>
                <p>
                  <b>Quantity:</b> {prd.quantity}
                </p>
                <p>
                  <b>Product short description:</b>{" "}
                  {prd.product_id.short_description}
                </p>
                <p>
                  <b>Product price:</b> {prd.product_id.price}
                </p>
              </div>
            ))}
          </p>
        </Typography> */}
      </Box>
    </Modal>
  );
};

OrderDetailsModal.propTypes = {
  order: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default OrderDetailsModal;
