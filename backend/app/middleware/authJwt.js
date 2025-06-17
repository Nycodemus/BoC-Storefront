const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: 'Missing access token' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        req.userId = decoded.id;
        next();
        return null;
    });

    return null;
};

function requireAnyRole(ofRoles) {
    return async (req, res, next) => {
        try {
            const user = await db.User.findByPk(req.userId);
            if (!user) {
                return res.status(403).send({ message: 'Unauthorized' });
            }

            const [userRoles, ...validRoles] = await Promise.all([
                user.getRoles(),
                ...ofRoles.map((role) => db.Role.findOne({ where: { name: role } })),
            ]);

            const validRoleIds = validRoles.map((role) => role.id);

            if (userRoles.some((role) => validRoleIds.includes(role.id))) {
                return next();
            }

            return res.status(403).send({ message: 'Unauthorized' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Failed to verify user admin role' });
        }
    };
}

const requireAdmin = requireAnyRole(['admin']);

const requireGm = requireAnyRole(['gm']);

const requireGmOrAdmin = requireAnyRole(['gm', 'admin']);

const authJwt = {
    requireAdmin,
    requireGm,
    requireGmOrAdmin,
    verifyToken,
};

module.exports = authJwt;
