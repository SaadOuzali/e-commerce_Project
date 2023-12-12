import express from "express"
import  Validate  from "express-validator"

import {
    createCategory,
    listCategories,
    searchCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../controllers/categoriesController"

const categoryRouter = express.Router()


categoryRouter.post('/', checkUserRole, createCategory);

categoryRouter.delete('/categories/:id', checkUserRole, deleteCategory);