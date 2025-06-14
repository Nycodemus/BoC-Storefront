const db = require('../models');
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (user) {
            res.status(400).send({ message: 'Email already in use' });
            return;
        }
        next();
    });
};

const checkRolesExist = (req, res, next) => {
    if (req.body.roles) {
        for (const role of req.body.roles) {
            if (!db.ROLES.includes(role)) {
                res.status(400).send({ message: `Role "${role}" does not exist` });
                return;
            }
        }
    }
    next();
};

const verifySignup = {
    checkDuplicateUsernameOrEmail,
    checkRolesExist,
};

module.exports = verifySignup;
