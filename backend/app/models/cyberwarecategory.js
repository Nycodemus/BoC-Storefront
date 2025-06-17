'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CyberwareCategory extends Model {
        static associate(models) {

        }
    }
    CyberwareCategory.init({
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
    }, {
        modelName: 'CyberwareCategory',
        sequelize,
    });
    return CyberwareCategory;
};
