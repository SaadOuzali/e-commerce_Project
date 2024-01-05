const express = require("express");
const { param } = require("express-validator");

const {
  createSubcategory,
  listSubcategories,
  searchSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
  fetch_category_controller
} = require("../controllers/subcategoriesController");


const {
  CheckJWT,
  admin_OR_manager,
  ValidatFields,
  refreshAccToken,
} = require("../middleware/authMiddleware");
const Subcategorie = require("../models/Subcategorie");

const subcategoryRouter = express.Router();

subcategoryRouter.post("/", CheckJWT, refreshAccToken,admin_OR_manager,createSubcategory);

subcategoryRouter.get("/", listSubcategories);

// to fatch all subcategory
subcategoryRouter.get("/all",fetch_category_controller)

subcategoryRouter.get("/",CheckJWT, admin_OR_manager, ValidatFields, refreshAccToken, searchSubcategories);

subcategoryRouter.get("/:id", CheckJWT, admin_OR_manager, ValidatFields, refreshAccToken, getSubcategoryById);

subcategoryRouter.put("/:id", param("id").isMongoId(), ValidatFields, updateSubcategory);

subcategoryRouter.delete("/:id", CheckJWT, refreshAccToken,admin_OR_manager,param("id").isMongoId(), ValidatFields, deleteSubcategory);

module.exports = subcategoryRouter;
