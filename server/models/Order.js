const { Schema, model, Types } = require("mongoose");

const orderSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  customer_id: {
    type: Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  order_items: {
    type: Array,
    required: true,
  },
  order_date: {
    type: String,
    default: new Date().toString(),
    required: true,
  },
  cart_total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Order = model("Order", orderSchema);

module.exports = Order;
