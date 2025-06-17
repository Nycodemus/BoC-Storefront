'use strict';

const categories = [
    ['Fashionware'],
    ['Neuralware'],
    ['Cyberoptics'],
    ['Cyberaudio'],
    ['Internal Body'],
    ['External Body'],
    ['Cyberarms'],
    ['Cyberlegs'],
    ['Borgware'],
    ['Chipware'],
    ['Cyberdeck Hardware'],
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('CyberwareCategories', categories.map((category, idx) => ({
            createdAt: new Date(),
            id: idx + 1,
            name: category[0],
            updatedAt: new Date(),
        })));
    },

    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('CyberwareCategories', categories.map((category, idx) => idx + 1));
    },
};
