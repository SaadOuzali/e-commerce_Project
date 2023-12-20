const { delete_categories } = require("../middleware/categorieMiddleware");
const { Categories } = require("../models/Categories");
const Subcategorie = require("../models/Subcategorie");
const { Subcategories } = require("../models/Subcategorie");

async function create_Categorie_controller(req, res, next) {
  try {
    const createcategorie = await Categories.create({ ...req.body });
    //   if(!createcategorie){
    //     const error=new Error('the category already exist !');
    //     error.status=404
    //     next(error);
    //     return;
    //   }
    res.status(201).json({
      status: "success",
      message: "category create successfully",
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 400;
    next(err);
  }
}

async function modify_categorie_controller(req, res, next) {
  const { _id } = req.params;
  try {
    const updatecategorie = await Categories.findOneAndUpdate(
      { _id },
      { ...req.body },
      { new: true }
    );
    if (!updatecategorie) {
      const error = new Error("invalid category id");
      error.status = 404;
      next(error);
      return;
    }
    res.status(200).json({
      status: "success",
      message: "data updated successfully",
      data: updatecategorie,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 500;
    next(err);
  }
}

// get all categories 10 per page
async function get_Category_controller(req, res, next) {
  let page = 1;
  if (Number(req.query.page)) {
    page = req.query.page;
  }
  try {
    const findcategories = await Categories.find()
      .skip((Number(page) - 1) * 10)
      .limit(10);

    res.status(200).json({
      status: "success",
      categories: findcategories,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 501;
    next(err);
  }
}

//search for user
async function search_category_controller (req, res, next) {
  console.log(req.query);
  let page = 1;
  const { query } = req.query;
  if (Number(req.query.page)) {
    page = req.query.page;
  }
  try {
    const findcategorie = await Categories.find({
      category_name: { $regex: "^" + query, $options: "i" },
    })
      .skip((Number(page) - 1) * 10)
      .limit(10);

    res.status(200).json({
      status: "success",
      data: findcategorie,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 501;
    next(err);
  }
}






// delete categories
async function delete_categorie_controller(req, res, next) {
  const { _id } = req.params;
  try {
    const findsubcategories = await Subcategories.find({ category_id: _id });
    if (findsubcategories.length === 0) {
      delete_categories(req, res, next, _id);
      return;
    }
    const error = new Error(
      "subcategories attached, cannot delete this category"
    );
    error.status = 400;
    next(error);
  } catch (error) {
    const err = new Error(error.message);
    err.status = 400;
    next(err);
  }
}

// get a categorie by Id
async function get_categoryById_controller(req, res, next) {
  const { _id } = req.params;
  try {
    const findcategorie = await Categories.findOne({ _id });
    if (!findcategorie) {
      const error = new Error("category not found");
      error.status = 404;
      next(error);
      return;
    }
    res.status(200).json({
      status: "success",
      data: findcategorie,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 501;
    next(err);
  }
}




const get_Categorie_and_Subcategorie_controller=async (req, res, next) => {
  const returnedResponse = [];

 try {
   const findcategories = await Categories.find();
 
   for (let i = 0; i < findcategories.length; i++) {
     const category = findcategories[i];
     const _id = category._id;
 
     const categorySubs = await Subcategorie.find({ category_id: _id }).select('subcategory_name slug');
     console.log("hna fsub",categorySubs[0]);

     returnedResponse.push({
      category_name: category.category_name,
      sub:categorySubs
     });
   }
   
   res.status(200).json({
     data: returnedResponse,
   });

   
 } catch (error) {
  const err=new Error(error.message);
  err.status=500;
  next(err)
 }
};



module.exports = {
  create_Categorie_controller,
  modify_categorie_controller,
  get_Category_controller,
  delete_categorie_controller,
  get_categoryById_controller,
  search_category_controller,
  get_Categorie_and_Subcategorie_controller
};
