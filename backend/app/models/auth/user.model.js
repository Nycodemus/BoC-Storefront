module.exports = (sequelize, Seqelize) => {
    return sequelize.define('users', {
        id: {
            type: Seqelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Seqelize.STRING,
            allowNull: false,
        },
        password: {
            type: Seqelize.STRING,
            allowNull: false,
        }
    });
}