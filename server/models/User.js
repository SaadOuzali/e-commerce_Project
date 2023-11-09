const {Schema,model}=require('mongoose');
const uuid=require('uuid')

const userschema=new Schema({
    id:{
        type:String,
        unique:true,
        default: uuid.v4()
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    role:{
        type:String,
        required:true,
    },
    user_name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    creation_date:{
        type:String,
        default:new Date()
    },
    last_login:{
        type:Number
    },
    last_update:{
        type:Number
    },
    active:{
       type: Boolean,
       default:true
    }

})

const Users=model('user',userschema);
module.exports={
    Users
}
