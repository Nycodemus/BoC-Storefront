'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('WeaponModAttachments', {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            modItemId: {
                allowNull: false,
                primaryKey: true,
                references: {
                    key: 'itemId',
                    model: 'WeaponMods',
                },
                type: Sequelize.INTEGER,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            weaponItemId: {
                allowNull: false,
                primaryKey: true,
                references: {
                    key: 'itemId',
                    model: 'Weapons',
                },
                type: Sequelize.INTEGER,
            },
        });
    },

    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('WeaponModAttachments');
    },
};
