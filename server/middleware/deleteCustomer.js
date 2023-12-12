const Customer = require("../models/Customer");

async function deleteCustomer(req, res, next) {
  try {
    const customerId = req.payload._id;
    const customer = await Customer.findOneAndDelete(customerId);
    if (!customer) {
      const err = new Error("invalid customer id");
      res.status(404).json({ status: 404, message: "invalid customer id" });
      return;
    }
    next();
  } catch (err) {
    console.log("ERROR UGH: ", err);
    res.status(500).json({ message: "SERVER ERROR UGH " });
  }
}

module.exports = { deleteCustomer };
