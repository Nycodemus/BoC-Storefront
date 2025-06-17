'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WeaponType extends Model {
        static associate(models) {
            this.belongsTo(models.Skill);
        }
    }
    WeaponType.init({
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
    }, {
        modelName: 'WeaponType',
        sequelize,
    });
    return WeaponType;
};
