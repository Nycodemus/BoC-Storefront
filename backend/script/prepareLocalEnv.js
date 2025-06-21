const b = require('bcryptjs');
const u = require('uuid');
const fs = require('fs');

const env = `CORS_ORIGIN=localhost
NODE_ENV=development
JWT_SECRET=${u.v4().replace('-', '')}
BCRYPT_SALT=${b.genSaltSync(10)}
PORT=8080`;

fs.writeFileSync('./.env', env);
