const passport=require('passport');
const {Strategy}=require('passport-local');
const { Users } = require('./models/User');


passport.use(new Strategy({
    usernameField:"email",
    passwordField:"password"
},async (email,password,done)=>{
try {
    const finduser= Users.findOne({email})
    if(!finduser){
        next({status:'faield',message:'user with this email not found'})
    }
    if(finduser.password !== password){
        next({status:'failed',message:'password incorrect'})
    }
    done(null,finduser)
} catch (error) {
    
}
}))