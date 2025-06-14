const { authJwt } = require('../middleware');
const controller = require('../controllers/test.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept',
        );
        next();
    });

    app.get('/api/test/public', controller.public);
    app.get('/api/test/user', [authJwt.verifyToken], controller.user);
    app.get('/api/test/gm', [authJwt.verifyToken, authJwt.requireGm], controller.gm);
    app.get('/api/test/admin', [authJwt.verifyToken, authJwt.requireAdmin], controller.admin);
};
