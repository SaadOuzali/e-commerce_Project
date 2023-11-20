const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const connecting = require("./config/database.js");
const customerRouter = require("./routes/customerRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: "true",
    saveUninitialized: false,
  })
);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

require("./pass.js");

connecting();

app.use("/v1/customers", customerRouter);
app.use("/v1/orders", orderRouter);

app.use((req, res, next) => {
  res.status(404).json({
    status: "404",
    message: "page not found",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
