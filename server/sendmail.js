
// const nodemailer=require('nodemailer')
// const transporter=nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:process.env.USER_MAIL,
//         pass:process.env.USER_PASSWORD
//     }
// })

// const mailoptions={
//     from:process.env.USER_MAIL,
//     to:"saadouzali@gmail.com",
//     subject:"resest password",
//     html:`<h1> wa3 </h1>`
// }

// async function main(){
//     const info= await transporter.sendMail(mailoptions);
//     console.log("Message sent: %s", info.messageId)
// }

// main()

const multer = require("multer");
