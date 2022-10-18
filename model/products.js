const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = require("./categories");

const productSchema = new Schema({
    product_name: { type: String, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: categories },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: [0, 'The toy cannot be free'] },
    image: { type: String, required: true },
    configurations: [{
        color: String, 
        stock: Number
    }]
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);