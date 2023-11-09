const express=require('express');
const { connect_to_DB } = require('./config/database');
const app=express();
const session=require('express-session');
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser');
const { userRouter } = require('./routes/userRoutes');
require('dotenv').config()


app.use(session({
    secret:"fjklsjfkljj",
    resave:'true',
    saveUninitialized: false
}))
app.use(cookieParser())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));





connect_to_DB()
.then(()=>{
    console.log("connection to DB success");
})
.catch((err)=>{
console.log(err);
})


app.use('/v1/users',userRouter)


app.use((req,res,next)=>{
    res.status(404).json({
        status:"failed",
        message:"page not found check your URL"
    })
})

//for handling globale error
app.use((err,req,res,next)=>{
    const status = err.status ||500;
    const error = err.message || "can not process your request";
    res.status(status).json({
        status:'failed',
        Error:error
    })

})




app.listen(process.env.PORT,()=>{
    console.log("port 3000 listenning");
})