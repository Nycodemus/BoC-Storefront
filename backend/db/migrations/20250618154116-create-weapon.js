'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Weapons', {
            concealable: {
                defaultValue: false,
                nullable: false,
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            damage: {
                nullable: false,
                type: Sequelize.STRING,
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
            magazineSize: {
                defaultValue: 1,
                nullable: false,
                type: Sequelize.INTEGER,
            },
            modSlots: {
                defaultValue: 3,
                nullable: false,
                type: Sequelize.INTEGER,
            },
            rateOfFire: {
                defaultValue: 1,
                nullable: false,
                type: Sequelize.INTEGER,
            },
            requiredHands: {
                defaultValue: 1,
                nullable: false,
                type: Sequelize.INTEGER,
            },
            specialTags: {
                defaultValue: '',
                nullable: false,
                type: Sequelize.TEXT,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            weaponTypeId: {
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'WeaponTypes',
                },
                type: Sequelize.INTEGER,
            },
        });
    },
    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Weapons');
    },
};
