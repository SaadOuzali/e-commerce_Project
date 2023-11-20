const { validationResult } = require("express-validator");

function checkValidationResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send({ message: "Express validation ERROR UGH: ", errors });
  }
  next();
}

module.exports = { checkValidationResult };
