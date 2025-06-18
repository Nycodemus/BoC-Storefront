'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Armor extends Model {
        static associate(models) {
            this.belongsTo(models.Item, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Armor.init({
        penalty: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        stoppingPower: DataTypes.INTEGER,
    }, {
        modelName: 'Armor',
        sequelize,
    });
    return Armor;
};
