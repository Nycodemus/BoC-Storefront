module.exports = (sequelize, Seqelize) => {
    return sequelize.define('users', {
        email: {
            allowNull: false,
            type: Seqelize.STRING,
        },
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Seqelize.INTEGER,
        },
        password: {
            allowNull: false,
            type: Seqelize.STRING,
        },
    });
};
