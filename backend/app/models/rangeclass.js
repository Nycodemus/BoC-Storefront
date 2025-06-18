'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RangeClass extends Model {
        static associate(models) {
            this.belongsTo(models.WeaponType, {
                allowNull: false,
                foreignKey: 'weaponTypeId',
                targetKey: 'id',
            });
        }
    }
    RangeClass.init({
        increment1: {
            allowNull: false,
            defaultValue: 0,
            type: DataTypes.INTEGER,
        },
        increment2: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        increment3: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        increment4: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        increment5: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        increment6: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        increment7: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
    }, {
        modelName: 'RangeClass',
        sequelize,
    });
    return RangeClass;
};
