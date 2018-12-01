const faker = require('faker');
const models = require('./models');
const owner = '5c02ae41e1c24815b7d38479';

const TurnDown = require('turndown');
const turnDownService = new TurnDown();

module.exports = () => {
    models.Post.remove().then(() => {
        Array.from({length: 20}).forEach((_, i) => {
          models.Post.create({
title: faker.lorem.words(5),
body: turnDownService.turndown(faker.lorem.words(100)),
owner: owner
          }).then(console.log).catch(console.log)
        })
    }).catch(console.log)
};
