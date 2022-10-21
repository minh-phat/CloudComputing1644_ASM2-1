const accounts = require("../model/accounts");
const express = require("express");
const router = express.Router();
const fs = require("fs");

exports.managerAdd = async (req, res) => {

    console.log('REQ BODY: '+ req.body);
    return res.redirect('/managerView');
        newAccount = new accounts({
            username: req.body.username,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            fullname: req.body.fullname,
            email: req.body.email,
            gender: req.body.gender,
            birthday: req.body.birthday,
            account_class: "Manager"
        });

        function validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        if (!validateEmail(req.body.email)) {
            var errorMsg = req.body.email + " is not a valid email";
            console.log(errorMsg);
            req.session.message = errorMsg;
            return res.redirect("/managerInsert");
        }

        accounts.findOne({
            username: req.body.username
        }).exec((err, user) => {
            if (err) {
                console.log(err);
                res.redirect('/managerInsert');
                return;
            }
            if (user) {
                var err = 'user "' + user.username + '" already in use';
                console.log(err);
                req.session.message = err;
                res.redirect('/managerInsert');
                return;
            }
            accounts.findOne({
                email: req.body.email
            }).exec((err, user) => {
                if (err) {
                    console.log(err);
                    return res.redirect('/managerInsert');
                }
                if (user) {
                    var err = 'user "' + user.email + '" already in use';
                    console.log(err);
                    req.session.message = err;
                    return res.redirect('/managerInsert');
                }
                newAccount.save(
                    (err, document) => {
                        if (err) {
                            console.log(err);
                            return res.redirect('/managerInsert');
                        } else {
                            console.log("Data:", document);
                            return res.redirect('/managerInsert');
                        }
                    }
                );
            });
        });
    // }
};