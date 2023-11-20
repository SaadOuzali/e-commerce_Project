const jwt = require("jsonwebtoken");

function generateJWT(req, res, next) {
  const secret_key_jwt = process.env.JWT_SECRET;
  const { email, active, valid_account } = req.customer;
  const customer = req.customer;
  const expiresIn = "2h";
  const accessToken = jwt.sign(
    { _id: customer._id, email, active, valid_account, first_name, last_name },
    secret_key_jwt,
    {
      expiresIn,
    }
  );
  // res.setHeader("Authorization", `Bearer ${accessToken}`);
  req.acc = accessToken;
  next();
}

function verifyJWT(req, res, next) {
  const secret_key_jwt = process.env.JWT_SECRET;
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    // Verify and decode the JWT token
    const decodedToken = jwt.verify(accessToken, secret_key_jwt);
    req.customer = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function generateRefreshToken(req, res, next) {
  const expiresIn = "2d";
  const secret_key_refresh_token = process.env.REFRESH_TOKEN_SECRET;
  const customer = req.customer;
  const refreshToken = jwt.sign(
    { _id: customer._id },
    secret_key_refresh_token,
    {
      expiresIn,
    }
  );
  req.ref = refreshToken;
  next();
}

function verifyRefreshToken(req, res, next) {
  const secret_key_refresh_token = process.env.REFRESH_TOKEN_SECRET;
  try {
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      secret_key_refresh_token
    );
    if (decodedRefreshToken.expiresIn < Date.now() / 1000) {
      // /1000 to convert Date.now to seconds
      return false;
    }
    return true;
  } catch (error) {
    console.log("UGH : ", error);
    return false;
  }
}

function generateTokenEmail(req, res, next) {
  const secret_key_jwt = process.env.JWT_SECRET;
  const customer = req.customer;
  const expiresIn = "2h";
  console.log(customer);
  const token = jwt.sign({ _id: customer._id }, secret_key_jwt, {
    expiresIn,
  });
  req.token = token;
  next();
}

module.exports = {
  generateJWT,
  verifyJWT,
  generateRefreshToken,
  verifyRefreshToken,
  generateTokenEmail,
};
