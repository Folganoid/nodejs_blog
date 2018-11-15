const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('views engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const arr = ['xx', 'xxx'];

app.get('/', (req, res) => res.render('index.ejs', {data: arr}));
app.get('/create', (req, res) => res.render('create.ejs'));
app.post('/create', (req, res) => {
    arr.push(req.body.name);
    res.redirect('/');
});

module.exports = app;