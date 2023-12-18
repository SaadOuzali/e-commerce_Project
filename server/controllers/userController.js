const { Users } = require("../models/User");
const { verify } = require("jsonwebtoken");
const { v4 } = require("uuid");


//login of user
async function CheckSignInController(req, res, next) {
	const { email, password } = req.body;
	try {
		const finduser = await Users.findOne({ email });
		if (!finduser) {
            const err = new Error("user not found you need to signup");
			err.status = 404;
		  next(err);
		  return;
		}
        if(!finduser.active){
            const err = new Error("you not active can not login");
			err.status = 401;
			next(err);
			return;
        }
		if (finduser.password !== password) {
			const err = new Error("Wrong password !");
			err.status = 401;
			next(err);
			return;
		}
		const last_login = new Date().toDateString();
		const updateuser = await Users.findOneAndUpdate(
			{ _id: finduser._id },
			{ last_login },
			{ new: true }
		);
		// if(!updateuser){
		//     next({ status: 404, message: "can not update last login" });
		//     return
		// }
		req.session.user = finduser;

		next();
	} catch (err) {
		const error = new Error(err.message);
		error.status = 401;
		next(error);
	}
}

//register controller
async function SignUpController(req, res, next) {
	const { email, user_name } = req.body;
	try {
		const finduser = await Users.findOne({ $or: [{ email }, { user_name }] });

		if (finduser) {
			const error = new Error(
				"that it is not possible to create a resource with the given definition because another resource already exists with the same attributes"
			);
			error.status = 403;
			next(error);
			return;
		}

		const createUser = await Users.create({ ...req.body, id: v4() });

		if (!createUser) {
			const error = new Error("can not creat");
			error.status = 500;
			next(error);
			return;
		}
        req.user=createUser
		next()
	} catch (error) {
		const err = new Error(error.message);
		err.status = 401;
		next(err);
	}
}


//create a new user 
async function NewUserController(req, res, next) {
	const { email, user_name } = req.body;
	try {
		const finduser = await Users.findOne({ $or: [{ email },{ user_name }] });

		if (finduser) {
			const error = new Error(
				"that it is not possible to create a resource with the given definition because another resource already exists with the same attributes"
			);
			error.status = 401;
			next(error);
			return;
		}

		const createUser = await Users.create({ ...req.body, id: v4() });

		// if (!createUser) {
		// 	const error = new Error("can not creat");
		// 	error.status = 401;
		// 	next(error);
		// 	return;
		// }

		res.status(201).json({
			status: "success",
			message: "user created successfully ",
		});
	} catch (error) {
		const err = new Error(error.message);
		err.status = 401;
		next(err);
	}
}



// get user by id controller
async function Get_UserbyIdController(req,res,next){
    const {_id}=req.params
   try {
     const finduser= await Users.findOne({_id});
     if(!finduser){
         const error=new Error('user with id not found');
         error.status=404;
         next(error);
         return;
     } 
     res.status(200).json({
         status:"success",
         data:[finduser]
     })
   } catch (error) {
    const err=new Error(error.message);
    err.status=404;
    next(err)
   }
}


//get 10 user and sciping by 10 
async function Get_AllUsers_ScipingController(req, res, next)  {
    let page=1;
	if(Number(req.query.page)){
		page=req.query.page
	}
    let sort = req.query.sort;
    if (!sort) {
      sort = -1;
    } else {
      sort = sort === "Desc" ? -1 : 1;
    }
    const findusers = await Users.find()
      .sort({ first_name: sort })
      .skip((page-1) * 10)
      .select(
        " first_name last_name id user_name email role active last_login last_update"
      )
      .limit(10);
    res.status(200).json({status:"success",data: findusers});
  }


//to modify a user 
async function modify_ById_Controller(req,res,next){
    const {_id}=req.params
	console.log(req.body);
    const {first_name,last_name,email,role,active}=req.body;
    const last_update=new Date().toDateString()
    try {
        const finduser=await Users.findOneAndUpdate({_id},{...req.body,last_update},{new:true});
        if(!finduser){
            const error=new Error('no user found with provided Id');
            error.status=404;
            next(error);
            return;
        }
		
		
        res.status(200).json({
            status:"success",
            message:"user updated successfully",
			data:finduser
        })

    } catch (error) {
        const err=new Error(error.message);
        err.status=501
        next(err)
    }
}


// delete user with Id
async function delete_UserById_Controller (req,res,next){
    try {
        const {_id}=req.params;
        const deletedocument= await Users.findOneAndDelete({_id})
        if(!deletedocument){
            const err=new Error('invalid user id');
            err.status=404;
            next(err)
            return;
        };
        res.status(200).json({
            status:"success",
            message:"user deleted successfully",
            data:deletedocument
        })
    } catch (error) {
        const err=new Error(error.message);
        err.status=404
        next(err)
    }
}



//search with regex controller
async function search_user_Controller (req, res, next) {
    const { query } = req.query;
	console.log(query);
    let page = 1;

    if (Number(req.query.page)) {
      page = req.query.page;
    }

    let sort = req.query.sort;
    if (!sort) {
      sort = -1;
    } else {
      sort = sort === "Desc" ? -1 : 1;
    }
   
    try {
		const findusers = await Users.find({
			$or: [
			  { first_name: { $regex: "^" + query, $options: "i" } },
			  { email: { $regex: "^" + query, $options: "i" } },
			  { user_name: { $regex: "^" + query, $options: "i" } },
			  { last_name: { $regex: "^" + query, $options: "i" } },
			],
		  })
			.sort({ first_name: sort })
			.skip((Number(page) - 1) * 10)
			.select(
			  "first_name user_name id creation_date email role active last_login last_update"
			)
			.limit(10);
			console.log(findusers);
		  res.status(200).json({ status: "success", data: findusers });
	} catch (error) {
		const err=new Error(error.message);
		err.status=500;
		next(err)
	}
  }

module.exports = {
	CheckSignInController,
	SignUpController,
    Get_UserbyIdController,
    Get_AllUsers_ScipingController,
    delete_UserById_Controller,
    modify_ById_Controller,
	search_user_Controller
};
