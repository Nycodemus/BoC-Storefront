'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Skill extends Model {
        static associate(db) {
            this.belongsTo(db.Statistic);
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
