const  Customer = require("../models/Customer");
const jwt=require('jsonwebtoken');


// to verify access token
const checToken_Front_End_customer= async(req,res,next)=>{
    // console.log("hhhhhhhhhhhhhh 11111");
    const token=req.cookies.accessToken;
    // console.log('dial hnaaa',token);
    if(!token){
      const error=new Error('missing token in cookies');
      error.status=404;
      next(error);
      return;
    }
    try {
      // console.log("hna f 111");

      const decodetoken=jwt.verify(token,process.env.JWT_SECRET);
      // console.log("hna f 1",decodetoken);
      const findcustomer=await Customer.findOne({_id:decodetoken._id});
      if(!findcustomer){
        const error=new Error('you not a customer');
        error.status=404;
        next(error);
        return;
      };
      req.payload=findcustomer;
          next();
    } catch (error) {
      req.payload=null;
      next()
    }
  };



// to verify refresh token
const checkRefToken_Front_End_customer= async(req,res,next)=>{
    if(!req.payload){
    //   console.log("hhhhhhhhhhhhhh 11111");
        const token=req.cookies.refreshToken;
        
        try {
          const decodetoken=jwt.verify(token,process.env.JWT_REFRESH_SECRET);
        //   console.log("hna f 2",decodetoken);
          const {_id}=decodetoken;
          const findcustomer=await Customer.findOne({_id});
          if(!findcustomer){
              const error=new Error("you not customer");
              error.status=404;
                next(error);
          };
          const newacctoken=jwt.sign({_id},process.env.JWT_SECRET, {
            expiresIn: "20s",
          });
          res.cookie("accessToken", newacctoken)
          req.token=newacctoken;
          req.payload=findcustomer;
          next()
        } catch (error) {
          const err=new Error('login again');
          err.status=401;
          next(err);
        }
    }else{
      next();
    }
  }

module.exports={checToken_Front_End_customer,checkRefToken_Front_End_customer}