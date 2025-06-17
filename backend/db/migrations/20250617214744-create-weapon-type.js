'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('WeaponTypes', {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            skillId: {
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'Skills',
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
        await queryInterface.dropTable('WeaponTypes');
    },
};
