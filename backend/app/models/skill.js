'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Skill extends Model {
        static associate(models) {
            this.belongsTo(models.Statistic);
            this.hasMany(models.WeaponType);
        }
    }
    Skill.init({
        isBase: {
            allowNull: false,
            defaultValue: false,
            type: DataTypes.BOOLEAN,
        },
        isExpensive: {
            allowNull: false,
            defaultValue: false,
            type: DataTypes.BOOLEAN,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
    }, {
        modelName: 'Skill',
        sequelize,
    });
    return Skill;
};
