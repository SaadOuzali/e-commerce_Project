const {Schema,model, trusted}=require('mongoose');
const { v4 } = require('uuid');

const categoriesschema=new Schema({
    id:{
        type:String,
        required:true,
        default :v4()
    },
    category_name:{
        type:String,
        unique:true,
        required:true
    },
    active:{
        type:Boolean,
        default:false
    }
})

const Categories=model("Categorie",categoriesschema);
module.exports={
    Categories
}