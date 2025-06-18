'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Vehicles', {
            combatSpeed: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            itemId: {
                allowNull: false,
                primaryKey: true,
                references: {
                    key: 'id',
                    model: 'Items',
                },
                type: Sequelize.INTEGER,
            },
            narrativeSpeed: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            seats: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            structuralDamagePoints: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            vehicleTypeId: {
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'VehicleTypes',
                },
                type: Sequelize.INTEGER,
            },
        });
    },
    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Vehicles');
    },
};
