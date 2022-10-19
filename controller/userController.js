const accounts = require("../model/accounts");
const express = require("express");
const router = express.Router();
const fs = require("fs");

exports.delAccount = async (req, res) => { 
    var deleteID = req.params.id;
    console.log("Deleting account ID: " + deleteID);
    
    res.redirect('/userView');
}