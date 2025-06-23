const { authJwt } = require('../middleware');
const controller = require('../controllers/itemtype.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept',
        );
        next();
    });

    app.get('/api/item/type', [authJwt.verifyToken], controller.list);
    app.get('/api/item/type/:id', [authJwt.verifyToken], controller.get);
};
