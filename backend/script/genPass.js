const bcrypt = require('bcryptjs');
const clipboard = require('clipboardy').default;
require('dotenv').config();

// Usage: npm run script:genPass -- newPass
// Paste the result into the password column of the user

const hash = bcrypt.hashSync(process.argv[2], process.env.BCRYPT_SALT);
console.log(`Hashed password: ${hash}`);
clipboard.writeSync(hash);
console.log('The above hash has been copied to your clipboard as well');
