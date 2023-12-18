// Import the Categorie model
const { v4 } = require("uuid");
const { Categories } = require("../models/Categories");
// Import the Subcategory model
const Subcategories = require("../models/Subcategorie");

// Controller to create a new category
const createNewCategory = async (req, res) => {
  const { category_name } = req.body;

  // Check if the category name already exists
  const existingCategory = await Categories.findOne({
    category_name: category_name
  });
  if (existingCategory) {
    return res.status(400).json({
      status: 400,
      message: `The category ${category_name} already exists`
    });
  }

  // Create a new category object
  const newCategory = {
    id: v4(),
    category_name: category_name,
    active: false
  };

  try {
    // Add the new category to the database
    const createdCategory = await Categories.create(newCategory);

    // Return success message
    return res.status(201).json({
      status: 201,
      message: "Category created successfully",
      data: createdCategory
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// Controller function to list all the categories
const listCategories = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const query = req.query.query || "";

    // Fetch categories from the database with pagination
    const categories = await Categories.find({
      category_name: { $regex: query, $options: "i" }
    }).skip(skip).limit(limit);

    // Check if there are categories available
    if (categories.length === 0) {
      return res.status(200).json({ status: 200, data: [] });
    }

    // If categories exist, return the data
    return res.status(200).json({ status: 200, data: categories });
  } catch (err) {
    // Handle errors
    return res.status(500).json({ status: 500, message: err.message });
  }
};

// GET method to get category by ID
const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Find the category by ID in your storage
    const category = await Categories.findOne({ _id: categoryId });

    if (!category) {
      return res
        .status(404)
        .json({ status: 404, message: "Category not found" });
    }

    return res.status(200).json({ status: 200, data: category });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

// Update Category Controller
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, active } = req.body;

    // Check if the category ID exists
    const category = await Categories.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid category ID" });
    }

    // Check if the provided category name already exists
    const existingCategory = await Categories.findOne({ category_name });
    if (existingCategory && existingCategory._id.toString() !== id) {
      return res.status(400).json({
        status: 400,
        message: `The category ${category_name} already exists`
      });
    }

    // Update category data
    category.category_name = category_name;
    category.active = active || false; // Set default value if not provided

    // Save updated category
    await category.save();

    return res
      .status(200)
      .json({ status: 200, message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

// DELETE method to delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the category exists
    const category = await Categories.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid category id" });
    }

    // Check if the category has attached subcategories
    const subcategories = await Subcategories.findById(id);
    if (subcategories) {
      return res.status(400).json({
        status: 400,
        message: "Subcategories attached, cannot delete this category"
      });
    }

    // Perform deletion if all conditions are met
    await Categories.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ status: 200, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    // Handle any unexpected errors
    return res.status(500).json({ status: 500, ...error });
  }
};

module.exports = {
  createNewCategory,
  listCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
