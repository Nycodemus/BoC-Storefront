const { authJwt } = require('../middleware');
const controller = require('../controllers/item.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept',
        );
        next();
    });

    app.get('/api/item', [authJwt.verifyToken], controller.list);
    app.post('/api/item', [authJwt.verifyToken], controller.create);
    app.get('/api/item/:id', [authJwt.verifyToken], controller.get);
    app.put('/api/item/:id', [authJwt.verifyToken], controller.update);
    app.delete('/api/item/:id', [authJwt.verifyToken], controller.delete);
};
