'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserRoles', {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            roleId: {
                allowNull: false,
                primaryKey: true,
                references: {
                    key: 'id',
                    model: 'Roles',
                    onDelete: 'CASCADE',
                },
                type: Sequelize.INTEGER,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            userId: {
                allowNull: false,
                primaryKey: true,
                references: {
                    key: 'id',
                    model: 'Users',
                    onDelete: 'CASCADE',
                },
                type: Sequelize.INTEGER,
            },
        });
    },
    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('UserRoles');
    },
};
