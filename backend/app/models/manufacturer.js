'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Manufacturer extends Model {
        static associate(models) {
            this.hasMany(models.Item);
        }
    }
    Manufacturer.init({
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
    }, {
        modelName: 'Manufacturer',
        sequelize,
    });
    return Manufacturer;
};
