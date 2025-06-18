'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WeaponMod extends Model {
        static associate(models) {
            this.belongsTo(models.Item, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.belongsToMany(models.Weapon, {
                sourceKey: 'itemId',
                targetKey: 'ItemId',
                through: 'WeaponModAttachments',
            });
        }
    }
    WeaponMod.init({
        requiredSlots: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, {
        modelName: 'WeaponMod',
        sequelize,
    });
    return WeaponMod;
};
