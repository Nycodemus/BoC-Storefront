'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VehicleType extends Model {
        static associate(models) {
            this.hasMany(models.Vehicle);
        }
    }
    VehicleType.init({
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
    }, {
        modelName: 'VehicleType',
        sequelize,
    });
    return VehicleType;
};
