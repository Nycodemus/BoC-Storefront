'use strict';

const locations = [
    ['mall'],
    ['clinic'],
    ['hospital'],
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('InstallLocations', locations.map((location, idx) => ({
            createdAt: new Date(),
            id: idx + 1,
            name: location[0],
            updatedAt: new Date(),
        })));
    },

    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('InstallLocations', locations.map((_, idx) => idx + 1));
    },
};
