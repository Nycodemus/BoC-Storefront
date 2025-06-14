const db = require("../models");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Op = db.Sequelize.Op;

exports.signup = (req, res) => {
    db.user.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    }).then(user => {
        if (req.body.roles) {
            db.role.findAll({where:{name:{[Op.or]: req.body.roles}}}).then(roles => {
                user.setRoles(roles).then(() => {
                    res.status(201).send();
                });
            });
        } else {
            user.setRoles([1]).then(() => {
                res.status(201).send();
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send({message: "Failed to create user"});
    });
}

exports.signin = (req, res) => {
    db.user.findOne({where:{email: req.body.email}}).then(user => {
        if (!user) {
            res.status(401).send({message: "Email or password is incorrect"});
            return;
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).send({message: "Email or password is incorrect"});
            return;
        }

        const token = jwt.sign({
            id: user.id,
        }, config.secret, {
            algorithm: "HS256",
            allowInsecureKeySizes: false,
            expiresIn: 4 * 60 * 60,
        });

        let jwtRoles = [];
        user.getRoles().then(roles => {
            for (let role of roles) {
                jwtRoles.push(role.name);
            }
            res.status(200).send({
                id: user.id,
                email: user.email,
                roles: jwtRoles,
                accessToken: token,
            });
        });
    }).catch(err => {
       res.status(500).send({message: "Failed to sign user in"});
    });
}
