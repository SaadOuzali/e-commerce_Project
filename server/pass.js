const passport = require("passport");
const Customer = require("./models/Customer");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const customer = await Customer.findOne({ id });
  if (!customer) {
    done(null, false);
    return;
  }
  done(null, customer);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const findcustomer = Customer.findOne({ email, password });
        if (!findcustomer) {
          done(null, false);
          return;
        }
        return done(null, findcustomer);
      } catch (err) {
        console.log("wili", err);
      }
    }
  )
);
