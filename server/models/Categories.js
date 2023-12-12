const {Types, Schema, model} = require('mongoose');

// -1 create schema for categories :
const categoriesSchema = new Schema(
    {
        category_name : {
            type : String,
            required : true,
        },

        id : {
            type : String,
            required : true,
            unique : true,
        },

        active : {
            type : Boolean,
        },

        subcategories : [
            {
            type : Types.ObjectId,
            ref : 'Subcategorie'
        },]

});

// -2 create model :
const category = model('Category', categoriesSchema );

module.exports = category;
