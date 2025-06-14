module.exports = (db) => {
    console.log('Preparing auth tables');
    db.user = require('./user.model.js')(db.sequelize, db.Sequelize);
    db.role = require('./role.model.js')(db.sequelize, db.Sequelize);

    db.role.belongsToMany(db.user, {
        through: 'user_roles',
    });

    db.user.belongsToMany(db.role, {
        through: 'user_roles',
    });

    db.ROLES = ['user', 'gm', 'admin'];
};
