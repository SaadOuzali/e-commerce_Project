import express from "express";
import Validate, { param } from "express-validator";

import {
    createSubcategory,
    listSubcategories,
    searchSubcategories,
    getSubcategoryById,
    updateSubcategory,
    deleteSubcategory,
} from "../controllers/subcategoriesController";

const subcategoryRouter = express.Router();

subcategoryRouter.post("/", checkUserRole, createSubcategory);

subcategoryRouter.get("/", listSubcategories);

subcategoryRouter.get("/", searchSubcategories);

subcategoryRouter.get("/", getSubcategoryById);

subcategoryRouter.put("/:id", checkUserRole, param("id").isMongoId(), updateSubcategory);

subcategoryRouter.delete("/", checkUserRole, deleteSubcategory)