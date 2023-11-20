const { validationResult } = require("express-validator");
const { sign, verify } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Users } = require("../models/User");

require("dotenv").config();

// const checkRfrToken = (refreshToken) => {

//   try {
//     const userdata = verify(refreshToken, process.env.JWT_REFRESH_SECRET);

//     req.payload=userdata;
//     console.log(userdata);
//     return {status: true}
//   } catch (error) {
//     const err = new Error("invalid token");
//     err.status = 401;
//     return {status: false, err};
//   }
// }

//middelware handlin refrech token
const refreshAccToken = async (req, res, next) => {
  // Access token failed
  if (!req.payload) {
    try {
      const userdata = verify(
        req.cookies.refreshToken,
        process.env.JWT_REFRESH_SECRET
      );
      console.log("dial refreacc", userdata);
      const { _id } = userdata;
      const newAccToken = sign({ _id: userdata._id }, process.env.JWT_SECRET, {
        expiresIn: "20s",
      });
      res.cookie("accessToken", newAccToken);
      const userData = await Users.findOne({ _id });
      if (!userdata) {
        const error = new Error("invalid user id ");
        error.status = 404;
        next(error);
        return;
      }
      req.payload = userData;
      console.log("dial payload", userData);
      next();
    } catch (error) {
      const err = new Error("Login again");
      err.status = 401;
      next(err);
    }
  } else {
    console.log("hna 2");
    next();
  }
};

// middelware check jwt
async function CheckJWT(req, res, next) {
  const auth = req.headers.authorization;
  let token = req.cookies.accessToken;

  if (typeof auth == "string" && auth.length > 0) {
    token = req.headers.authorization?.split(" ")[1];
  }

  if (!token) {
    const error = new Error("Missing token");
    error.status = 404;
    next(error);
    return;
  }

  try {
    const payload = verify(token, process.env.JWT_SECRET);
    console.log("check", payload);
    const { _id } = payload;
    console.log("hna 1");
    const userdata = await Users.findOne({ _id });
    if (!userdata) {
      const error = new Error("invalid user id ");
      error.status = 404;
      next(error);
      return;
    }
    req.payload = userdata;
    console.log("dial hna payload", req.payload);
    next();
  } catch (error) {
    console.log("5aso yd5ol hna");
    req.payload = null;
    next();
    // const refreshToken = req.cookies.refreshToken;
    // console.log("verify 2",refreshToken);
    // if (!refreshToken) {
    //   const err = new Error("missing refresh token in cookies");
    //   err.status = 401;
    //   next(err);
    //   return;
    // }
    // const checkingRefToken = checkRfrToken(refreshToken)
    // if(checkingRefToken.status == true) {
    //   const token = sign({ ...req.session.user }, process.env.JWT_SECRET, {
    //     expiresIn: "1h",
    //   })
    //   res.cookie("accessToken", token, {
    //     httpOnly: true,
    //     domaine: "localhost"
    //   });
    //   return next();
    // } else {
    //   next(checkingRefToken?.err)
    // }
  }
}

// middelware validate fields
function ValidatFields(req, res, next) {
  // console.log('hna');
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).json({ error: error.array() });
    return;
  }

  next();
}

//middelware check activation of user
function isActive(req, res, next) {
  const { active } = req.payload;
  if (active) {
    next();
  } else {
    const err = new Error("you not active");
    err.status = 401;
    next(err);
  }
}

// middelware verify role user admin or manager
async function VerifyRole(req, res, next) {
  console.log("verify", req.payload);
  const { role } = req.payload;

  if (role == "admin") {
    next();
  } else {
    const err = new Error("you unauthorized not admin");
    err.status = 401;
    next(err);
  }
}

// middelware generate jwt
function GenerateJWT(req, res, next) {
  try {
    const token = sign({ _id: req.session.user._id }, process.env.JWT_SECRET, {
      expiresIn: "20s",
    });
    const refreshtoken = sign(
      { _id: req.session.user._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "180d",
      }
    );

    res
      .cookie("refreshToken", refreshtoken, {
        httpOnly: true,
        domaine: "localhost",
      })
      .cookie("accessToken", token, {
        httpOnly: true,
        domaine: "localhost",
      });
    const { _id, user_name, email, role, id } = req.session.user;
    res.status(200).json({
      status: "success",
      access_token: token,
      data: { _id, user_name, email, role, id },
      refrech_token: refreshtoken,
    });
  } catch (error) {
    const err = new Error(error.message ?? "can not create token");
    err.status = 404;
    next(err);
  }
}

function admin_OR_manager(req, res, next) {
  // console.log(req.payload);
  const { role } = req.payload;
  console.log("req.payload", req.payload);
  if (role == "admin" || role == "manager") {
    next();
  } else {
    const error = new Error("you dont have enough privilege");
    error.status = 403;
    next(error);
  }
}

async function SendMail(req, res, next) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const mailoptions = {
    from: process.env.USER_MAIL,
    to: req.user.email,
    subject: "New Credentials",
    html: `<p> hello i'm saad ouzali this is your credentials ${JSON.stringify(
      req.user
    )} </p>`,
  };

  transporter
    .sendMail(mailoptions)
    .then((info) => {
      res.status(201).json({
        status: "success",
        message: "user created successfully ",
      });
      console.log("Message sent: %s", info.messageId);
    })
    .catch((err) => {
      console.log(err);
    });
}


function checkValidationResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send({ message: "Express validation ERROR UGH: ", errors });
  }
  next();
}

module.exports = {
  ValidatFields,
  CheckJWT,
  VerifyRole,
  GenerateJWT,
  SendMail,
  isActive,
  admin_OR_manager,
  refreshAccToken,
  checkValidationResult
};