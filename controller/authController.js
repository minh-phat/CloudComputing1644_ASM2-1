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
        birthday: req.body.login__birthday
    });

    //validate email type, i.e. 'a@b.c' instead of 'ab.c' or 'a@b .c'
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    //email validation check
    if (!validateEmail(newAccount.email)) {
        let errorMsg = 'email "' + newAccount.email + '" is not in the correct format.';
        console.log(errorMsg);
        req.session.message = errorMsg;
        res.redirect('/signup');
        return;
    }

    accounts.findOne({
        username: req.body.login__username
    }).exec((err, user) => {
        if (err) {
            console.log(err); res.redirect('/signup'); return;
        }
        if (user) {
            const err = 'user "' + user.username + '" already in use'; console.log(err); req.session.message = err; res.redirect('/signup'); return;
        }
        accounts.findOne({
            email: req.body.login__email
        }).exec((err, user) => {
            if (err) { console.log(err); res.redirect('/signup'); return; }
            if (user) {
                const err = 'user "' + user.email + '" already in use'; console.log(err); req.session.message = err; res.redirect('/signup'); return;
            }
            newAccount.save(
                (err, document) => {
                    if (err) {
                        console.log(err); res.redirect('/signup'); return;
                    } else {
                        console.log("Data:", document); res.redirect('/'); return;
                    }
                }       /*
                        TODO: add check to see if account is in system already as well as email, etc,
                        TODO: return the error to the signup page with the old content being parsed there as well. 
                        */
            );
        });
    });

}

//login bits
exports.accountAuth = (req, res) => {                       //TODO: Add session to this. session[username, role, key(date & generated)]

    console.log(req.body.username);

    accounts.findOne({
        username: req.body.username
    }).exec((err, user) => {

        if (err) { console.log(err); return; }

        if (!user) { console.log('username ' + req.body.username + ' not found !'); return; }

        if (user) { console.log('username ' + user.username + ' found, checking password..'); }

        if (user.password !== req.body.password) { console.log('password "' + req.body.password + '" for user ' + user.username + ' does not match !'); return; }

        if (user.password === req.body.password) { console.log('user ' + user.username + ' logged in successfully'); return; }

    });

    res.redirect('/login');

}

