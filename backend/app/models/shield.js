'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Shield extends Model {
        static associate(models) {
            this.belongsTo(models.Item, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Shield.init({
        hitPoints: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, {
        modelName: 'Shield',
        sequelize,
    });
    return Shield;
};
