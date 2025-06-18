'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Cyberwares', {
            categoryId: {
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'CyberwareCategories',
                },
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            extra: {
                defaultValue: '{}',
                nullable: false,
                type: Sequelize.JSON,
            },
            humanityLossRoll: {
                defaultValue: 'N/A',
                nullable: false,
                type: Sequelize.STRING,
            },
            humanityLossStart: {
                defaultValue: 0,
                nullable: false,
                type: Sequelize.INTEGER,
            },
            installLocationId: {
                nullable: false,
                references: {
                    key: 'id',
                    model: 'InstallLocations',
                },
                type: Sequelize.INTEGER,
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
            needsFoundation: {
                defaultValue: false,
                nullable: false,
                type: Sequelize.BOOLEAN,
            },
            needsPair: {
                defaultValue: false,
                nullable: false,
                type: Sequelize.BOOLEAN,
            },
            requiredSlots: {
                defaultValue: 0,
                nullable: false,
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
        await queryInterface.dropTable('Cyberwares');
    },
};
