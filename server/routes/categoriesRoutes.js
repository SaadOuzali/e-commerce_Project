const { Router } = require("express");
const {
  CheckJWT,
  admin_OR_manager,
  ValidatFields,
  refreshAccToken,
} = require("../middleware/authMiddleware");
const { Categories } = require("../models/Categories");
const { body, query, param } = require("express-validator");
const { Subcategories } = require("../models/Subcategorie");
const {
  create_Categorie_controller,
  modify_categorie_controller,
  get_Category_controller,
  delete_categorie_controller,
  get_categoryById_controller,
  search_category_controller,
  get_Categorie_and_Subcategorie_controller,
  get_all_categories_controller,
} = require("../controllers/cataegoriescontroller");
const { delete_categories } = require("../middleware/categorieMiddleware");
const Subcategorie = require("../models/Subcategorie");
const categorieRouter = Router();

//create a new categories;
categorieRouter.post(
  "/",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  [
    body("category_name")
      .notEmpty()
      .withMessage(" field category_name must a value")
      .isString()
      .withMessage("must a string value"),
  ],
  ValidatFields,
  create_Categorie_controller
);

//modify a categories
categorieRouter.put(
  "/:_id",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  [
    param("_id")
      .notEmpty()
      .withMessage("id param required !")
      .isMongoId()
      .withMessage("this is not a mongo id "),
    body("category_name")
      .notEmpty()
      .withMessage("category_name field required")
      .isString()
      .withMessage("category_name field must a string value"),
    body("active")
      .notEmpty()
      .withMessage("active field required")
      .isBoolean()
      .withMessage("active field must a boolean value"),
  ],
  ValidatFields,
  modify_categorie_controller
);

//serach fo categorie
categorieRouter.get(
  "/search",
  [
    query("query")
      .notEmpty()
      .withMessage("must a query")
      .isString()
      .withMessage("query must a string value"),
  ],
  ValidatFields,
  search_category_controller
);

//get all categories 10 per page
// categorieRouter.get("/", get_Category_controller);



// to get categories with subcategorie
// categorieRouter.get("/cat-sub", get_Categorie_and_Subcategorie_controller);



// to get categories 
categorieRouter.get("/",get_all_categories_controller)




// get a categorie by slug
categorieRouter.get(
  "/:slug",
  // [
  //   param("_id")
  //     .notEmpty()
  //     .withMessage("must a param id")
  //     .isMongoId()
  //     .withMessage("this not a mongo id"),
  // ],
  // ValidatFields,
  get_categoryById_controller
);

//delete a categorie by id
categorieRouter.delete(
  "/:_id",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  [
    param("_id")
      .notEmpty()
      .withMessage("_id param required")
      .isMongoId()
      .withMessage("this is not a mongo id check your param"),
  ],
  ValidatFields,
  delete_categorie_controller
);








//search for categories
// categorieRouter.get(
//   "/",
//   [
//     query("query")
//       .notEmpty()
//       .withMessage("must a query")
//       .isString()
//       .withMessage("query must a string value"),
//   ],
//   ValidatFields,
//   async (req, res, next) => {
//     let page = 1;
//     const { query } = req.query;
//     if (Number(req.query.page)) {
//       page = req.query.page;
//     }
//     try {
//       const findcategorie = await Categories.find({
//         category_name: { $regex: "^" + query, $options: "i" },
//       })
//       .skip((Number(page)-1)*10)
//       .limit(10);

//       res.status(200).json({
//         status:"success",
//         data:findcategorie
//       })
//     } catch (error) {
//       const err=new Error(error.message);
//       err.status=501;
//       next(err)
//     }
//   }
// );

module.exports = {
  categorieRouter,
};
