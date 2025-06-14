const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({
            message: 'Missing access token',
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: 'Unauthorized'});
        }
        req.userId = decoded.id;
        next();
    });
};

const requireAdmin = (req, res, next) => {
    db.user.findByPk(req.userId).then((user) => {
        user.getRoles().then((roles) => {
            for (let role of roles) {
                if (role.name === 'admin') {
                    next();
                    return;
                }
            }

            res.status(403).send({message: 'Unauthorized'});
        })
    });
}

const requireGm = (req, res, next) => {
    db.user.findByPk(req.userId).then((user) => {
        user.getRoles().then((roles) => {
            for (let role of roles) {
                if (role.name === 'gm') {
                    next();
                    return;
                }
            }

            res.status(403).send({message: 'Unauthorized'});
        })
    });
}

const requireGmOrAdmin = (req, res, next) => {
    db.user.findByPk(req.userId).then((user) => {
        user.getRoles().then((roles) => {
            for (let role of roles) {
                if (role.name === 'admin' || role.name === 'gm') {
                    next();
                    return;
                }
            }

            res.status(403).send({message: 'Unauthorized'});
        })
    });
}

const authJwt = {
    verifyToken,
    requireAdmin,
    requireGm,
    requireGmOrAdmin,
}

module.exports = authJwt;