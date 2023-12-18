const express = require("express");
const { param } = require("express-validator");

const {
  createSubcategory,
  listSubcategories,
  searchSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory
} = require("../controllers/subcategoriesController");


const {
  CheckJWT,
  admin_OR_manager,
  ValidatFields,
  refreshAccToken,
} = require("../middleware/authMiddleware");

const subcategoryRouter = express.Router();

subcategoryRouter.post("/", CheckJWT, admin_OR_manager, ValidatFields, refreshAccToken, createSubcategory);

subcategoryRouter.get("/",CheckJWT, admin_OR_manager, ValidatFields, refreshAccToken, listSubcategories);

subcategoryRouter.get("/",CheckJWT, admin_OR_manager, ValidatFields, refreshAccToken, searchSubcategories);

subcategoryRouter.get("/:id", CheckJWT, admin_OR_manager, ValidatFields, refreshAccToken, getSubcategoryById);

subcategoryRouter.put("/:id", param("id").isMongoId(), ValidatFields, updateSubcategory);

subcategoryRouter.delete("/:id", param("id").isMongoId(), ValidatFields, deleteSubcategory);

module.exports = subcategoryRouter;
