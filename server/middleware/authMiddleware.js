const { validationResult } = require("express-validator");
const {sign}=require('jsonwebtoken')





function ValidatFields(req, res, next) {
  console.log("hna");
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
      return;
    }
    
    next();
  }








//   function generate jsonwebtoken







  module.exports={
    ValidatFields
  }



