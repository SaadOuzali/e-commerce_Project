const { Schema, model } = require("mongoose");

const customerSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    creation_date: {
      type: String,
      default: new Date().toString(),
      required: true,
    },
    last_login: {
      type: String,
      default: new Date().toString(),
      required: true,
    },
    valid_account: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Customer = model("Customer", customerSchema);

module.exports = Customer;
