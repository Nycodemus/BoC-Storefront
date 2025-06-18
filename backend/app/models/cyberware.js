'use strict';
const {
    Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cyberware extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.CyberwareCategory);
            this.belongsTo(models.InstallLocation);
            this.belongsTo(models.Item, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Cyberware.init({
        extra: {
            defaultValue: '{}',
            nullable: false,
            type: DataTypes.JSON,
        },
        humanityLossRoll: {
            defaultValue: 'N/A',
            nullable: false,
            type: DataTypes.STRING,
        },
        humanityLossStart: {
            defaultValue: 0,
            nullable: false,
            type: DataTypes.INTEGER,
        },
        needsFoundation: {
            defaultValue: false,
            nullable: false,
            type: DataTypes.BOOLEAN,
        },
        needsPair: {
            defaultValue: false,
            nullable: false,
            type: DataTypes.BOOLEAN,
        },
        requiredSlots: {
            defaultValue: 0,
            nullable: false,
            type: DataTypes.INTEGER,
        },
    }, {
        modelName: 'Cyberware',
        sequelize,
    });
    return Cyberware;
};
