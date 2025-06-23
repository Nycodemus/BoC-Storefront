'use strict';

const types = [
    'weapon',
    'armor',
    'shield',
    'cyberware',
    'ammo type',
    'weapon mod',
    'generic',
    'vehicle',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ItemTypes', types.map((s, idx) => ({
            createdAt: new Date(),
            id: idx + 1,
            name: s,
            updatedAt: new Date(),
        })));
    },
    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ItemTypes', {
            id: types.map((_, idx) => idx + 1),
        });
    },
};
