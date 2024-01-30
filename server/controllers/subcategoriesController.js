// Import the Subcategory model
const Subcategorie = require("../models/Subcategorie");
// Import the Categorie model
const Category = require("../models/Categories");
const { v4 } = require("uuid");

// Function to create a new subcategory
const createSubcategory = async (req, res, next) => {
  const { subcategory_name, active = false, category_id } = req.body;

  try {
    // Check uniqueness of subcategory subcategory_name in the database
    // const existingSubcategory = await Subcategorie.findOne({
    //   subcategory_name
    // });

    // if (existingSubcategory) {
    //   return res
    //     .status(400)
    //     .json({ error: "subcategory subcategory_name already exists" });
    // }

    // Create the new subcategory
    const id = v4();
    const slug = `${subcategory_name}_${id}`;
    const newSubcategory = await Subcategorie.create({
      subcategory_name,
      active,
      category_id,
      id,
      slug,
    });

    return res.status(201).json({
      message: "Subcategory created successfully",
      data: newSubcategory,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 500;
    next(err);
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
      .populate("category_id", "category_name") // Populate category field from Category collection/table, return only 'name'
      .exec();

    // If no subcategories exist, return an empty array
    if (!subcategories || subcategories.length === 0) {
      return res.json([]);
    }

    return res.status(200).json({ status: "sucess", data: subcategories });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 500;
    next(err);
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
      subcategoryName: { $regex: new RegExp(query, "i") }, // Case-insensitive search
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("category_id")
      .select("subcategory_name category_id active");

    // If no subcategories exist, return an empty array
    if (subcategories.length === 0) {
      return res.status(200).json({ status: 200, data: [] });
    }

    // Return the formatted subcategory data list
    return res.status(200).json({ status: 200, data: subcategories });
  } catch (error) {
    // Handle errors appropriately
    return res
      .status(500)
      .json({ status: 500, error: "Internal server error" });
  }
}

// Controller function to get subcategory by ID
async function getSubcategoryById(req, res) {
  const { id } = req.params; // Assuming the ID is passed as a route parameter

  try {
    // Retrieve the subcategory by its ID
    const subcategory = await Subcategorie.findById(id).populate("category_id"); // findById()

    if (!subcategory) {
      return res
        .status(404)
        .json({ status: 404, message: "Subcategory not found" });
    }

    // Prepare the response object with subcategory details and category name
    const response = {
      status: 200,
      data: subcategory,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
}

// Update subcategory data controller function
async function updateSubcategory(req, res) {
  const { id } = req.params; // Getting subcategory ID from path parameter

  // Perform the update operation (this is a hypothetical function)
  Subcategorie.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  }).
  then((response) => {
    if (response) {
      return res
        .status(200)
        .json({ data: response, message: "Subcategory updated successfully" });
    }
    return res.status(500).json({ message: "Subcategory not updated" });
  });

  // try {
  //   const updatesub=await Subcategorie.updateOne({ _id: id }, req.body, {
  //     new: true});
  //     if(!updatesub)
  // } catch (error) {
    
  // }
}

// Controller function to delete subcategory by ID
const deleteSubcategory = (req, res) => {
  const subcategoryId = req.params.id;

  Subcategorie.deleteOne({ _id: subcategoryId })
    .then((response) => {
      if (response.deletedCount)
        return res
          .status(200)
          .send({ message: "Subcategory got deleted successfully" });

      res.status(400).send({ message: "Subcategory not deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Something went wrong" });
    });
};

// to faetch all subcategory
const fetch_category_controller = async (req, res, next) => {
  try {
    const findsubcategory = await Subcategorie.find();
    res.status(200).json({
      status: "success",
      data: findsubcategory,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 500;
    next(err);
  }
};

module.exports = {
  createSubcategory,
  listSubcategories,
  searchSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
  fetch_category_controller,
};
