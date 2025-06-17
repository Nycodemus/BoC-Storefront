const db = require('../models');

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        let user = await db.User.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(400).send({ message: 'Email already in use' });
        }

        user = await db.User.findOne({ where: { username: req.body.username } });
        if (user) {
            return res.status(400).send({ message: 'Username already in use' });
        }

        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Failed to check user' });
    }
};

const checkRolesExist = async (req, res, next) => {
    if (req.body.roles && Array.isArray(req.body.roles)) {
        try {
            const roleNames = (await db.Role.findAll()).map((role) => role.name);
            for (let i = 0; i < req.body.roles.length; i++) {
                const role = req.body.roles[i];
                if (!roleNames.includes(role)) {
                    return res.status(400).send({ message: `Role "${role}" does not exist` });
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Failed to validate roles' });
        }
    }
    return next();
};

const verifySignup = {
    checkDuplicateUsernameOrEmail,
    checkRolesExist,
};

module.exports = verifySignup;
