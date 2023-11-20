const { Router } = require("express");
const { body, param, query } = require("express-validator");
const path = require("path");
const {
  CheckJWT,
  admin_OR_manager,
  ValidatFields,
  refreshAccToken,
} = require("../middleware/authMiddleware");
const { Products } = require("../models/Product");
const multer = require("multer");
const upload = require("../multer");
const { v4 } = require("uuid");
const { cloudinary_Upload_Img } = require("../cloudinary");
const {
  create_product_controller,
  get_product_controller,
  get_product_bySearch_controller,
  find_product_byId_controller,
  update_product_controller,
  delete_product_controller,
} = require("../controllers/productController");
const productsRouter = Router();





//create a products
productsRouter.post(
  "/",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  [
    body("sku")
      .notEmpty()
      .withMessage("field sku required")
      .isString()
      .withMessage("field must a string value"),
    body("product_name")
      .notEmpty()
      .withMessage("field product_name required")
      .isString()
      .withMessage("field must a string value"),
    body("short_description")
      .notEmpty()
      .withMessage("field short_description required")
      .isString()
      .withMessage("field must a string value"),
    body("long_description")
      .notEmpty()
      .withMessage("field long_description required")
      .isString()
      .withMessage("field must a string value"),
    body("price")
      .notEmpty()
      .withMessage("field price required")
      .isNumeric()
      .withMessage("field must a numeric value"),
    // body("discount_price").isString().withMessage("field must a string value"),
    body("options")
      .notEmpty()
      .withMessage("field price required")
      .isArray()
      .withMessage("field must a array value"),
    body("subcategory_id")
      .notEmpty()
      .withMessage("field subcategory_id required")
      .isMongoId()
      .withMessage("field must a Mongo Id  value"),
  ],
  ValidatFields,
  // upload.single("file"),async (req,res,next)=>{

  //   const img=Buffer.from(req.file.buffer).toString("base64");
  //   let dataUrl="data:"+req.file.mimetype+";base64,"+img;
  //   try {
  //     const uploadimg=await cloudinary_Upload_Img(dataUrl);
  //     console.log(uploadimg);
  //     req.image=uploadimg.url;
  //     next()
  //   } catch (error) {
  //     next(error)
  //   }
  // },
  create_product_controller
);

//get all products 10 per page
productsRouter.get(
  "/",
  [
    query("page")
      .notEmpty()
      .withMessage("must page param")
      .isString()
      .withMessage("must a string value"),
  ],
  ValidatFields,
  get_product_controller
);

//get product by search query
productsRouter.get(
  "/search",
  CheckJWT,
  [
    query("query")
      .notEmpty()
      .withMessage("must a query value")
      .isString()
      .withMessage("must a value string"),
  ],
  ValidatFields,
  get_product_bySearch_controller
);

//find product by id
productsRouter.get(
  "/:_id",
  [
    param("_id")
      .notEmpty()
      .withMessage("must id param ")
      .isMongoId()
      .withMessage("this is not a mongo Id"),
  ],
  ValidatFields,
  find_product_byId_controller
);

//update a product
productsRouter.patch(
  "/:_id",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  [
    param("_id")
      .notEmpty()
      .withMessage("must un Id")
      .isMongoId()
      .withMessage("this is not a mongo Id"),
  ],
  ValidatFields,
  update_product_controller
);

//delete a products
productsRouter.delete(
  "/:_id",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  [
    param("_id")
      .notEmpty()
      .withMessage("must un Id")
      .isMongoId()
      .withMessage("this is not a mongo Id"),
  ],
  ValidatFields,
  delete_product_controller
);






//route to upload img
// productsRouter.post(
//   "/upload",
//   upload.single("file"),
//   async (req, res, next) => {
//     console.log(req.file);
//     const img = Buffer.from(req.file.buffer).toString("base64");
//     let dataUrl = "data:" + req.file.mimetype + ";base64," + img;
//     try {
//       const uploadimg = await cloudinary_Upload_Img(dataUrl);
//       console.log(uploadimg);
//       res.status(200).json({
//         message: "image uploaded",
//         image: uploadimg.url,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

//verify param is number or not
// function isNumber(id) {
//   const number = Number(id);
//   if (number) {
//     return true;
//   }
//   return false;
// }
module.exports = {
  productsRouter,
};
