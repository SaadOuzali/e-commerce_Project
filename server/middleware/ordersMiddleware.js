const { v4: uuidv4 } = require("uuid");
const Order = require("../models/Order");

async function createOrder(req, res, next) {
  try {
    // Check if the customer is authenticated
    if (!req.customer) {
      return res.status(401).json({
        status: 401,
        message: "Customer not authenticated.",
      });
    }
    console.log(req.customer.valid_account);
    // Check if the customer has validated their email
    if (!req.customer.valid_account) {
      return res.status(403).json({
        status: 403,
        message: "Customer must validate their email before creating an order.",
      });
    }
    const { customer_id, order_items, cart_total_price } = req.body;
    const createOrder = await Order.create({
      id: uuidv4(),
      customer_id,
      order_items,
      cart_total_price,
      status: "open", // Default status = open
      //   order_date: new Date(), // Order date
    });
    if (!createOrder) {
      res.status(400).json({
        status: 400,
        message: "cannot create order",
      });
      return;
    }
    req.order = createOrder;
    next();
  } catch (err) {
    console.log("ERROR UGH: ", err);
    res.status(500).json({ message: "SERVER ERROR UGH" });
  }
}

async function getOrderById(req, res, next) {
  console.log(req.customer);
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({ id: orderId }).populate(
      "customer_id",
      "first_name last_name"
    );
    if (!order) {
      const err = new Error("order not found");
      res.status(404).json({
        status: 404,
        message: "order not found",
      });
      return;
    }
    req.order = order;
    next();
  } catch (err) {
    console.log("ERROR UGH: ", err);
    res.status(500).json({ message: "SERVER ERROR UGH" });
  }
}

async function listOrders(req, res, next) {
  try {
    // http://localhost:0000/v1/orders?page=1
    const page = Number(req.query.page) || 1;
    const orders = await Order.find({})
      .populate("customer_id", "first_name last_name")
      .skip((Number(page) - 1) * 10)
      .limit(10);

    const ordersData = orders.map((order) => ({
      id: order.id,
      order_date: order.order_date,
      itemsTotal: order.cart_total_price, // Assuming cart_total_price represents itemsTotal
      count: order.order_items.length,
      customer: {
        id: order.customer_id._id,
        first_name: order.customer_id.first_name,
        last_name: order.customer_id.last_name,
      },
    }));
    req.orders = ordersData;
    next();
  } catch (err) {
    console.log("ERROR UGH: ", err);
    res.status(500).json({ message: "SERVER ERROR UGH" });
  }
}

async function updateOrder(req, res, next) {
  try {
    const orderId = req.params.id;
    const orderData = req.body;
    const order = await Order.findOneAndUpdate({ id: orderId }, orderData, {
      new: true,
    });
    if (!order) {
      const err = new Error("order not found");
      res.status(404).json({ status: 404, message: "invalid order id" });
      return;
    }
    req.order = order;
    next();
  } catch (err) {
    console.log("ERROR UGH: ", err);
    res.status(500).json({ message: "SERVER ERROR UGH" });
  }
}

module.exports = { createOrder, getOrderById, listOrders, updateOrder };
