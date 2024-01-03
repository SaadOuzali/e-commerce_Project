const { body } = require("express-validator");
const { Router } = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const {
  loginController,
  signupController,
  getProfileCustomerController,
  getCustomerByIdController,
  updateCustomerController,
  updateCustomerDataController,
  deleteCustomerController,
  searchCustomerController,
  listCustomersController,
} = require("../controllers/customerController");
const {
  generateJWT,
  generateRefreshToken,
  verifyRefreshToken,
  verifyJWT,
  generateTokenEmail,
} = require("../middleware/token");
const { authenticateCustomer } = require("../middleware/customerAuth");
const {
  checkEmailExists,
  createCustomer,
} = require("../middleware/checkEmail");
const {
  getCustomerProfile,
  getCustomerById,
} = require("../middleware/getCustomer");
const { checkPrivileges } = require("../middleware/checkPrivileges");
const {
  updateCustomer,
  updateDataCustomer,
} = require("../middleware/updateCustomer");
const { deleteCustomer } = require("../middleware/deleteCustomer");
const {
  searchCustomer,
  listCustomers,
} = require("../middleware/searchCustomer");
const { checkValidationResult } = require("../middleware/authMiddleware");
const Customer = require("../models/Customer");
const { sendEmail } = require("../middleware/email");

const customerRouter = Router();

//login DONE
customerRouter.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Please enter your email")
      .isEmail()
      .withMessage("Correct your email")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Please enter your password")
      .isStrongPassword()
      .withMessage("It is not strong password"),
  ],
  checkValidationResult,
  authenticateCustomer,
  generateJWT,
  generateRefreshToken,
  loginController
);

//signup DONE
customerRouter.post(
  "/signup",
  [
    body("first_name").notEmpty().withMessage("Please enter your first name"),
    body("last_name").notEmpty().withMessage("Please enter your last name"),
    body("email")
      .notEmpty()
      .withMessage("Please enter your email")
      .isEmail()
      .withMessage("Correct your email")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Please enter your password")
      .isStrongPassword()
      .withMessage("It is not strong password"),
  ],
  checkValidationResult,
  checkEmailExists,
  createCustomer,
  generateTokenEmail,
  sendEmail,
  signupController
);

// http://localhost:0000/v1/customers?query=abdel&page=1&sort=DESC
//search DONE except privileges
customerRouter.get(
  "/search",
  // verifyJWT,
  // checkPrivileges,
  searchCustomer,
  searchCustomerController
);

// http://localhost:0000/v1/customers?page=1&sort=DESC
// get list DONE except privileges
customerRouter.get(
  "/",
  // verifyJWT,
  listCustomers,
  listCustomersController
);

//email validation DONE
customerRouter.get("/email/validation", async (req, res, next) => {
  const secret_key_jwt = process.env.JWT_SECRET;
  const { token } = req.query;
  if (!token) {
    next({ status: 400, message: "no token" });
    return;
  }
  try {
    const decodedToken = await jwt.verify(token, secret_key_jwt);
    const customer = await Customer.findOne({
      _id: decodedToken._id,
    });
    if (!customer._id) {
      res.status(400).json({ message: "customer not found" });
      // next({ status: 400, message: "customer not found" });
      return;
    }
    if (customer.valid_account) {
      console.log("account already validated");
      res.status(400).json({ message: "account already validated" });
      // next({ status: 400, message: "account already validated" });
      return;
    }
    const updatedCustomer = await Customer.updateOne(
      { _id: customer._id },
      { valid_account: true }
    );
    if (updatedCustomer.modifiedCount == 0) {
      res.status(422).json({ message: "Customer not found" });
      return;
    }
    res.status(200).json({ message: "token validated successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Expired token" });
  }
});

//get profile DONE EXCEPT privileges : customer
customerRouter.get(
  "/profile",
  verifyJWT,
  // checkPrivileges,
  getCustomerProfile,
  getProfileCustomerController
);

//get by id DONE EXCEPT privileges : admin, manager
customerRouter.get(
  "/:id",
  verifyJWT,
  // checkPrivileges,
  getCustomerById,
  getCustomerByIdController
);

//update DONE EXCEPT privileges : admin, manager
customerRouter.put(
  "/:_id",
  verifyJWT,
  // checkPrivileges,
  updateCustomer,
  updateCustomerController
);

//update data DONE EXCEPT privileges : customer
customerRouter.patch(
  "/profile/update",
  verifyJWT,
  // checkPrivileges,
  updateDataCustomer,
  updateCustomerDataController
);

//delete DONE EXCEPT privileges : customer
customerRouter.delete(
  "/delete",
  // verifyJWT,
  // checkPrivileges,
  deleteCustomer,
  deleteCustomerController
);

module.exports = customerRouter;
