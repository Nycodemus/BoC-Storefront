const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = parseInt(process.env.PORT, 10) || 8080;

const corsOptions = {
    origin: (process.env.NODE_ENV === 'development')
        ? (origin, callback) => {
                if (!origin || origin.includes('localhost')) { // TODO Do this better
                    callback(null, true);
                } else {
                    callback(new Error('Blocked by CORS'));
                }
            }
        : process.env.CORS_ORIGIN,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('index');
});

require('./app/routes/auth.routes')(app);
require('./app/routes/test.routes')(app);
require('./app/routes/manufacturer.routes')(app);
require('./app/routes/itemtype.routes')(app);
require('./app/routes/item.routes')(app);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
