'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Items', {
            cost: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            flavorText: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            imageUrl: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            itemTypeId: {
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    key: 'id',
                    model: 'ItemTypes',
                },
                type: Sequelize.INTEGER,
            },
            manufacturerId: {
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        }, {
            uniqueKeys: {
                item: {
                    fields: ['name', 'manufacturerId', 'itemTypeId'],
                },
            },
        });
    },
    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Items');
    },
};
