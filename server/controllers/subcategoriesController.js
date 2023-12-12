import { validationResult } from "express-validator";

// Import the Subcategory model
const Subcategorie = require("../models/Subcategorie")
// Import the Categorie model
const Category = require('../models/Categories');



// Function to create a new subcategory
const createSubcategory = async (req, res) => {
    const { name, active = false } = req.body;

  try {
    // Check uniqueness of subcategory name in the database
    const existingSubcategory = await Subcategorie.findOne({ name });

    if (existingSubcategory) {
      return res.status(400).json({ error: 'subcategory name already exists' });
    }

    // Create the new subcategory
    const newSubcategory = await Subcategorie.create({ name, active });

    // Return success response
    return res.status(201).json({ message: 'Subcategory created successfully', data: newSubcategory });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Controller function to list all subcategories
async function listSubcategories(req, res) {
  // /subcategory/?page=21
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1; // Retrieve page number from query params, default to 1
      const limit = 10; // Limit of subcategories per page
  
      const offset = (page - 1) * limit; // Calculate offset for pagination
  
      // Retrieve subcategories with pagination and populate category name
      const subcategories = await Subcategorie.find()
        .skip(offset)
        .limit(limit)
        .populate('category_id', 'name') // Populate category field from Category collection/table, return only 'name'
        .exec();
  
      // If no subcategories exist, return an empty array
      if (!subcategories || subcategories.length === 0) {
        return res.json([]);
      }
  
      return res.json({data: subcategories});
    } catch (error) {
      console.error('Error listing subcategories:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
  
 

  // Controller function to search for subcategories
async function searchSubcategories(req, res) {
  const { query, page = 1 } = req.query;
  const limit = 10;
  let subcategories = [];

  try {
    // Get subcategories relative to the search query value and limit to 10 per page
    subcategories = await Subcategorie.find({
      subcategoryName: { $regex: new RegExp(query, 'i') } // Case-insensitive search
    })
    .limit(limit)
    .skip((page - 1) * limit)
    .populate("category_id")
    .select('subcategory_name category_id active');

    // If no subcategories exist, return an empty array
    if (subcategories.length === 0) {
      return res.status(200).json({ status: 200, data: [] });
    }

    // Return the formatted subcategory data list
    return res.status(200).json({ status: 200, data: subcategories });
  } catch (error) {
    // Handle errors appropriately
    return res.status(500).json({ status: 500, error: 'Internal server error' });
  }
}




// Controller function to get subcategory by ID
async function getSubcategoryById(req, res) {
  const { id } = req.params; // Assuming the ID is passed as a route parameter

  try {
    // Retrieve the subcategory by its ID
    const subcategory = await Subcategorie.findById(id).populate("category_id"); // findById()

    if (!subcategory) {
      return res.status(404).json({ status: 404, message: 'Subcategory not found' });
    }

    // Prepare the response object with subcategory details and category name
    const response = {
      status: 200,
      data: subcategory,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    return res.status(500).json({ status: 500, message: 'Internal server error' });
  }
}




// Update subcategory data controller function
function updateSubcategory(req, res) {
  const { id } = req.params; // Getting subcategory ID from path parameter
  const { subcategoryName, categoryID, active } = req.body; // Getting data from request body

  const errorsObj = validationResult(req);
  if(!errorsObj.isEmpty()) return res.status(404).json({ status: 404, message: 'Invalid subcategory ID' });

  // Perform the update operation (this is a hypothetical function)

  // updateSubcategoryInDatabase(id, subcategoryName, categoryID, active);
  Subcategorie.updateOne({_id:id}, req.bo)

  return res.status(200).json({ status: 200, message: 'Subcategory updated successfully' });
}



// Controller function to delete subcategory by ID
const deleteSubcategory = (req, res) => {
  const subcategoryId = req.params.id;
  
  // Find subcategory by ID
  const subcategory = subcategories.find((sub) => sub.id === subcategoryId);

  if (!subcategory) {
    return res.status(404).json({ status: 404, message: 'Invalid subcategory ID' });
  }

  if (subcategory.productsAttached > 0) {
    return res.status(400).json({ status: 400, message: 'Products attached, cannot delete this subcategory' });
  }

  // Delete subcategory
  subcategories = subcategories.filter((sub) => sub.id !== subcategoryId);

  return res.status(200).json({ status: 200, message: 'Subcategory deleted successfully' });
};

export {
  createSubcategory,
  listSubcategories,
  searchSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
};
   
