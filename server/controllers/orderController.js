const createController = (req, res, next) => {
  res.status(201).json({
    message: "order created successfully",
  });
};

const getOrderByIdController = (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: "order listed successfully",
    data: req.order,
  });
};

const listOrdersController = (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: "orders listed successfully",
    data: req.orders,
  });
};

const updateOrderController = (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: "order status updated successfully",
  });
};

module.exports = {
  createController,
  getOrderByIdController,
  listOrdersController,
  updateOrderController,
};
