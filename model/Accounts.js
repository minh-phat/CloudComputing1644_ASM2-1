const { ObjectID } = require("bson");
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    product_id : ObjectID,
    quantity: Number,
    color: String,
    value: Number
});

const AccountsSchema = new Schema({
    username: String,
    password: Text,
    fullname: String,
    birth_year: Int32,
    gender: String,
    account_class: String,
    orders: [OrdersSchema],
});

module.exports = mongoose.model("Accounts", AccountsSchema);