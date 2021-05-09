var PORT = process.env.PORT || 3000;
require('./config/config');
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



const rtsIndex = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);

app.get('/', (req, res) => {
    res.send('Welcome to Meeting Room Booking App Server');
})

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

// start server
app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));