'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class InstallLocation extends Model {
        static associate(models) {

        }
    }
    InstallLocation.init({
        allowNull: false,
        name: DataTypes.STRING,
        unique: true,
    }, {
        modelName: 'InstallLocation',
        sequelize,
    });
    return InstallLocation;
};
