const { Router } = require("express");
const userRouter = Router();
const { Users } = require("../models/User");
const { body, query, param } = require("express-validator");
const passport = require("passport");
const {
  ValidatFields,
  CheckJWT,
  VerifyRole,
  GenerateJWT,
  SendMail,
  isActive,
  admin_OR_manager,
  refreshAccToken,
} = require("../middleware/authMiddleware");
const {
  CheckSignInController,
  SignUpController,
  Get_UserbyIdController,
  Get_AllUsers_ScipingController,
  delete_UserById_Controller,
  modify_ById_Controller,
  search_user_Controller,
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
  GenerateJWT
);

//registre Router
// userRouter.post(
//   "/register",
//   [
//     body("first_name")
//       .notEmpty()
//       .withMessage("field first_name required")
//       .isLength({ min: 2 })
//       .withMessage("2 character  minimum")
//       .isLength({ max: 15 })
//       .withMessage("maximum 15 charactere"),
//     body("last_name")
//       .isLength({ min: 2 })
//       .withMessage("2 character  minimum")
//       .isLength({ max: 15 })
//       .withMessage("maximum 15 charactere"),
//     body("email")
//       .notEmpty()
//       .withMessage("email field required!")
//       .isEmail()
//       .withMessage("this is not email")
//       .normalizeEmail(),
//     body("role").notEmpty().withMessage("role field required"),
//     body("password")
//       .notEmpty()
//       .withMessage("password field required!")
//       .isStrongPassword()
//       .withMessage("password not strong"),
//   ],
//   ValidatFields,
//   SignUpController
// );

// create a new user
userRouter.post(
  "/",
  CheckJWT,
  refreshAccToken,
  VerifyRole,
  [
    body("first_name")
      .notEmpty()
      .withMessage("field first_name required")
      .isString()
      .withMessage("must a string value")
      .isLength({ min: 2 })
      .withMessage("2 character  minimum")
      .isLength({ max: 15 })
      .withMessage("maximum 15 charactere"),
    body("last_name")
      .notEmpty()
      .withMessage("failed last_name must a value")
      .isString()
      .withMessage("must a string value")
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
    body("role")
      .notEmpty()
      .withMessage("role field required")
      .isString()
      .withMessage("must a string value"),
    body("password")
      .notEmpty()
      .withMessage("password field required!")
      .isStrongPassword()
      .withMessage("password not strong"),
  ],
  ValidatFields,
  SignUpController,
  SendMail
);

//get 10 user for page
userRouter.get(
  "/",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  [
    query("page")
      .notEmpty()
      .withMessage("must page query")
      .isNumeric()
      .withMessage("must a number "),
  ],
  ValidatFields,
  Get_AllUsers_ScipingController
);


//search for a user controller

// search for a user

userRouter.get(
  "/search",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  [
    query("query")
      .notEmpty()
      .withMessage("must a query")
      .isString()
      .withMessage("must a string value"),
  ],
  ValidatFields,
  search_user_Controller
);

//get user by id
userRouter.get(
  "/:_id",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  [
    param("_id")
      .notEmpty()
      .withMessage("must a Mongo id param")
      .isMongoId()
      .withMessage("this is not a mongo Id"),
  ],
  ValidatFields,
  Get_UserbyIdController
);

//modify user by Id
userRouter.put(
  "/:_id",
  CheckJWT,
  refreshAccToken,
  VerifyRole,
  [
    param("_id")
      .notEmpty()
      .withMessage("must a Mongo id param")
      .isMongoId()
      .withMessage("this is not a mongo Id"),
    body("first_name")
      .notEmpty()
      .withMessage("field first_name required")
      .isString()
      .withMessage("must a string value")
      .isLength({ min: 2 })
      .withMessage("2 character  minimum")
      .isLength({ max: 15 })
      .withMessage("maximum 15 charactere"),
    body("last_name")
      .notEmpty()
      .withMessage("field last_name required")
      .isString()
      .withMessage("must a string value")
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
    body("role")
      .notEmpty()
      .withMessage("role field required")
      .isString()
      .withMessage("must a string value"),
    body("active").isBoolean().withMessage("password field required!"),
  ],
  ValidatFields,
  modify_ById_Controller
);

//delete a user by Id
userRouter.delete(
  "/:_id",
  CheckJWT,
  refreshAccToken,
  VerifyRole,
  [
    param("_id")
      .notEmpty()
      .withMessage("must id param ")
      .isMongoId()
      .withMessage("this is not a mongo Id"),
  ],
  ValidatFields,
  delete_UserById_Controller
);

module.exports = {
  userRouter,
};







