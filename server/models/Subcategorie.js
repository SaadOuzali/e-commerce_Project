const {Types, Schema, model} = require('mongoose');

// -1 create schema for Subcategorie :
const SubcategorieSchema = new Schema(
    {
        subcategory_name : {
            type : String,
            required : true,
            unique: true
        },

        category_id : {
            type : Types.ObjectId,
            ref: "Category",
            required : true,
            unique : true,
        },

        active : {
            type : Boolean,
        },

});

// -2 create model :
const Subcategorie = model('Subcategorie', SubcategorieSchema );

module.exports = Subcategorie ;
