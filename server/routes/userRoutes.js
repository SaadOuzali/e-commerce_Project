const { Router } = require("express");
const userRouter = Router();
const { Users } = require("../models/User");
const { body } = require("express-validator");
const passport = require("passport");
const { ValidatFields } = require("../middleware/authMiddleware");
const {
  CheckSignInController,
  GenerateJWTController,
  SignUpController,
} = require("../controllers/userController");

//login router
userRouter.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("email field required!")
      .isEmail()
      .withMessage("this is not email")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("password field required!")
      .isStrongPassword()
      .withMessage("password not strong"),
  ],
  ValidatFields,
  CheckSignInController,
  GenerateJWTController
);

//registre Router
userRouter.post(
  "/",
  [
    body("first_name")
      .notEmpty()
      .withMessage("field first_name required")
      .isLength({ min: 2 })
      .withMessage("2 character  minimum")
      .isLength({ max: 15 })
      .withMessage("maximum 15 charactere"),
    body("last_name")
      .isLength({ min: 2 })
      .withMessage("2 character  minimum")
      .isLength({ max: 15 })
      .withMessage("maximum 15 charactere"),
    body("email")
      .notEmpty()
      .withMessage("email field required!")
      .isEmail()
      .withMessage("this is not email")
      .normalizeEmail(),
    body("role").notEmpty().withMessage("role field required"),
    body("password")
      .notEmpty()
      .withMessage("password field required!")
      .isStrongPassword()
      .withMessage("password not strong"),
  ],
  ValidatFields,
  SignUpController
);


userRouter.post('/:id',)

module.exports = {
  userRouter,
};
