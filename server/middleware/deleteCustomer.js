const Customer = require("../models/Customer");

async function deleteCustomer(req, res, next) {
  const { _id } = req.params;
  try {
    // const customerId = req.payload._id;
    const customer = await Customer.findOneAndDelete({ _id });
    if (!customer) {
      const err = new Error("invalid customer id");
      err.status = 404;
      next(error);
      return;
    }
    next();
  } catch (err) {
    console.log("ERROR UGH: ", err);
    res.status(500).json({ message: "SERVER ERROR UGH " });
  }
}

module.exports = { deleteCustomer };
