module.exports = (sequelize, Sequelize) => {
    return sequelize.define('roles', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
    });
};
