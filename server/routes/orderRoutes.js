const express = require("express");
const {
  createController,
  getOrderByIdController,
  listOrdersController,
  updateOrderController,
} = require("../controllers/orderController");
const {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
} = require("../middleware/ordersMiddleware");
const { verifyJWT, verifyRefreshToken } = require("../middleware/token");
const { CheckJWT, refreshAccToken, admin_OR_manager } = require("../middleware/authMiddleware");
const { Users } = require("../models/User");
const { Products } = require("../models/Product");
const Order = require("../models/Order");
const Customer = require("../models/Customer");

const orderRouter = express.Router();

//DONE
orderRouter.post("/", verifyJWT,verifyRefreshToken, createOrder, createController);

// to get all document count
orderRouter.get('/countdocument',CheckJWT,refreshAccToken,admin_OR_manager,async(req,res,next)=>{
  console.log('hna');
  
  try {
    const numberOfUsers=await Users.find().countDocuments();
    const numberOfProducts=await Products.find().countDocuments();
    const numberOforders=await Order.find().countDocuments();
    const numberOfcustomers=await Customer.find().countDocuments();
res.status(200).json({
  status:"success",
  data:{
    numberOfUsers,
     numberOfProducts,
     numberOforders,
     numberOfcustomers
    }
    
})

  } catch (error) {
    const err=new Error(error.message);
    err.status=501;
    next(err)
  }
})


//DONE
orderRouter.get("/:id", CheckJWT,refreshAccToken,admin_OR_manager,getOrderById, getOrderByIdController);

//DONE
orderRouter.get("/", CheckJWT,refreshAccToken,admin_OR_manager,listOrders, listOrdersController);

//DONE
orderRouter.put("/:id", CheckJWT, refreshAccToken,admin_OR_manager,updateOrder ,updateOrderController);




module.exports = orderRouter;
