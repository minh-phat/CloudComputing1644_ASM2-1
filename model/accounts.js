const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    product_id: ObjectID,
    quantity: Number,
    color: String,
    value: Number
});

const AccountsSchema = new Schema({
    username: String,
    password: String,
    fullname: String,
    email: String,
    birthday: Date,
    gender: String,
    account_class: { type: String, default: 'User' },
    orders: [OrdersSchema],
});

module.exports = mongoose.model("accounts", AccountsSchema);