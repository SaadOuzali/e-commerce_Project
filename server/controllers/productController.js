const { Products } = require("../models/Product");
const uuid = require("uuid");

//  create product controller
async function create_product_controller(req, res, next) {
  const id = uuid.v4();
  try {
    const createproduct = await Products.create({
      id,
      ...req.body,
      product_img: req.image,
    });
    res.status(201).json({
      status: "success",
      messag: "product created successfully",
      data: createproduct,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 500;
    next(err);
  }
}

// get all product 10 per page
async function get_product_controller(req, res, next) {
  let page = 1;
  if (Number(req.query.page)) {
    page = req.query.page;
  }

  try {
    const findproducts = await Products.find({})
      // .populate({ path: "subcategory_id", populate: { path: "category_id" } })
      .skip((Number(page) - 1) * 10)
      .limit(10);

    res.status(200).json({
      status: "success",
      data: findproducts,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 501;
    next(err);
  }
}

// get product by search query
async function get_product_bySearch_controller(req, res, next) {
  const { query } = req.query;
  const page = 1;
  if (Number(req.query.page)) {
    page = req.query.page;
  }

  try {
    const finddata = await Products.find({
      $or: [
        { product_name: { $regex: "^" + query, $options: "i" } },
        { short_description: { $regex: "^" + query, $options: "i" } },
      ],
    })
      .populate({ path: "subcategory_id", populate: { path: "category_id" } })
      .skip((Number(page) - 1) * 10)
      .limit(10);
    res.status(200).json({
      status: "success",
      data: finddata,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 500;
    next(err);
  }
}

// find product by id
async function find_product_byId_controller(req, res, next) {
  const { prd_name } = req.params;
  try {
    const findproduct = await Products.findOne({
      product_name: prd_name,
    }).populate();
    if (!findproduct) {
      const error = new Error("product not found");
      error.status = 404;
      next(error);
      return;
    }
    res.status(200).json({
      status: "success",
      data: findproduct,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 501;
    next(err);
  }
}

// update a product
async function update_product_controller(req, res, next) {
  const { _id } = req.params;
  console.log("hhhhhhh", _id);
  try {
    const updateproduct = await Products.findOneAndUpdate(
      { _id },
      { ...req.body },
      { new: true }
    );
    console.log("hhhhhh2", updateproduct);
    if (!updateproduct) {
      const error = new Error("invalid product id");
      error.status = 404;
      next(error);
      return;
    }
    res.status(200).json({
      status: "success",
      message: "product updated successfully",
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 404;
    next(err);
  }
}

// delete a product
async function delete_product_controller(req, res, next) {
  const { _id } = req.params;
  try {
    const deleteproduct = await Products.findOneAndDelete({ _id });
    if (!deleteproduct) {
      const error = new Error("invalid product id");
      error.status = 404;
      next(error);
      return;
    }
    res.status(200).json({
      status: "success",
      message: "product deleted successfully",
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 500;
  }
}

const get_products_by_slug_controller = async (req, res, next) => {
  console.log("hhhhh");
  const { slug } = req.params;
  try {
    const getProducts = await Products.find({ slug });
    res.status(200).json({
      status: "success",
      data: getProducts,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 500;
    next(err);
  }
};

module.exports = {
  create_product_controller,
  get_product_controller,
  get_product_bySearch_controller,
  find_product_byId_controller,
  update_product_controller,
  delete_product_controller,
  get_products_by_slug_controller,
};
