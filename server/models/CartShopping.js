const { Schema, model } = require("mongoose");


const cartshoppingSchema=new Schema({
    id:{
        type:String,
        required:true
    },
    productId:[
        {
            type:Schema.Types.ObjectId,
            ref:'Products'
        }
    ],
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'Customer'
    }
})