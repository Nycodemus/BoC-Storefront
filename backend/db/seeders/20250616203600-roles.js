'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Roles', [
            { createdAt: new Date(), id: 1, name: 'admin', updatedAt: new Date() },
            { createdAt: new Date(), id: 2, name: 'gm', updatedAt: new Date() },
            { createdAt: new Date(), id: 3, name: 'user', updatedAt: new Date() },
        ]);
    },

    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Roles', { id: [1, 2, 3] }, {});
    },
};
