const { text } = require('body-parser');
const {Schema,model, Types}=require('mongoose');


const productsschema=new Schema({
    id:{
        type:String,
        required:true,  
    },
    sku:{
        type:String,
        unique:true,
        required:true,
        unique:true
    },
    product_name:{
        type:String,
        required:true,
        unique:true
    },
    product_img:{
        type:String,
        required:true
    },
    subcategory_id:{
        type:Schema.Types.ObjectId,
        ref:'Subcategories'
    },
    short_description:{
        type:String,
        required:true
    },
    long_description:{
        type:String
    },
    quantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:true
    },
    discount_price:{
        type:Number,
    },
    options: [
        {
            name: String,
            description: String,
            color:String,
            
        }
    ],
    active:{
        type:Boolean,
        default:false
    }
})


const Products=model("product",productsschema);
module.exports={
    Products
}