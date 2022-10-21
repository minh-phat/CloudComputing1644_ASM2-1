const accounts = require("../model/accounts");
const express = require("express");
const fs = require("fs");

exports.hasClass = (user_class) => {
    return async function (req, res, next) {
        const username = await accounts.findOne({ username: req.session.username });
        if (!username || !user_class.includes(username.account_class)) {
            req.session.message = "You must be an autorized user to access this!";
            res.redirect('/login');
        }
        next();
    }
}