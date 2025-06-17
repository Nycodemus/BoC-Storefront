'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
        });
    },
    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    },
};
