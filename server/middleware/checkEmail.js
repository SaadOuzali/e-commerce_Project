const { v4: uuidv4 } = require("uuid");
const Customer = require("../models/Customer");

async function checkEmailExists(req, res, next) {
  try {
    const { email } = req.body;
    const customer = await Customer.findOne({ email });
    if (customer) {
      const err = new Error("Email address already exists");
      err.status=400
      next(err)
      // res.status(400).json({
      //   status: 400,
      //   message: "Email address already exists",
      // });
      return;
    }
    next();
  } catch (err) {
    const error=new Error(err.message);
    error.status=500;
    next(error)
  }
}

async function createCustomer(req, res, next) {
  const { first_name, last_name, email, password } = req.body;
  try {
    const createCustomer = await Customer.create({
      id: uuidv4(),
      first_name,
      last_name,
      email,
      password,
    });
    // if (!createCustomer) {
    //   res.status(400).json({
    //     status: 400,
    //     message: "cannot create customer",
    //   });
    //   return;
    // }
    req.customer = createCustomer;
    next();
  } catch (err) {
    const error=new Error(err.message);
    error.status=500;
    next(error);
  }
}

module.exports = { checkEmailExists, createCustomer };
