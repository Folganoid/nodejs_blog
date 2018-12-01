const express = require('express');
const router = express.Router();
const TurnDown = require('turndown');

const models = require('../models');

// GET for add
router.get('/add', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if(!userId || !userLogin) {
        res.redirect('/')
    } else {
        res.render('post/add', {
            user: {
                id: userId,
                login: userLogin
            }
        });
    }
});

// POST is add
router.post('/add', (req, res) => {

    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if(!userId || !userLogin) {
        res.redirect('/')
    } else {
        const title = req.body.title.trim().replace(/ +(?= )/g, "");
        const body = req.body.body;
        const turnDownService = new TurnDown();

        if (!title || !body) {
            const fields = [];
            if (!title) fields.push('title');
            if (!body) fields.push('body');

            res.json({
                ok: false,
                error: 'All fields must be filled',
                fields: fields
            });
        } else if (title.length < 3 || title.length > 64) {
            res.json({
                ok: false,
                error: 'Title length must be 3 - 64 symbols',
                fields: ['title']
            });
        } else if (body.length < 3 || body.length > 10000) {
            res.json({
                ok: false,
                error: 'Title length must be 3 - 10000 symbols',
                fields: ['body']
            });
        } else {

            models.Post.create({
                title,
                body: turnDownService.turndown(body),
                owner: userId
            }).then(post => {
                console.log(post);
                res.json({
                    ok: true
                });
            }).catch(err => {
                console.log(err);
                res.json({
                    ok: false
                });
            })
        }
    }
});

module.exports = router;