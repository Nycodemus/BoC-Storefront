const db = require('../models');
const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signin = async (req, res) => {
    try {
        const user = await db.User.findOne({ where: { email: req.body.email } });

        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({ message: 'Email or password is incorrect' });
        }

        const roles = (await user.getRoles()).map((role) => role.name);

        const token = jwt.sign({
            id: user.id,
            roles,
        }, config.secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: false,
            expiresIn: 4 * 60 * 60,
        });

        return res.status(200).send({
            accessToken: token,
            email: user.email,
            id: user.id,
            roles,
            username: user.username,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Failed to sign user in' });
    }
};
