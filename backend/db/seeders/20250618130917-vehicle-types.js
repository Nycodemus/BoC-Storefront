'use strict';

const types = [
    ['land'],
    ['sea'],
    ['air'],
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('VehicleTypes', types.map((type, idx) => ({
            createdAt: new Date(),
            id: idx + 1,
            name: type[0],
            updatedAt: new Date(),
        })));
    },

    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('VehicleTypes', { id: types.map((type, idx) => idx + 1) });
    },
};
