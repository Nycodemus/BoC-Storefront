'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Statistic extends Model {
        static associate(db) {
            this.hasMany(db.Skill);
        }
    }
    Statistic.init({
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        shortName: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
    }, {
        modelName: 'Statistic',
        sequelize,
    });
    return Statistic;
};
