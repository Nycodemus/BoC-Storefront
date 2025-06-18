'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            this.belongsTo(models.Manufacturer);
            this.belongsTo(models.ItemType);
            this.hasOne(models.WeaponMod, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.hasOne(models.Armor, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.hasOne(models.Shield, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.hasOne(models.Cyberware, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.hasOne(models.Weapon, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Item.init({
        description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        imageUrl: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    {
        modelName: 'Item',
        sequelize,
    });
    return Item;
};
