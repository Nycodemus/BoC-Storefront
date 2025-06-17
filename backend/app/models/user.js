'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(db) {
            this.belongsToMany(db.Role, { through: 'UserRoles' });
        }
    }
    User.init({
        email: { allowNull: false, type: DataTypes.STRING, unique: true },
        password: { allowNull: false, type: DataTypes.STRING },
        username: { allowNull: false, type: DataTypes.STRING, unique: true },
    }, {
        modelName: 'User',
        sequelize,
    });
    return User;
};
