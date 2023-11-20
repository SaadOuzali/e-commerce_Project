// import mongoose from "mongoose";
// import dotenv from "dotenv";
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const uri =
  "mongodb+srv://saad-bouchra-amine:saad-bouchra-amine@cluster0.ucym5uu.mongodb.net/?retryWrites=true&w=majority";

const connecting = () => {
  let DB_NAME = process.env.DB_NAME;
  mongoose
    .connect(uri, { dbName: `${DB_NAME}` })
    .then(() => {
      console.log("DB CONNECTED !!!");
    })
    .catch((err) => {
      console.log("CAN NOT CONNECT TO DB : ", err);
    });
};

module.exports = connecting;
