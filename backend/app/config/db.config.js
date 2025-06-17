module.exports = {
    development: {
        dialect: 'sqlite',
        host: 'storage.sqlite',
    },
    production: {
        dialect: 'mysql',

        host: 'storage.sqlite',
    },
    test: {
        dialect: 'mysql',
        host: 'storage.sqlite',
    },
};
