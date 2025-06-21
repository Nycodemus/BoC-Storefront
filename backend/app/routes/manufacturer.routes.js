const { authJwt } = require('../middleware');
const controller = require('../controllers/manufacturer.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept',
        );
        next();
    });

    app.get('/api/manufacturer', [authJwt.verifyToken], controller.list);
    app.post('/api/manufacturer', [authJwt.verifyToken], controller.create);
    app.put('/api/manufacturer/:id', [authJwt.verifyToken], controller.update);
    app.delete('/api/manufacturer/:id', [authJwt.verifyToken], controller.delete);
    app.get('/api/manufacturer/:id', [authJwt.verifyToken], controller.get);
};
