'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Manufacturer extends Model {
        // static associate(db) {
        //
        // }
        toJson() {
            return {
                id: this.id,
                name: this.name,
            };
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
