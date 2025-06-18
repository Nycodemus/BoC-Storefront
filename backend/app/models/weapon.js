'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Weapon extends Model {
        static associate(models) {
            this.belongsTo(models.WeaponType);
            this.belongsTo(models.Item);
            this.belongsToMany(models.WeaponMod, {
                sourceKey: 'itemId',
                targetKey: 'ItemId',
                through: 'WeaponModAttachments',
            });
        }
    }
    Weapon.init({
        concealable: {
            defaultValue: false,
            nullable: false,
            type: DataTypes.BOOLEAN,
        },
        damage: {
            nullable: false,
            type: DataTypes.STRING,
        },
        magazineSize: {
            defaultValue: 1,
            nullable: false,
            type: DataTypes.INTEGER,
        },
        modSlots: {
            defaultValue: 3,
            nullable: false,
            type: DataTypes.INTEGER,
        },
        rateOfFire: {
            defaultValue: 1,
            nullable: false,
            type: DataTypes.INTEGER,
        },
        requiredHands: {
            defaultValue: 1,
            nullable: false,
            type: DataTypes.INTEGER,
        },
        specialTags: {
            defaultValue: '',
            nullable: false,
            type: DataTypes.TEXT,
        },
    }, {
        modelName: 'Weapon',
        sequelize,
    });
    return Weapon;
};
