const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = require("./categories");

const ConfigurationSchema = new Schema({
    color: { type: String, required: true },
    stock: { type: String, required: true, min: [0, 'There must be at least one product'] },
});

const ProductsSchema = new Schema({
    product_name: { type: String, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: categories },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: [0, 'The toy cannot be free'] },
    image: { type: String, required: true },
    configuration: [ConfigurationSchema],
}, {timestamps: true});

module.exports = mongoose.model("products", ProductsSchema);