const {Types, Schema, model} = require('mongoose');

// -1 create schema for Subcategorie :
const SubcategorieSchema = new Schema(
    {
        subcategory_name : {
            type : String,
            required : true,
            
        },
        id:{
            type:String,
            required:true
        },

        category_id : {
            type : Types.ObjectId,
            ref: "Categorie",
            required : true,
          
        },

        active : {
            type : Boolean,
        },
        slug : {
            type : String,
            unique:true,
            required:true
        },

});

// -2 create model :
const Subcategorie = model('Subcategorie', SubcategorieSchema );

module.exports = Subcategorie ;
