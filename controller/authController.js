const accounts = require("../model/accounts");
const express = require("express");
const router = express.Router();
const fs = require("fs");

exports.newAccount = (req, res) => {
    newAccount = new accounts({
        username: req.body.login__username,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        fullname: req.body.login__fullname,
        email: req.body.login__email,
        gender: req.body.gender,
    });

    // //validate email type, i.e. 'a@b.c' instead of 'ab.c' or 'a@b .c'
    // function validateEmail(email) {
    //     var re = /\S+@\S+\.\S+/;
    //     return re.test(email);
    // }

    // //using the validate function
    // if (!validateEmail(email)) {
    //     //TODO: add email validation and return error to user page.
    // }

    //save the newly created account
    // if (password === confirm_password) {
        newAccount.save(
            (err, document) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Data:", document);
                }
            }
        );
    // }

}

