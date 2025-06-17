'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(db) {
            this.belongsToMany(db.User, { through: 'UserRoles' });
        }
    }
    Role.init({
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
    }, {
        modelName: 'Role',
        sequelize,
    });
    return Role;
};
