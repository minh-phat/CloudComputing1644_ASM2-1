const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    category_name: String,
    image: Text
}, {timestamps: true});

module.exports = mongoose.model("categories", CategoriesSchema);