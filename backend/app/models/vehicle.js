'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Vehicle extends Model {
        static associate(models) {
            this.belongsTo(models.Item, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.VehicleType);
        }
    }
    Vehicle.init({
        combatSpeed: {
            allowNull: false,
            name: DataTypes.Integer,
        },
        narrativeSpeed: {
            allowNull: false,
            name: DataTypes.Integer,
        },
        seats: {
            allowNull: false,
            name: DataTypes.Integer,
        },
        structuralDamagePoints: {
            allowNull: false,
            name: DataTypes.Integer,
        },
    }, {
        modelName: 'Vehicle',
        sequelize,
    });
    return Vehicle;
};
