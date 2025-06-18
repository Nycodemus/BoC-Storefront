'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('RangeClasses', {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            increment1: {
                allowNull: false,
                defaultValue: 0,
                type: Sequelize.INTEGER,
            },
            increment2: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            increment3: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            increment4: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            increment5: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            increment6: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            increment7: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            weaponTypeId: {
                allowNull: false,
                primaryKey: true,
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
        await queryInterface.dropTable('RangeClasses');
    },
};
