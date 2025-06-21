require('dotenv').config();

const bcrypt = require('bcryptjs');
const db = require('../app/models');

const [,,email, username, password, roles] = process.argv;

if (!email || !username || !password) {
    console.log('genUser usage: \'npm run script:genUser -- <email> <username> <password> (roles)\'');
    console.log('Example: npm run script:genUser -- test@example.com Test password user,admin');
}

db.User.create({
    email: email,
    password: bcrypt.hashSync(password, process.env.BCRYPT_SALT),
    username: username,
}).then((user) => {
    db.Role.findAll({
        where: {
            name: {
                [db.Sequelize.Op.or]: (roles) ? roles.split(' ') : ['user'],
            },
        },
    }).then((dbRoles) => {
        user.setRoles(dbRoles).then(() => {
            console.log(`User ${user.username} created.`);
        });
    });
});
