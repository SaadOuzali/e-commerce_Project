const express = require("express");
const { param } = require("express-validator");

const {
  createNewCategory,
  listCategories,
  searchCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController01");

const {
  CheckJWT,
  admin_OR_manager,
  ValidatFields,
  refreshAccToken
} = require("../middleware/authMiddleware");

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  ValidatFields,
  createNewCategory
);

categoryRouter.get(
  "/",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  ValidatFields,
  listCategories
);

categoryRouter.get(
  "/:id",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  ValidatFields,
  getCategoryById,
);

categoryRouter.put(
  "/:id",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  param("id").isMongoId(),
  ValidatFields,
  updateCategory
);

categoryRouter.delete(
  "/:id",
  CheckJWT,
  refreshAccToken,
  admin_OR_manager,
  param("id").isMongoId(),
  ValidatFields,
  deleteCategory
);

module.exports = categoryRouter;
