'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('WeaponMods', {
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
            requiredSlots: {
                allowNull: false,
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
        await queryInterface.dropTable('WeaponMods');
    },
};
