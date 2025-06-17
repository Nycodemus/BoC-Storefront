'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Skills', {
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
            isBase: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.BOOLEAN,
            },
            isExpensive: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.BOOLEAN,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
            statisticId: {
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'Statistic',
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
        await queryInterface.dropTable('Skills');
    },
};
