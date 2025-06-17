'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Items', {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            description: {
                type: Sequelize.TEXT,
            },
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            imageUrl: {
                type: Sequelize.TEXT,
            },
            manufacturerId: {
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'Manufacturers',
                },
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            typeId: {
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'ItemTypes',
                },
                type: Sequelize.INTEGER,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Items');
    },
};
