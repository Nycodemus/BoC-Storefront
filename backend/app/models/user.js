'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.belongsToMany(models.Role, { through: 'UserRoles' });
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
