const express = require("express");
const {
  createController,
  getOrderByIdController,
  listOrdersController,
  updateOrderController,
} = require("../controllers/orderController");
const {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
} = require("../middleware/ordersMiddleware");
const { verifyJWT } = require("../middleware/token");

const orderRouter = express.Router();

//DONE
orderRouter.post("/", verifyJWT, createOrder, createController);

//DONE
orderRouter.get("/:id", verifyJWT, getOrderById, getOrderByIdController);

//DONE
orderRouter.get("/", verifyJWT, listOrders, listOrdersController);

//DONE
orderRouter.put("/:id", verifyJWT, updateOrder, updateOrderController);

module.exports = orderRouter;
