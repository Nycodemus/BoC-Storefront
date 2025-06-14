module.exports = (sequelize, Sequelize) => {
    return sequelize.define('roles', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
}