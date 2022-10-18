const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConfigurationSchema = new Schema({
    color: String,
    stock: Number,
});

const ProductsSchema = new Schema({
    product_name: String,
    category: ObjectId,
    description: String,
    price: Number,
    image: String,
    configuration: [ConfigurationSchema],
}, {timestamps: true});

module.exports = mongoose.model("products", ProductsSchema);