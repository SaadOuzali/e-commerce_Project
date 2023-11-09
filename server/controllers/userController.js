const { Users } = require("../models/User");
const {verify}=require('jsonwebtoken')




//login of user
async function CheckSignInController(req, res, next) {
  const { email, password } = req.body;
  try {
    const finduser = await Users.findOne({ email });
    // if (!finduser) {
    //   next({ status: 404, message: "user not found you need to signup" });
    //   return;
    // }
    if (finduser.password !== password) {
        const err=new Error('Wrong password !')
        err.status=401
      next(err);
      return;
    }
    const last_login=new Date()
    const updateuser=await Users.findOneAndUpdate({_id:finduser._id},{last_login},{new:true});
    // if(!updateuser){
    //     next({ status: 404, message: "can not update last login" }); 
    //     return
    // }
    req.session.user = finduser;
    
    next();
  } catch (err) {
    const error=new Error(err.message)
        error.status=401
    next(error);
  }
}




//register controller
async function SignUpController(req, res, next) {
    
  const { email, user_name } = req.body;
  try {

    const finduser = await Users.findOne({ $or: [{ email }, { user_name }] });
    
    if (finduser) {
        const error=new Error('that it is not possible to create a resource with the given definition because another resource already exists with the same attributes')
        error.status=401
     next(error)
      return;
    }

    const createUser=await Users.create(req.body);

    if(!createUser){
        const error=new Error('can not creat')
        error.status=401
     next(error)
      return;  
    }

    res.status(201).json({
        status:"success",
        message:"user created successfully "
    })

   
  } catch (error) {
    const err=new Error(error.message)
        err.status=401
    next(err)
  }
}

//create a jwt token controller and send it with data of user
function GenerateJWTController(req, res, next) {
  const token = generateJWT(req.session.user);
  res.status(201).json({
    status: "success",
    access_token: token,
    data: req.session.user,
    refrech_token: "",
  });
}

//verify jwt token controller
function VerfyJWT(req,res,next){
const token=verify()


}







//function generate jwt
function generateJWT(UserData) {
  const token = sign(JSON.stringify(UserData), process.env.JWT_SECRET,{expiresIn:"1d"});
  return token;
}

module.exports = {
  CheckSignInController,
  GenerateJWTController,
  SignUpController
};
