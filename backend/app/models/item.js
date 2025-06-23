'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            this.belongsTo(models.ItemType);
            this.belongsTo(models.Manufacturer);
        }

        toJson(extended) {
            const result = {
                cost: this.cost,
                id: this.id,
                itemType: this.getItemType().name,
                manufacturer: this.getManufacturer().name,
                name: this.name,
            };
            if (extended) {
                result.description = this.description;
                result.flavorText = this.flavorText;
                result.imageUrl = this.imageUrl;
            }
            return result;
        }
    }
    Item.init({
        cost: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        description: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        flavorText: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        imageUrl: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        itemTypeId: {
            allowNull: false,
            references: {
                key: 'id',
                model: 'ItemTypes',
            },
            type: DataTypes.INTEGER,
        },
        manufacturerId: {
            allowNull: false,
            references: {
                key: 'id',
                model: 'Manufacturers',
            },
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        indexes: [
            {
                fields: ['name', 'manufacturerId', 'itemTypeId'],
                unique: true,
            },
        ],
        modelName: 'Item',
        sequelize,
    });
    return Item;
};
