const Customer = require("../models/Customer");

//we can update the customer in db but the customer we get is not updated => findOne, updateOne
async function updateCustomer(req, res, next) {
  try {
    const customerId = req.params._id;
    const customerData = req.body;
    const customer = await Customer.findOneAndUpdate(
      { _id: customerId },
      customerData,
      { new: true }
    );
    if (!customer) {
      const err = new Error("Customer not found");
      res.status(404).json({ status: 404, message: "invalid customer id" });
      return;
    }
    req.customer = customer;
    next();
  } catch (err) {
    console.log("ERROR UGH: ", err);
    res.status(500).json({ message: "SERVER ERROR UGH" });
  }
}

async function updateDataCustomer(req, res, next) {
  try {
    const customerId = req.customer._id;
    const customerData = req.body;
    const customer = await Customer.findOneAndUpdate(
      { _id: customerId },
      customerData
    );
    if (!customer) {
      const error = new Error("Customer not found");
      res.status(404).json({ status: 404, message: "invalid data id" });
      return;
    }
    req.customer = customer;
    next();
  } catch (err) {
    console.log("ERROR UGH: ", err);
    res.status(500).json({ message: "SERVER ERROR UGH" });
  }
}

module.exports = { updateCustomer, updateDataCustomer };
