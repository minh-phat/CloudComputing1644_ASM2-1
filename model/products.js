const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConfigurationSchema = new Schema({
    color: String,
    stock: Number,
    image: String
});

const ProductsSchema = new Schema({
    product_name: String,
    description: String,
    price: Number,
    configuration: [ConfigurationSchema],
}, {timestamps: true});

module.exports = mongoose.model("products", ProductsSchema);