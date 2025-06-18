'use strict';

const roles = [
    ['admin'],
    ['gm'],
    ['user'],
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Roles', roles.map((role, idx) => ({
            createdAt: new Date(),
            id: idx + 1,
            name: role[0],
            updatedAt: new Date(),
        })));
    },

    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Roles', { id: roles.map((role, idx) => idx + 1) });
    },
};
