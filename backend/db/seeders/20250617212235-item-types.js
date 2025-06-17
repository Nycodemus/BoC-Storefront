'use strict';

const types = [
    ['Weapon'],
    ['Armor'],
    ['Shield'],
    ['Cyberware'],
    ['AmmoType'],
    ['WeaponMod'],
    ['Generic'],
    ['Vehicle'],
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ItemTypes', types.map((type, idx) => ({
            createdAt: new Date(),
            id: idx + 1,
            name: type[0],
            updatedAt: new Date(),
        })));
    },

    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ItemTypes', types.map((type, idx) => idx + 1));
    },
};
