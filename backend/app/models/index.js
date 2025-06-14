const config = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    host: config.host,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

require('./auth')(db);

module.exports = db;
