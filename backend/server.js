const express = require('express');
const cors = require('cors');
const db = require('./app/models');

const app = express();
const port = 8080; // TODO: ENV

const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        if (!origin || origin.includes('localhost')) { // TODO Do this better
            callback(null, true);
        } else {
            callback(new Error('Blocked by CORS :)'));
        }
    },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function initialize() {
    const Role = db.role;
    db.ROLES.forEach((role, idx) => Role.create({ id: idx + 1, name: role }));
}

// TODO: Remove force and .then() for prod
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop-syncing database');
    initialize();
});

app.get('/', (req, res) => {
    res.send('index');
});

require('./app/routes/auth.routes')(app);
require('./app/routes/test.routes')(app);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
