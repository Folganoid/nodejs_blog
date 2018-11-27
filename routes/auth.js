const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

const models = require('../models');

//POST is authorized
router.post('/register', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    if (!login || !password || !passwordConfirm) {
        const fields = [];
        if (!login) fields.push('login');
        if (!password) fields.push('password');
        if (!passwordConfirm) fields.push('passwordConfirm');

        res.json({
            ok: false,
            error: 'All fields must be filled',
            fields: fields
        });
    } else if (!/^[a-zA-Z0-9]+$/.test(login))  {
        res.json({
            ok: false,
            error: 'Only letters and digits',
            fields: ['login']
        });
    } else if (login.length < 3 || login.length > 16) {
        res.json({
            ok: false,
            error: 'login length must be 3 - 16 symbols',
            fields: ['login']
        });
    } else if (password.length < 5) {
        res.json({
            ok: false,
            error: 'password must be longer then 5 symbols',
            fields: ['password', 'passwordConfirm']
        });
    } else if (password !== passwordConfirm) {
        res.json({
            ok: false,
            error: 'Passwords not match',
            fields: ['password', 'passwordConfirm']
        })
    } else {

        models.User.findOne({
            login
        }).then(user => {
            if (!user) {
                bcrypt.hash(password, null, null, (err, hash) => {
                    models.User.create({
                        login,
                        password: hash
                    }).then(user => {
                        console.log(user);
                        res.json({
                            ok: true
                        });

                    }).catch(err => {
                        console.log(err);
                        res.json({
                            ok: false,
                            error: 'Error. Try later'
                        })
                    })
                });
            } else {
               res.json({
                   ok: false,
                   error: 'Login already exist',
                   fields: ['login']
               })
            }
        });
    }

});

module.exports = router;
