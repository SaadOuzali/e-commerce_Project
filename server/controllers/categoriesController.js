// Import the Subcategory model
const Subcategorie = require("../models/Subcategorie")
// Import the Categorie model
const Category = require('../models/Categories');

  
  // Mock database or category storage
  let categories = [];
  
  // Controller function to create a new category
  const createCategory = (req, res) => {
    const { categoryName } = req.body;
  
    // Check if the category name already exists
    const existingCategory = categories.find(category => category.name === categoryName);
    if (existingCategory) {
      return res.status(400).json({ status: 400, message: `The category ${categoryName} already exists` });
    }
  
    // If the category doesn't exist, create a new category
    const newCategory = {
      name: categoryName,
      active: false // Set active status to false by default
      // Add any other properties you might need
    };
  
    categories.push(newCategory); // Add the new category to the database/storage
  
    return res.status(201).json({ status: 201, message: 'Category created successfully' });
  };


  // Controller function to handle the GET request for listing categories
const listCategories = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;
  
    try {
      const categories = await Category.find({})
        .limit(limit)
        .skip(skip)
        .exec();
  
      const responseData = {
        status: 200,
        data: categories || [], // Return an empty array if no data is found
      };
  
      res.status(200).json(responseData);
    } catch (err) {
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  };


  // Controller function to handle GET request for searching categories
function searchCategories(req, res) {
    const { query = '', page = 1 } = req.query;
  
    // Filter categories based on the search query and pagination
    const filteredCategories = categoriesData.filter(category =>
      category.categoryName.toLowerCase().includes(query.toLowerCase())
    );
  
    // Calculate pagination
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const paginatedCategories = filteredCategories.slice(startIndex, endIndex);
  
    // Return response
    if (paginatedCategories.length > 0) {
      return res.status(200).json({
        status: 200,
        data: paginatedCategories
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: []
      });
    }
  }
  

  // Controller to get category by ID
const getCategoryById = (req, res) => {
    const categoryId = req.params.id; // Assuming the ID is passed as a route parameter
  
    const category = categories.find(cat => cat._id === categoryId);
  
    if (!category) {
      return res.status(404).json({ status: 404, message: "Category not found" });
    }
  
    return res.status(200).json({ status: 200, data: [category] });
  };


 

// Update category by ID
const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { category_name, active } = req.body;

  try {
    // Check if category ID exists
    const category = await Category.findById(categoryId); // Replace with your database logic
    if (!category) {
      return res.status(404).json({ status: 404, message: "Invalid category ID" });
    }

    // Check if category name is unique
    const existingCategory = await Category.findOne({ category_name });
    if (existingCategory && existingCategory._id.toString() !== categoryId) {
      return res.status(400).json({ status: 400, message: "Category name must be unique" });
    }

    // Update category
    category.category_name = category_name;
    category.active = active;
    await category.save(); // Save changes

    return res.status(200).json({ status: 200, message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

  

// Controller function to delete a category
const deleteCategory = (req, res) => {
    // Get the user role from the authentication token
    const userRole = getUserRoleFromToken(req.headers.authorization);
  
    // Assuming CategoryModel represents your model for categories
    const categoryId = req.params.id; // Assuming the ID is passed in the URL path
  
    // Check if the category ID is valid
    if (!isValidCategoryId(categoryId)) {
      return res.status(404).json({ status: 404, message: "Invalid category ID" });
    }
  
    // Check if the category exists in the database
    const category = CategoryModel.findById(categoryId);
  
    if (!category) {
      return res.status(404).json({ status: 404, message: "Invalid category ID" });
    }
  
    // Check if the category has attached subcategories
    if (category.subcategories.length > 0) {
      return res.status(400).json({ status: 400, message: "Subcategories attached, cannot delete this category" });
    }
  
    // Perform the deletion if all conditions are met
    CategoryModel.findByIdAndDelete(categoryId, (err) => {
      if (err) {
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
      }
  
      return res.status(200).json({ status: 200, message: "Category deleted successfully" });
    });
  };
  
  
  
//   router.delete('/categories/:id', deleteCategory);
  


  export {
    createCategory,
    listCategories,
    searchCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
  }
  