const faker = require('faker');
const models = require('./models');
const tr = require('transliter');
const owner = '5c02ae41e1c24815b7d38479';

module.exports = async () => {

    try {

        await models.Post.remove();
        Array.from({length: 20}).forEach(async () => {
            const title = faker.lorem.words(5);
            const url = `${tr.slugify(title)}-${Date.now().toString(36)}`;
            const post = await models.Post.create({
                title,
                url,
                body: faker.lorem.words(100),
                owner: owner
            });
            console.log(post);
        });

    } catch (error) {
        console.log(error);
    }
};
