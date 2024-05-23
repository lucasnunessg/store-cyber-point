const express = require('express');
const Redis = require('ioredis');
const { clientsRoute, loginRoute, productRoute, logoutRoute } = require('./routes');

const app = express();
const redisClient = new Redis();

app.use((req, _res, next) => {
    req.redisClient = redisClient;
    next();
});

app.use(express.json());

app.use('/', clientsRoute);
app.use('/', loginRoute);
app.use('/', productRoute);
app.use('/', logoutRoute);

module.exports = app;
