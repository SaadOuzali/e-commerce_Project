const Customer = require("../models/Customer");

const validateLoginCredentials = async (req, email, password) => {
  try {
    const customer = await Customer.findOne({ email, password });
    if (!customer) {
      return false;
    }
    req.customer = customer;
    return true;
  } catch (err) {
    console.log("ERROR UGH: ", err);
    return false;
  }
};

const authenticateCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isValid = await validateLoginCredentials(req, email, password);
    const customer = req.customer;
    if (!isValid) {
      const err = new Error("Invalid login credentials");
      res.status(401).json({
        status: 401,
        message: "invalid credentials",
      });
      return;
    }
    if (!customer.active) {
      res.status(401).json({
        status: 401,
        message: "Account is not active",
      });
      return;
    }
    if (!customer.valid_account) {
      res.status(401).json({
        status: 401,
        message: "Account is not validated",
      });
      return;
    }
    next();
  } catch (err) {
    console.log("ERROR UGH: ", err);
    res.status(500).json({ message: "Server Error!!!!" });
  }
};

module.exports = { authenticateCustomer };
