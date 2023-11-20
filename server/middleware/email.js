const nodemailer = require("nodemailer");

function sendEmail(req, res, next) {
  // Create a transporter object
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "madkourbouchra@gmail.com",
      pass: "kprb whdp mevv lnmb",
    },
  });

  // Define the email options
  const message = {
    from: "madkourbouchra@gmail.com", // Sender address
    to: req.customer.email, // List of recipients
    subject: "Please verify your email address", // Subject line
    html: `<p> <b>Dear ${req.customer.first_name}</b>, \n

  Thank you for signing up for an account with our website!
  
  To complete the registration process, please verify your email address by clicking on the following link:
  
  <a href="http://localhost:4006/v1/customers/email/validation?token=${req.token}">Verification link</a>
    
  If you have any questions, please do not hesitate to contact us.
  
  Sincerely,</p>`,
  };

  // Send the email
  transporter
    .sendMail(message)
    .then((info) => {
      console.log(info);
      next();
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email: ", error });
    });
}

module.exports = { sendEmail };
