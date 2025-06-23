'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemType extends Model {
        static associate(models) {
            this.hasMany(models.Item, {
                onDelete: 'CASCADE',
            });
        }

        toJson() {
            return {
                id: this.id,
                name: this.name,
            };
        }
    }
    ItemType.init({
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
    }, {
        modelName: 'ItemType',
        sequelize,
    });
    return ItemType;
};
