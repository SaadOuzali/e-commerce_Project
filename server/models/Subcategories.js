const {Schema,model}=require('mongoose');

const subcategoriesschema=new Schema({
    id:{
        type:String,
        required:true
    },
    subcategory_name:{
        type:String,
        required:true
    },
    category_id:{
        type:Schema.Types.ObjectId,
        ref:'Categories'
    },
    active:{
        type:String,
        default:false
    }
})


const Subcategories=model('Subcategorie',subcategoriesschema);

module.exports={
    Subcategories
}