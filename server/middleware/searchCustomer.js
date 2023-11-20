const express = require("express");
const Customer = require("../models/Customer");

// http://localhost:0000/v1/customers?query=abdel&page=1&sort=DESC
async function searchCustomer(req, res, next) {
  try {
    const termQuery = req.query.query;
    const sort = req.query.sort;
    const page = Number(req.query.page) || 1;
    const sortOptions =
      sort === "DESC" ? { first_name: -1 } : { first_name: 1 };
    const nameQuery = termQuery
      ? {
          $or: [
            { first_name: { $regex: termQuery, $options: "i" } },
            { last_name: { $regex: termQuery, $options: "i" } },
          ],
        }
      : {};
    const customers = await Customer.find(nameQuery)
      .select("-pwd")
      .sort(sortOptions)
      .skip((Number(page) - 1) * 10)
      .limit(10);
    req.customers = customers;
    next();
  } catch (err) {
    console.log("ERROR UGH: ", err);
    res.status(500).json({ message: "SERVER ERROR UGH" });
  }
}

async function listCustomers(req, res, next) {
  try {
    const sort = req.query.sort;
    const page = Number(req.query.page) || 1;
    const sortOptions =
      sort === "DESC" ? { first_name: -1 } : { first_name: 1 };

    const customers = await Customer.find({})
      .select("-pwd")
      .sort(sortOptions)
      .skip((Number(page) - 1) * 10)
      .limit(10);
    req.customers = customers;
    next();
  } catch (err) {
    console.log("ERROR UGH: ", err);
    res.status(500).json({ message: "SERVER ERROR UGH" });
  }
}

module.exports = { searchCustomer, listCustomers };
